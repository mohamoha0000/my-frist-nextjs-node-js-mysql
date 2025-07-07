import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

import { pool } from "../db.js"
async function getUsers() {
    const { rows } = await pool.query("SELECT * FROM users");
    // console.log(rows)
    return rows;
}
getUsers()

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_TOKEN, { expiresIn: maxAge });
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            "SELECT id, email, password, name FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({ message: "This email is not registered" });
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'incorrect password' });
        }

        // const token = createToken(user._id);
        // res.cookie('jwt', token, {
        //     httpOnly: true,
        //     secure: false,
        //     sameSite: "Lax",
        //     maxAge: maxAge * 1000
        // });

        res.status(200).json({
            userId: user.id,
            fullName: user.name,
        });

    } catch (err) {
        console.error("Login error:", err.message);
        res.status(400).json({ message: err.message });
    }
};

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const result = await pool.query(
            "SELECT id, email, password, name FROM users WHERE email = $1",
            [email]
        );
        if (result.rows.length !== 0) {
            return res.status(400).json({ message: 'This email is already registered' });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name",
            [name, email, hashedPassword]
        );
        const insertedUser = newUser.rows[0];
        console.log(insertedUser)

        // const token = createToken(newUser._id);
        // res.cookie('jwt', token, {
        //     httpOnly: true,
        //     secure: false,
        //     sameSite: "Lax",
        //     maxAge: maxAge * 1000,
        // });++

        res.status(200).json({
            userId: insertedUser.id,
            fullName: insertedUser.name,
        });

    } catch (err) {
        console.error("Signup error:", err.message);
        res.status(400).json({ message: err.message });
    }
};




export const logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            maxAge: 0,
            sameSite: "Lax",
            secure: false
        });
        res.status(200).json({ message: "Logged out" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "not working" });
    }
};
