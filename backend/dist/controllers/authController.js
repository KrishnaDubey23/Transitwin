"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
// Generate JWT
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '30d',
    });
};
// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please add all fields' });
    }
    // Check if user exists
    const userExists = await User_1.default.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }
    // Create user
    const user = await User_1.default.create({
        name,
        email,
        password,
    });
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id.toString()),
        });
    }
    else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};
exports.signup = signup;
// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
    const { email, password } = req.body;
    // Check for user email
    const user = await User_1.default.findOne({ email }).select('+password');
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id.toString()),
        });
    }
    else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};
exports.login = login;
// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    res.status(200).json(req.user);
};
exports.getMe = getMe;
