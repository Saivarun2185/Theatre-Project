/* Author: santhosh Bonala */

let express = require('express')
let router = express.Router()
let multer = require('multer')
let adminAuthenticateController = require('./controllers/authenticate.controller')
let AdminController = require('./controllers/CRUDadmin.controller') 
let ShowController = require('./controllers/show.controller')
let SectionController = require('./controllers/section.controller')
let MailController = require('./controllers/mail.controller')


MailController.startjob()

/* Admin CRUD Operations */
router.post('/authenticate', adminAuthenticateController.authenticate)

router.post('/addadmin', AdminController.addadmin)

router.post('/deleteadmin', AdminController.deleteadmin)

router.get('/all', AdminController.GetAdminList)

router.post('/updateadmin', AdminController.UpdateAdmin)

/* Show CRUD Operations */
router.post('/addshow', multer().single('ShowImage'), ShowController.addShow)

router.get('/showlist', ShowController.GetShowList)

router.post('/updateshow', multer().single('ShowImage'), ShowController.UpdateShow)

router.post('/deleteshow', ShowController.deleteShow)

router.post('/guard', adminAuthenticateController.guard)

router.get('/image', ShowController.imagebyid)

router.post('/ispublished', ShowController.isPublished)

router.post('/duplicateShow', ShowController.GetduplicateShow, ShowController.GetShowList)

router.post('/reserveTicket', ShowController.reserveTickets)

/* section CRUD operations */
router.post('/addsection', SectionController.addSection)

router.post('/updatesection', SectionController.UpdateSection)

router.get('/sectionlist', SectionController.GetSectionList)

router.post('/deletesection', SectionController.deleteSection)
/*
    Email API's
 */

router.post('/sendemail', MailController.SendMail)

router.post('/sendRemainderEmail')


module.exports = router