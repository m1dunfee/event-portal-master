import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import mongoose from 'mongoose';
//custom
//keeps mongoose from thinking there is multiple models with the same name
const User = mongoose.model('users')

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id)
        .then(user =>{
            done(null, user);
        })
});


passport.use(
    new GoogleStrategy({
        clientID: process.env.googleClientID,
        clientSecret: process.env.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {

        User.findOne({ googleID: profile.id }).then((record) => {
            if (record) {
                done(null, record);
            } else {
                new User({ googleID: profile.id })
                    .save()
                    .then(user => {
                        done(null, user)
                    });
            }
        });
    })
);