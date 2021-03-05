import './config.mjs';
import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';
//must bring in DB models before components using them!
import './models/Users.mjs';
import './services/passport.mjs';
import authRoutes from './routes/authRoutes.mjs';

mongoose.connect(process.env.mongoURI)

const app = express();
app.use(express.static('public'));
app.use(cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [process.env.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

const PORT = process.env.Port || 5000;
app.listen(PORT);
console.log('listening on port: ' + PORT);