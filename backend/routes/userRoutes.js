const express = require('express');
const { loginuser,loginadmin, signupuser, updateuserpw, displayuser , deleteuser , displaydeletuser , addAdmin ,displayadmin , deleteaccount , updateprofile } = require('../controllers/userController');
const {addvaccine , vaccinelist , updatecount , vaccineid} = require('../controllers/vaccineController')
const {displayfaq , submitfaq , deletefaq , updatefaq} = require('../controllers/faqcontoller');
const {bookingvaccine , vaccinepersonlist , updatestatus , bookingvaccineothers , vaccinelistothers} = require('../controllers/bookingController');
const {nursesignupuser , nuserloginuser , nursedeatiles , deletenurse , deletenursedeatiles , bookingData , nurseupdateprofile , nursevaccinepersonlist} = require('../controllers/NurseController')
const {addcenter , displaycenter , displayonecenter , updatecenter} = require('../controllers/centerContoller')
const {addnewscenter , allnews , updateNews , deleteNews} = require('../controllers/newsController')

const router = express.Router();

//-------- UserMangement Routes ------------------//
router.post('/login', loginuser);
router.post('/loginadmin', loginadmin);
router.post('/register', signupuser);
router.post('/forgotpassword', updateuserpw);
router.get('/studentdeatiles', displayuser);
router.get('/deletuserdeatiles',displaydeletuser)
router.post('/deleteuser', deleteuser);
router.post('/deleteaccount',deleteaccount)
router.post('/addAdmin', addAdmin);
router.get('/displayadmin',displayadmin)
router.post('/updateprofile',updateprofile)
//------------------------------------------------//

//----------------Vaccine Mangement-----------------------------//
router.post('/addvaccine', addvaccine);
router.get('/vaccinelist', vaccinelist);
router.put('/updatecount', updatecount);


//-------- FAQ Mangement Routes ------------------//
router.get('/displayfaq', displayfaq);
router.post('/submitfaq', submitfaq);
router.delete('/deletefaq/:faqId', deletefaq);
router.put('/updatefaq/:id', updatefaq);
//------------------------------------------------//


//-------------------Booking Mangement-----------------------------//
router.get('/vaccinelist/:id', vaccineid);
router.put('/updatebooking/:id', updatestatus);
router.post('/bookingvaccine', bookingvaccine);
router.post('/bookingvaccineothers', bookingvaccineothers);
router.get('/vaccinepersonlist/:myemail', vaccinepersonlist);
router.get('/vaccinelistothers/:myemail', vaccinelistothers);



//-------------------Nurse  Mangement-----------------------------//
router.post('/nurseregister', nursesignupuser);
router.post('/nurselogin', nuserloginuser);
router.get('/nursedeatiles', nursedeatiles);
router.post('/deletenurse', deletenurse);
router.get('/deletenursedeatiles', deletenursedeatiles);
router.put('/nurseupdateprofile', nurseupdateprofile);
router.get('/nursevaccinepersonlist/:id', nursevaccinepersonlist);






//-------------------Add Center -------------------//
router.post('/addcenter' , addcenter)
router.get('/displaycenter' , displaycenter)
router.get('/displaycenter/:id' , displayonecenter)
router.put('/updatecenter/:id' , updatecenter)
router.get('/bookingData/:nurseid' , bookingData)




//-------------------News---------------------//
router.post('/addnewscenter' , addnewscenter)
router.get('/allnews' , allnews)
router.put('/updateNews/:id' , updateNews)
router.delete('/deleteNews/:id' , deleteNews)








module.exports = router;


