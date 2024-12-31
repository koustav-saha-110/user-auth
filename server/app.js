import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './db/db.js';
import User from './models/user.model.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

dotenv.config();
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
};

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_, res) => {
    res.status(200).send({
        success: true,
        message: 'Hello World',
    });
});

app.post('/api/v1/user/signin', async (req, res) => {
    console.log(req.body);
    let { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            throw new Error('Please fill all the fields');
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('Email already registered');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).send({
            success: true,
            message: 'User Signed In Successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });
    } catch (error) {
        console.log(error.message);
        res.send({
            success: false,
            message: error.message
        });
    }
});

app.post('/api/v1/user/login', async (req, res) => {
    console.log(req.body);
    let { email, password } = req.body;

    try {
        if (!email || !password) {
            throw new Error('Please fill all the fields');
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Email not registered');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).send({
            success: true,
            message: 'User Logged In Successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });
    } catch (error) {
        console.log(error.message);
        res.send({
            success: false,
            message: error.message
        });
    }
});

app.get('/api/v1/user/details', (req, res, next) => {
    let token = req.headers?.authorization?.split(' ')[1] || req.cookies?.token;

    try {
        if (!token) {
            throw new Error('Unauthorized');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            throw new Error('Unauthorized');
        }

        req.id = decoded.id;
        next();
    } catch (error) {
        console.log(error.message);
        res.send({
            success: false,
            message: error.message
        });
    }
}, async (req, res) => {
    try {
        const user = await User.findById(req.id);
        if (!user) {
            throw new Error('User not found');
        }

        res.status(200).status(200).send({
            success: true,
            message: 'User details fetched successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.log(error.message);
        res.send({
            success: false,
            message: error.message
        });
    }
});

app.get('*', (_, res) => {
    res.status(404).send({
        success: false,
        message: 'Not Found',
    });
});

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});
