/* Author: santhosh Bonala */

const config = {
    development:{
        url: 'mongodb+srv://admin:admin@cluster0-tyjvv.mongodb.net/development?retryWrites=true',
        tokensecret: 'NorthwestTheatre',
        sessionsecret: 'NorthwestTheatre',
        emailid: 's530859@nwmissouri.edu',
        password: '13016Tt1565'
    },
    production:{
        url: 'mongodb+srv://admin:admin@cluster0-tyjvv.mongodb.net/Production?retryWrites=true',
        tokensecret: 'NorthwestTheatre',
        sessionsecret: 'NorthwestTheatre'
    }
}

module.exports = config[process.env.ENV] || config.development