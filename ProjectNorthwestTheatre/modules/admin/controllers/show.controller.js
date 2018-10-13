/* Author: santhosh Bonala */

let mongoose = require('mongoose')
let ShowModel = require('../../../models/Show.model')
let fs = require('fs')
let path = require('path')
let StudentModel = require('../../../models/TheatreAppreciationStudent.model')
let GeneralAudienceModel = require('../../../models/Audience.model')

let addShow = (req, res, next) => {
    req.body.Ticketdetails = JSON.parse(req.body.Ticketdetails)
    let Show = new ShowModel(req.body)
    buffer = req.file.buffer
    Show.save()
        .then(function (Show) {
            fs.open('images/' + Show.id, 'w', function (err, fd) {
                if (err) {
                    throw 'error opening file: ' + err
                }
                fs.write(fd, buffer, 0, buffer.length, null, function (err) {
                    if (err) throw 'error writing file: ' + err
                    fs.close(fd, function () {
                        console.log('file written')
                    })
                return res.send('Show Added successfully')
                })
            })
        })
        .catch(function (err) {
            return res.status(400).send('error while adding a show', err)
        })
}

module.exports.addShow = addShow

let deleteShow = (req, res, next) => {
    ShowModel.findByIdAndRemove(req.body.id, function (err, Show) {
        if (err || !Show) return res.status(400).send('Cannot Delete, Show not found')
        fs.unlink(path.join(__dirname, '../../../images', req.body.id), (err) => {
            if (err) throw err
            return res.send("Delete Successfull")
        })
    })
}

module.exports.deleteShow = deleteShow

let GetShowList = (req, res, next) => {
    ShowModel.find({},'-__v',function (err, ShowList) {
        if (err) return res.status(400).send('Error while getting Shows list')
        if (ShowList) {
            return res.json(ShowList)
        } else {
            return res.status(400).send('No Shows exists')
        }
    })
}

module.exports.GetShowList = GetShowList

let UpdateShow = (req, res, next) => {
    req.body.Ticketdetails = JSON.parse(req.body.Ticketdetails)
    ShowModel.findByIdAndUpdate(req.body.id,req.body, function (err, Show) {
        if (err || !Show) return res.status(400).send('Show not found')
        if (req.file && req.file.buffer){
            buffer = req.file.buffer
            fs.open('images/' + Show.id, 'w', function (err, fd) {
                if (err) {
                    throw 'error opening file: ' + err
                }
                fs.write(fd, buffer, 0, buffer.length, null, function (err) {
                    if (err) throw 'error writing file: ' + err
                    fs.close(fd, function () {
                        console.log('file written')
                    })
                    return res.send("Updated Successfully")
                })
            })
        } else {
            return res.send("Updated Successfully")
        }
    })

}

module.exports.UpdateShow = UpdateShow

 let imagebyid = (req, res) => {
     res.sendFile(path.join(__dirname, '../../../images', req.query._id.trim()), function(err){
         console.log(err)
     })
}

module.exports.imagebyid = imagebyid

let isPublished = (req,res) => {
        ShowModel.findByIdAndUpdate(req.body.id, req.body, function (err, Show) {
            if (err || !Show) return res.status(400).send('Show not found')
            return res.send("Updated Successfully")
        })
}

module.exports.isPublished = isPublished

let GetduplicateShow = (req, res, next) => {
        let previd = req.body._id
        delete req.body._id
        let duplicateshow = new ShowModel(req.body)
        duplicateshow
        .save()
        .then( res => {
            fs.copyFileSync('./images/' + previd, './images/' + res._id)
            next()
        })
        .catch( err => {
             return res.status(400).send('error while duplicating a show', err)
        })              
}
module.exports.GetduplicateShow = GetduplicateShow

let reserveTickets = (req,res) => {
    let TheatreAppreciationStudent = req.body.isStudent
    req.body.SectionEnrolled = parseInt(req.body.SectionEnrolled) 
    req.body.NumberOfTicketsperPerson = parseInt(req.body.NumberOfTicketsperPerson) 
    if(TheatreAppreciationStudent === "true"){
        let Student = new StudentModel(req.body)
        Student.save()
        .then(
            result => {
                console.log(result)
                return res.send(200, "Ticket reserved")
            }
        )
        .catch(
            err => {
                console.log(err)
                return res.send(400, "Error while reserving Ticket For Theatre Appreciation Student")
            }
        ) 
    }else{
        let GeneralAudience = new GeneralAudienceModel(req.body)
        GeneralAudience.save()
            .then(
                result => {
                    console.log(result)
                    return res.send(200, "Ticket reserved")
                }
            )
            .catch(
                err => {
                    console.log(err)
                    return res.send(400, "Error while reserving Ticket For General Audience")
                }
            )
    }
}
module.exports.reserveTickets = reserveTickets
