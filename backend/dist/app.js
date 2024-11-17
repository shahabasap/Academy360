"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const errorHandler_1 = require("./middlewares/errorHandler");
const database_1 = __importDefault(require("./config/database"));
const index_1 = __importDefault(require("./routes/authRoutes/index"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
(0, database_1.default)();
// CORS Options for both HTTP and Socket.IO
const corsOptions = {
    origin: 'http://localhost:5173', // Your frontend's address
    credentials: true, // Allow cookies to be sent
    methods: ['GET', 'PUT', 'PATCH', 'POST'], // Allowed methods
    allowedHeaders: ['Authorization', 'role', 'Content-Type']
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms'));
app.use(errorHandler_1.errorHandler);
app.use((0, express_session_1.default)({
    secret: process.env.Session_Secret,
    resave: false,
    saveUninitialized: false
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/uploads', express_1.default.static('uploads'));
// HTTP Routes
app.use('/auth', index_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map