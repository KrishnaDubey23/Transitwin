"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTraffic = void 0;
const Traffic_1 = __importDefault(require("../models/Traffic"));
// @desc    Get traffic updates
// @route   GET /api/traffic
// @access  Public
const getTraffic = async (req, res) => {
    // In a real app, this would fetch from an external API (Google Maps, HERE, etc.)
    // For now, we'll return some mock data or data from our DB
    const trafficData = await Traffic_1.default.find().sort({ lastUpdated: -1 }).limit(10);
    if (trafficData.length === 0) {
        // Return some mock data if DB is empty
        return res.json([
            {
                location: { name: 'Main St & 5th Ave', coordinates: { lat: 40.7128, lng: -74.0060 } },
                congestionLevel: 'heavy',
                averageSpeed: 15,
                incident: 'Accident',
                lastUpdated: new Date()
            },
            {
                location: { name: 'Broadway & 42nd St', coordinates: { lat: 40.7589, lng: -73.9851 } },
                congestionLevel: 'moderate',
                averageSpeed: 30,
                incident: 'None',
                lastUpdated: new Date()
            }
        ]);
    }
    res.status(200).json(trafficData);
};
exports.getTraffic = getTraffic;
