const nodemailer = require('nodemailer')
const config = require('../../../config/config')
const fs = require('fs')
const ejs = require('ejs')
const path = require('path')
const cronJob = require('cron').CronJob
const show = require('../../../models/Show.model')
const moment = require('moment')
const theatreappreciationstudents = require('../../../models/TheatreAppreciationStudent.model')
const audience = require('../../../models/Audience.model')
let ObjectId = require('mongoose').Types.ObjectId


let SendMail = async function (show_id) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: config.emailid, // generated ethereal user
            pass: config.password // generated ethereal password
        }
    })

    theatreappreciationstudents.find({ ShowID: new ObjectId(show_id) }, ['EmailAddress'], function(err, list){
        console.log(list)
    })
    let students = await Promise.all([ theatreappreciationstudents.find({ ShowID: new ObjectId(show_id) }, ['EmailAddress']).exec() ,
                                  audience.find({ ShowID: new ObjectId(show_id) }, ['EmailAddress']).exec() ])


    console.log(students)





    let names =['Saivarun']
    for(let name of names){
        ejs.renderFile(path.join(__dirname, "../../../views/mail.ejs"), { name: name, content: req.body.email.body }, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                // setup email data with unicode symbols
                let mailOptions = {
                    from: '"Northwest Theatre" <s530859@nwmissouri.edu>', // sender address
                    to: 's530464@nwmissouri.edu,s530859@nwmissouri.edu, s533986@nwmissouri.edu', // list of receivers
                    subject: req.body.email.subject, // Subject line
                    html: data
                }
                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error)
                    }
                    
                    console.log('Message sent: %s', info.messageId)
                    // Preview only available when sending through an Ethereal account
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))

                    res.send(200, "Mail sent Successfully")
                })
            }
        })
    }
}

module.exports.SendMail = SendMail

let startjob = function() {
    console.log('cron job started')
    const job = new cronJob('0 */1 * * * *', function(){
        show.find({}, ['ShowDate'], function(err, showlist){
            for(Show of showlist){
                    let showarray = Show.ShowDate.split(',')
                    for(date of showarray){
                        console.log(moment().format('MM/DD/YYYY'))
                        console.log(date)
                       console.log( moment().diff(moment(date, 'MM/DD/YYYY'), 'days') )
                        if(moment().diff(moment(date, 'MM/DD/YYYY'), 'days') === 0){
                            SendMail(Show.id)
                        }
                    }
                }
        })
    },() => {}, true)

    job.start()
}

module.exports.startjob = startjob