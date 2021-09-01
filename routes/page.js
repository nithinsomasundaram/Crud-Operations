const express = require('express');
const authController = require('../controllers/auth')

const router = express.Router();

router.get('/', authController.getSchool ,( req, res) => {
    res.render('index', {
        user: req.user
    });
})

router.get('/editschool/:id', authController.editschool,( req, res) => {
    res.render('edit', {
        user: req.user
    });
});

router.get('/addschool',( req, res) => {
    res.render('addschool');
})

router.get('/classindex/:id', authController.getclass,( req, res) => {
    res.render('classindex', {
        user: req.user,
        id1: req.params.id
    });
});

router.get('/addclass/:id',( req, res) => {
    res.render('addclass',{
        id1: req.params.id
    });
})

router.get('/editclass/:id', authController.editclass,( req, res) => {
    res.render('classedit', {
        user: req.user
    });
});
router.get('/detailsindex/:id', authController.getdetails,( req, res) => {
    res.render('detailsindex', {
        user: req.user,
        id1: req.params.id
    });
});

router.get('/adddetails/:id',( req, res) => {
    res.render('adddetails',{
        id1: req.params.id
    });
})

router.get('/editdetails/:id', authController.editdetails,( req, res) => {
    res.render('editdetails', {
        user: req.user
    });
});






module.exports = router;