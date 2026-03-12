"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const tripSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    origin: {
        name: { type: String, required: true },
        coordinates: {
            lat: { type: Number },
            lng: { type: Number },
        },
    },
    destination: {
        name: { type: String, required: true },
        coordinates: {
            lat: { type: Number },
            lng: { type: Number },
        },
    },
    mode: {
        type: String,
        enum: ['public_transport', 'autonomous', 'rideshare', 'scooter'],
        required: true,
    },
    status: {
        type: String,
        enum: ['planned', 'active', 'completed', 'cancelled'],
        default: 'planned',
    },
    departureTime: {
        type: Date,
        required: true,
    },
    arrivalTime: {
        type: Date,
    },
    duration: {
        type: Number, // in minutes
    },
    distance: {
        type: Number, // in kilometers
    },
    carbonSaved: {
        type: Number, // in kg
    },
}, {
    timestamps: true,
});
const Trip = mongoose_1.default.model('Trip', tripSchema);
exports.default = Trip;
