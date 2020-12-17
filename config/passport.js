const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('./keys')
const opts = {}
const { User } = require('../model/user')
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
        /* console.log(jwt_payload)
        {
            id: '5fda3117aebc0a274c15e37f',
            email: '990695619@qq.com',
            iat: 1608199920,
            exp: 1608286320
        } */
        // const user = await User.findOne({_id: jwt_payload.id})
        // if (user) {
        //     return done(null, user)
        // } else {
        //     return done(null, false)
        // }
        return done(null, jwt_payload)
    }))
}