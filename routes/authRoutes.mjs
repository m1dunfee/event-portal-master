import passport from 'passport';

export default (app) => {

//all
    app.get('/auth/logout', (req, res) => {
        req.logout();
        res.sendStatus(200);
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user)
    });


//google
    app.get('/auth/google', passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get('/auth/google/callback', passport.authenticate('google'));


//facebook
    // app.get('/auth/facebook', passport.authenticate('facebook', {
    //         scope: ['profile', 'email']
    //     })
    // );

    // app.get('/auth/facebook/callback', passport.authenticate('facebook'));

}
