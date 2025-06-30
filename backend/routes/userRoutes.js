const express = require('express');
const { loginuser, signupuser, updateuserpw, displayuser , deleteuser , displaydeletuser , addAdmin ,displayadmin , deleteaccount , updateprofile } = require('../controllers/userController');
const {addvaccine , vaccinelist , updatecount , vaccineid} = require('../controllers/vaccineController')
const {displayfaq , submitfaq , deletefaq , updatefaq} = require('../controllers/faqcontoller');
const {bookingvaccine , vaccinepersonlist , updatestatus} = require('../controllers/bookingController');
const {nursesignupuser , nuserloginuser , nursedeatiles , deletenurse , deletenursedeatiles , bookingData , nurseupdateprofile , nursevaccinepersonlist} = require('../controllers/NurseController')
const {addcenter , displaycenter , displayonecenter , updatecenter} = require('../controllers/centerContoller')

const router = express.Router();

//-------- UserMangement Routes ------------------//
router.post('/login', loginuser);
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
router.get('/vaccinepersonlist/:myemail', vaccinepersonlist);




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






module.exports = router;


