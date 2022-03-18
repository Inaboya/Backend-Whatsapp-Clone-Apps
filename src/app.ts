import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import createError from 'http-errors';
import path from 'path';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import Pusher from 'pusher';

import bodyParser from 'body-parser';

import { setupGoogle } from './passport/passport-ggle';
import authRoutes from './routes/authRouteGgle';
import passport from 'passport';
import cookieSession from 'cookie-session';
import authRouteFB from './routes/authRoute';
import emailRoutes from './routes/emailVerify';
import cookieParser from 'cookie-parser';
import { mongoDBConnect, mongoMockConnect } from './database/database';

// ROUTES IMPORT
import UserRouter from './routes/userRoute';
import messageRoutes from './routes/messageRoutes';
import privateChatRoutes from './routes/privateChatRoute';
import groupRoutes from './routes/groupRoutes';
import friendRoutes from './routes/friendRoutes';
// routers

// const app: Application = express();

dotenv.config();
const app = express();

//Pusher config



app.use(cors());
//middlewares

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.json({ limit: '500mb' }));
app.use(session({ secret: process.env.SESSION_SECRET as string }));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ limit: '500mb', extended: false }));
app.use(cookieParser());

const publicPath = path.join(__dirname + '../public');
// app.use(express.static(publicPath));
app.use(express.static('public'));

// to test message sharing
app.get('/', (req, res) => {
  res.sendFile(publicPath);
});

// app.get('/homepage', (req, res) => {
//   res.status(200).json({ msg: 'Hello broooo' });
// });

setupGoogle();
app.use('/', authRoutes);
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
  mongoMockConnect();
} else {
  mongoDBConnect();
}

// Routers upon which applications will run. To be connected to the routes files.

// // Initialize passport
// app.use(passport.initialize());
// app.use(passport.session());

// ROUTES =========
// Routers upon which applications will run. To be connected to the routes files.
// app.use('/api/v1/users', authRouteFB);

// Routers upon which applications will run. To be connected to the routes files.
app.use('/api/v1/users', authRouteFB);

app.use('/api/v1/users', UserRouter);

//User auth routes
app.use('/api/v1/user', emailRoutes);

app.use('/api/v1/messages', messageRoutes);

app.use('/api/v1/chats', privateChatRoutes);

app.use('/api/v1/groups', groupRoutes);

app.use('/api/v1/friends', friendRoutes);
// ERROR HANDLERS =========
// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    error: err.status == 404 ? 'Path not found' : err.message,
  });
});

export default app;
