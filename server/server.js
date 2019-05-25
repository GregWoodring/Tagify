//imported libraries
const express  = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const request = require('request');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const cookieSession = require('cookie-session');
let authRouter = require('./Routes/auth');
//imported js files
const secret = require('./secret');
// const db = require('./database/databaseConnection')
// let passportSpotify;

var app = module.exports = express();



let connectionString = secret.connectionString;
massive(connectionString).then(db => {
    app.set('db', db)
    // console.log(db)
    module.exports.db = db

    const passportSpotify = require('./config/passport-setup');

});




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieSession({
    keys: [secret.session_secret], 
    maxAge: 30 * 24* 60 * 60 * 1000, //30 days
    // resave: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);


app.get('/', function(req, res, next){
    //req.session.
});

app.get('/api/users', function(req, res, next) {
    console.log(req.user);
    res.send(200).end();
    
});

app.get('/login', (req, res, next) => {
    console.log('here');
    let redirectString = `https://accounts.spotify.com/authorize?client_id=${secret.client_id}&response_type=code&redirect_uri=${secret.redirect_uri}&scope=${secret.scope}`;
    console.log('next')
    
    res.redirect(redirectString);
    console.log('last?')
})

// app.get('/login-spotify', passport.authenticate('spotify',{
//     scope: [
//     'user-read-email',
//     'user-read-recently-played', 
//     'user-library-modify',
//     'playlist-modify-public',
//     'playlist-read-private',
//     'playlist-modify-public',
//     'playlist-modify-private',
//     'user-library-read',
//     'playlist-read-collaborative',
//     'user-read-birthdate',
//     'user-read-playback-state',
//     'user-read-private',
//     'app-remote-control',
//     'user-modify-playback-state',
//     'user-follow-read',
//     'user-top-read',
//     'user-read-currently-playing',
//     'user-follow-modify',
//     'streaming']

// }))

// Might be switching to using passport for this
// app.get('/api/authorize', function(req, res, next) {

//     // times++;
//     console.log(req.session);
    
//     let authBody = {
//         grant_type: 'authorization_code',
//         code: req.query.code,
//         redirect_uri: secret.redirect_uri,
//         client_id: secret.client_id,
//         client_secret: secret.client_secret,
//         scope: secret.scope
//     }

//     request.post({url: 'https://accounts.spotify.com/api/token', form : authBody}, (error, response, body) => {
//         if (!error && response.statusCode == 200) {
//             console.log(body);
//         }
//     });
//     res.end();
    
    
// });

// app.get('/api/authorize', (req, res) => {
//     console.log('they responded!')
//     // res.sendStatus(200).end()
//     res.send('they responded!')
// })

// app.get('/api/authorize', passport.authenticate('spotify'), (req, res) => {
//     res.send(`you reached the redirect url`).end();
// })

app.post('/api/authorize', (res, req, next) => {
    console.log('they posted')
    console.log(res.body);
    res.send(200).end();
})

app.post('/api/login', (req, res) => {
    //Do Auth
    // console.log('here');
    // let user = req.app.get('db').get_me().then( users => users[0]);

     
    // jwt.sign({user}, 'secretkey',{expiresIn: '30s'}, (err, token) => {
    //     res.json({
    //         token
    //     })
    // })
});

app.post('/api/test', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData
            })
        }
    });
});

// FORMAT OF TOKEN

// Authorization: Bearer <access_token>

//Verify Token

function verifyToken(req, res, next){
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined

    if(typeof bearerHeader !== 'undefined'){
        //split at the space
        const bearer = bearerHeader.split(' ');
        //Get token from array
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken
        //Next middleware
        next();
    } else {
        //Forbidden
        res.sendStatus(403);
    }
}


app.listen(3000, function(){
    console.log('Im still listening')
});