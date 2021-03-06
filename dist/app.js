"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const http_errors_1 = __importDefault(require("http-errors"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_ggle_1 = require("./passport/passport-ggle");
const authRouteGgle_1 = __importDefault(require("./routes/authRouteGgle"));
const passport_1 = __importDefault(require("passport"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const emailVerify_1 = __importDefault(require("./routes/emailVerify"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const database_1 = require("./database/database");
// ROUTES IMPORT
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const privateChatRoute_1 = __importDefault(require("./routes/privateChatRoute"));
const groupRoutes_1 = __importDefault(require("./routes/groupRoutes"));
const friendRoutes_1 = __importDefault(require("./routes/friendRoutes"));
// routers
// const app: Application = express();
dotenv_1.default.config();
const app = (0, express_1.default)();
//Pusher config
app.use((0, cors_1.default)());
//middlewares
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(express_1.default.json({ limit: '500mb' }));
app.use((0, express_session_1.default)({ secret: process.env.SESSION_SECRET }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ limit: '500mb', extended: false }));
app.use((0, cookie_parser_1.default)());
const publicPath = path_1.default.join(__dirname + '../public');
// app.use(express.static(publicPath));
app.use(express_1.default.static('public'));
// to test message sharing
app.get('/', (req, res) => {
    res.sendFile(publicPath);
});
// app.get('/homepage', (req, res) => {
//   res.status(200).json({ msg: 'Hello broooo' });
// });
(0, passport_ggle_1.setupGoogle)();
app.use('/', authRouteGgle_1.default);
// Cookie session middleware to help remember user sessions.
// app.use(
//   cookieSession({
//     // name: 'session',
//     keys: [process.env.COOKIE_KEY!],
//     maxAge: 24 * 60 * 60 * 100,
//   })
// );
//MongoDB connection
if (process.env.NODE_ENV === 'test') {
    (0, database_1.mongoMockConnect)();
}
else {
    (0, database_1.mongoDBConnect)();
}
// Routers upon which applications will run. To be connected to the routes files.
// // Initialize passport
// app.use(passport.initialize());
// app.use(passport.session());
// ROUTES =========
// Routers upon which applications will run. To be connected to the routes files.
// app.use('/api/v1/users', authRouteFB);
// Routers upon which applications will run. To be connected to the routes files.
app.use('/api/v1/users', authRoute_1.default);
app.use('/api/v1/users', userRoute_1.default);
//User auth routes
app.use('/api/v1/user', emailVerify_1.default);
app.use('/api/v1/messages', messageRoutes_1.default);
app.use('/api/v1/chats', privateChatRoute_1.default);
app.use('/api/v1/groups', groupRoutes_1.default);
app.use('/api/v1/friends', friendRoutes_1.default);
// ERROR HANDLERS =========
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.json({
        error: err.status == 404 ? 'Path not found' : err.message,
    });
});
exports.default = app;
