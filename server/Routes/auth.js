const router = require('express').Router();
const passport = require('passport');
const request = require('request');
const {db} = require('../server');

// console.log('db', db);
// const passportSetup = require('../config/passport-setup')

// console.log(req.app);

// Router.use(passport.initialize());
// Router.use(passport.session());

//Redirect after getting Auth response and storing user
router.get('/spotify', passport.authenticate('spotify'), (req, res) => {

    // console.log(req.app.db);
    req.app.db.get_user(req.user).then(user => {
        request({
            url: `https://api.spotify.com/v1/me/player/recently-played`,
            headers:{
                'Authorization' : `Bearer ${user[0].access_token}`
            }
        }, (err, response, body) => {
            // body.
            // req.app.db.sp_store
            console.log(JSON.parse(body).items[0])

            let {items} = JSON.parse(body);
            items.forEach(item => {
                console.log([item.track.album.album_type,
                //item.track.album.artists, Not sure if I need this since it's on the track
                //item.track.album.external_urls nested object?
                item.track.album.href,
                item.track.album.id,
                //album.track.item.images Going to need to send all of them, is there a fixed amount?
                item.track.album.name,
                item.track.album.release_date,
                //item.track.album.release_date_precision Not sure if saving this,
                item.track.album.total_tracks,
                item.track.album.type,
                item.track.album.uri,
                //album.track.type.artists store in an array, likely need to get these out on DB side
                //item.track.available_markets likely not storing this
                item.track.disc_number,
                item.track.duration_ms,
                item.track.explicit,
                //item.track.external_ids, nested object with isrc id, not sure what that is
                item.track.external-URLSearchParams.spotify,
                item.track.href,
                item.track.id,
                item.track.is_local,
                item.track.name,
                item.track.popularity,
                item.track.preview_url,
                item.track.track_number,
                item.track.type,
                item.track.uri,
                item.played_at,
                // item.context.uri, seems like context can be null, will need to deal with that
                // item.context.external_urls.spotify,
                // item.context.external_urls.href,
                // item.context.external_urls.type
            ])
                
            });
            // res.send(200);
            // res.end();
        });
    });
    
    
    
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