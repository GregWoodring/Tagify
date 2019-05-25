const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const secret = require('../secret');
let {db} = require('../server');

passport.serializeUser((userid, done) => {
    done(null, userid);
})
passport.deserializeUser((userid, done) => {
    // console.log(db.get_user);
    db.get_user(userid).then(user => {
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

