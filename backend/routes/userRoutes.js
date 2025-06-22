const express = require('express');
const { loginuser, signupuser, updateuserpw, displayuser , deleteuser , displaydeletuser , addAdmin ,displayadmin , deleteaccount , updateprofile } = require('../controllers/userController');
const {addvaccine , vaccinelist} = require('../controllers/vaccineController')
const {displayfaq , submitfaq , deletefaq , updatefaq} = require('../controllers/faqcontoller');


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


//-------- FAQ Mangement Routes ------------------//
router.get('/displayfaq', displayfaq);
router.post('/submitfaq', submitfaq);
router.delete('/deletefaq/:faqId', deletefaq);
router.put('/updatefaq/:id', updatefaq);
//------------------------------------------------//






module.exports = router;


