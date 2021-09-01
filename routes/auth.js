const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/addschool', authController.addschool);

router.post('/edit_school/:id', authController.edit_school);

router.get('/deleteschool/:id', authController.delete_school);

router.post('/addclass/:id', authController.addclass);

router.post('/edit_class/:id', authController.edit_class);

router.get('/deleteclass/:id', authController.delete_class);

router.post('/adddetails/:id', authController.adddetails);

router.post('/editdetails/:id', authController.edit_details);

router.get('/deletedetails/:id', authController.delete_details);


module.exports = router;