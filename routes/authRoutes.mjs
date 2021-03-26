import passport from 'passport';

export default (app) => {

//all
    app.get('/auth/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/auth/current_user', (req, res) => {
        req.user ? res.send(req.user) : res.sendStatus(204);
    });


//google
    app.get('/auth/google', passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
        res.redirect('/');
    });


//facebook
    // app.get('/auth/facebook', passport.authenticate('facebook', {
    //         scope: ['profile', 'email']
    //     })
    // );

    // app.get('/auth/facebook/callback', passport.authenticate('facebook'));

}
