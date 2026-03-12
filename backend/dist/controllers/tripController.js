"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTripStats = exports.getMyTrips = exports.createTrip = void 0;
const Trip_1 = __importDefault(require("../models/Trip"));
// @desc    Create new trip
// @route   POST /api/trips
// @access  Private
const createTrip = async (req, res) => {
    const { origin, destination, mode, departureTime, duration, distance, carbonSaved } = req.body;
    if (!origin || !destination || !mode || !departureTime) {
        return res.status(400).json({ message: 'Please add all required fields' });
    }
    const trip = await Trip_1.default.create({
        user: req.user.id,
        origin,
        destination,
        mode,
        departureTime,
        duration,
        distance,
        carbonSaved,
    });
    res.status(201).json(trip);
};
exports.createTrip = createTrip;
// @desc    Get user trips
// @route   GET /api/trips
// @access  Private
const getMyTrips = async (req, res) => {
    const trips = await Trip_1.default.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(trips);
};
exports.getMyTrips = getMyTrips;
// @desc    Get trip stats for dashboard
// @route   GET /api/trips/stats
// @access  Private
const getTripStats = async (req, res) => {
    const trips = await Trip_1.default.find({ user: req.user.id });
    const stats = {
        totalTrips: trips.length,
        totalDistance: trips.reduce((acc, trip) => acc + (trip.distance || 0), 0),
        totalCarbonSaved: trips.reduce((acc, trip) => acc + (trip.carbonSaved || 0), 0),
        preferredMode: trips.length > 0 ? getMostFrequent(trips.map(t => t.mode)) : 'None',
    };
    res.status(200).json(stats);
};
exports.getTripStats = getTripStats;
function getMostFrequent(arr) {
    const hashmap = arr.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
    }, {});
    return Object.keys(hashmap).reduce((a, b) => (hashmap[a] > hashmap[b] ? a : b));
}
