"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const trafficSchema = new mongoose_1.default.Schema({
    location: {
        name: { type: String, required: true },
        coordinates: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
        },
    },
    congestionLevel: {
        type: String,
        enum: ['low', 'moderate', 'heavy', 'standstill'],
        required: true,
    },
    averageSpeed: {
        type: Number, // in km/h
    },
    incident: {
        type: String, // e.g., 'Accident', 'Construction', 'None'
        default: 'None',
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});
const Traffic = mongoose_1.default.model('Traffic', trafficSchema);
exports.default = Traffic;
