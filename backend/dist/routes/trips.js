"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tripController_1 = require("../controllers/tripController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.use(auth_1.protect); // All trip routes are protected
router.post('/', tripController_1.createTrip);
router.get('/', tripController_1.getMyTrips);
router.get('/stats', tripController_1.getTripStats);
exports.default = router;
