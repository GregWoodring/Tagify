const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const secret = require('../secret');
let db = require('../server');

passport.serializeUser((userid, done) => {
    done(null, userid);
})
// console.log(req.app)
passport.deserializeUser((userid, done) => {
    // let userObj;

    // console.log(db)
    db.get_user(userid).then(user => {
        console.log(user);
        done(null, user)})
    ;
})


passport.use(new SpotifyStrategy({
        //Options for SpotifyStrategy
        clientID: secret.client_id,
        clientSecret: secret.client_secret,
        callbackURL: secret.redirect_uri,
        // scopes: secret.scopes
    }, (accessToken, refreshToken, profile, done) => {
        //Passport callback function
        
        //creating/updating the user
        // console.log(db);
        db.create_or_update_user(
            [profile.id ? profile.id : null
            , profile.displayName ? profile.displayName : null
            , profile._json.email ? profile._json.email : null
            , profile.profileUrl ? profile.profileUrl : null
            , profile.birthdate ? profile.birthdate : null
            , profile.country ? profile.country : null
            , profile.followers ? profile.followers : null
            , profile._json.href ? profile._json.href : null
            , accessToken ? accessToken : null
            , null
            , refreshToken ? refreshToken : null]
        ).then(userid => done(null, userid[0].create_or_update_user));
        
            

        // db.query(`call create_or_update_user(
        //     ${profile.id}
        //     , ${profile.displayName}
        //     , ${profile._json.email}
        //     , ${profile.profileUrl}
        //     , ${profile.birthdate}
        //     , ${profile.country}
        //     , ${profile.followers}
        //     , ${profile._json.href}
        //     , ${accessToken}
        //     , ${refreshToken})`
        // )

        
        
 })
)

