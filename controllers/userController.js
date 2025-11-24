import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function userRegister(req, res) {
    const user_name = req.body.user_name;
    const email = req.body.email;
    const password = req.body.password;

    if (user_name == null || email == null || password == null) {
        res.status(400).json({
            success: false,
            message: "Please provide all the fields",
            output: null
        });
        return;
    }

    User.findOne({
        $or: [
            {user_name: user_name}, 
            {email: email}
        ]
    }).then(async (userExists) => {
        if (userExists) {
            res.status(409).json({
                success: false,
                message: "User already exists",
                output: null
            });
            return;
        }

        const userCount = await User.countDocuments();

        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new User({
            user_name: user_name,
            email: email,
            password: hashedPassword,
            rank: userCount + 1
        });

        user.save().then(()=>{
            res.status(201).json({
                success: true,
                message: "User saved Successfully",
                output: {
                    _id: user.id
                }
            })
        }).catch(()=>{
            res.status(500).json({
                success: false,
                message: "User saved Failed",
                output: null
            })
        })
    })
}

export async function userLogin(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        email: email
    }).then((user) => {
        if (user == null) {
            res.status(404).json({
                success: false,
                message: "User does not exist",
                output: null
            });
        } else {
            const isPasswordCorrect = bcrypt.compareSync(password, user.password);
            
            if (isPasswordCorrect) {
                const userData = {
                    _id: user.id,
                    user_name: user.user_name,
                    email: user.email,
                }
                // console.log(userData);

                const token = jwt.sign(userData, process.env.JWT_KEY /*, {expiresIn : "1h"}*/);

                res.status(200).json({
                    success: true,
                    message: "Login Successfull",
                    output: {
                        _id: user.id,
                        token: token,
                        user_name: user.user_name
                    }
                })       
            } else {
                res.status(403).json({
                    success: false,
                    message: "Invalid Password",
                    output: null
                })
            }
        }
    })
}

export async function getAuthData(req, res) {
    if (req.user == null) {
        res.status(404).json({
            success: false,
            message: "User does not exist",
            output: null
        })
        return;
    }

    User.findOne({
        _id: req.user._id
    }).then((user) => {
        if (user == null) {
            res.status(404).json({
                success: false,
                message: "User does not exist",
                output: null
            })
        } else {
            res.status(200).json({
                success: true,
                message: "User found",
                output: {
                    _id: user.id,
                    user_name: user.user_name,
                    email: user.email,
                    level: user.level,
                    rank: user.rank,
                    score: user.score,
                    heighest_score: user.heighest_score,
                    total_match_count: user.total_match_count,
                    total_correct_answer_count: user.total_correct_answer_count,
                    total_wrong_answer_count: user.total_wrong_answer_count,
                    total_unattempted_count: user.total_unattempted_count,
                    is_active: user.is_active,
                    created_at: user.created_at,
                    updated_at: user.updated_at
                }
            })
        }
    })
}

export async function userLeaderboard(req, res) {
    if (req.user == null) {
        res.status(404).json({
            success: false,
            message: "User does not exist",
            output: null
        })
        return;
    }

    try {
        const page = parseInt(req.body.page) || 1;
        const limit = parseInt(req.body.limit) || 10;
        const skip = (page - 1) * limit;

        const users = await User.find({}, "user_name level rank score")
            .sort({ rank: 1 })
            .skip(skip)
            .limit(limit);

        const totalUsers = await User.countDocuments();
        const totalPages = Math.ceil(totalUsers / limit);

        res.status(200).json({
            success: true,
            message: "Leaderboard fetched successfully",
            output: {
                currentPage: page,
                totalPages: totalPages,
                totalUsers: totalUsers,
                users: users
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch leaderboard",
            output: null
        });
    }
}
