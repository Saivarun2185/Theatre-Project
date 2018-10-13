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
let show_id


let SendMail = async function (req,res,next) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: config.emailid, // generated ethereal user
            pass: config.password // generated ethereal password
        }
    })
    let promises = []
    show_id = ( req && req.body.show._id ) ? req.body.show._id : show_id

    let students = await Promise.all([  theatreappreciationstudents.find(
                                            { ShowID: new ObjectId(show_id) },
                                            ['EmailAddress', 'LastName','FirstName']
                                         ).exec() ,
                                        audience.find(
                                            { ShowID: new ObjectId(show_id) },
                                            ['EmailAddress', 'LastName', 'FirstName']
                                        ).exec() 
                                    ])
    students = [ ...students[0], ...students[1]]
    for (student of students) {
            ejs.renderFile( path.join(__dirname, "../../../views/mail.ejs"),
            { name: `${student.FirstName} ${student.LastName}`, content: req.body.email.body || 'Testing' },
            function (err, data) {
                if (err) {
                    console.error(err)
                } else {
                    // setup email data with unicode symbols
                    let mailOptions = {
                        from: '"Northwest Theatre" <s530859@nwmissouri.edu>', // sender address
                        to: student.EmailAddress, // list of receivers
                        subject: req.body.email.subject || 'test', // Subject line
                        html: data
                    }
                    // send mail with defined transport object
                    promises.push(
                        new Promise((resolve,reject) => {
                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                   console.error(error)
                                   return reject(error)
                                }                         
                                return resolve(info)            
                            })
                        })
                    )
                    
                }
            })     
        }
        await Promise.all(promises)
        return res ? res.send(200, "Mail Sent Successfully") : "success"
    }
module.exports.SendMail = SendMail

let startjob = function() {
    console.log('cron job started')
    const job = new cronJob('1 0 0 */1 * *', function(){
        show.find({}, ['ShowDate','ShowTime'], function(err, showlist){
            for(Show of showlist){
                    let showarray = Show.ShowDate.split(',')
                    for(date of showarray){
                        console.log(moment().format('MM/DD/YYYY HH:mm'))
                        console.log(date + ' ' + Show.ShowTime)
                        console.log( moment().diff(moment(date + Show.ShowTime, 'MM/DD/YYYY HH:mm'), 'hours') )
                        if( moment().diff(moment(date + Show.ShowTime, 'MM/DD/YYYY HH:mm'), 'hours') <= 0
                         && moment().diff(moment(date + Show.ShowTime, 'MM/DD/YYYY HH:mm'), 'hours') >= -23 ){
                            show_id = Show.id
                            SendMail()
                        }
                    }
                }
        })
    },() => {}, true)

    job.start()
}

module.exports.startjob = startjob