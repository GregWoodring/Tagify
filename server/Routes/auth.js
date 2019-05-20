const router = require('express').Router();
const passport = require('passport');
// const passportSetup = require('../config/passport-setup')

// console.log(req.app);

// Router.use(passport.initialize());
// Router.use(passport.session());

//Redirect after getting Auth response and storing user
router.get('/spotify', passport.authenticate('spotify'), (req, res) => {
    
    res.send(`you reached the redirect url`).end();
})


//Make Auth request to spotify
router.get('/login-spotify', passport.authenticate('spotify',{
    scope: [
    'user-read-email',
    'user-read-recently-played', 
    'user-library-modify',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-public',
    'playlist-modify-private',
    'user-library-read',
    'playlist-read-collaborative',
    'user-read-birthdate',
    'user-read-playback-state',
    'user-read-private',
    'app-remote-control',
    'user-modify-playback-state',
    'user-follow-read',
    'user-top-read',
    'user-read-currently-playing',
    'user-follow-modify',
    'streaming']

}))

router.get('/test', (req,res) => {res.sendStatus(200)})


module.exports = router;