const mysql = require("mysql");
// const { promisify } =require('util');
// const { error } = require("console");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


exports.addschool = (req,res) =>{
    console.log(req.body);
    const { school_name,school_place} = req.body;

    db.query('SELECT name FROM schools WHERE name = ?', [school_name] , async ( error, results) => {
        if ( error) {
            console.log( error);
        }        
        if ( results.length > 0) {
            return res.render('index', {
                message: 'This School is already added'
            })
        }
    
    db.query('INSERT INTO schools SET ?', {name: school_name, address: school_place}, ( error, results) =>{
        if(error){
            console.log(error);
        } else{
            console.log(results);
            return res.render('index', {
                message: 'School Added'
            });
        }
    })
    });
    res.redirect('/')
    
}
exports.getSchool = (req,res,next) => {
    db.query('SELECT * FROM schools', (error, result) => {
        console.log(result);

        if(!result) {
            return next();
        }

        req.user = result;
        return next();
    });
}

exports.editschool = (req,res,next) =>{
    db.query('SELECT * FROM schools WHERE id=?',[req.params.id],(error,result) => {
        if(!result) {
            return next();
        }
        req.user = result[0];
        return next();
    });
}

exports.edit_school = (req,res) =>{
    const { school_name,school_place} = req.body;
    db.query('UPDATE schools SET name=?,address=? WHERE id=?', [school_name,school_place,req.params.id], (error,result) => {
        console.log(result);
        if(error){
            console.log(error);
        } else{
            return res.render('index', {
                message: 'School Added'
            });
        }
    });
    res.redirect('/')
}

exports.delete_school = (req,res) =>{
    db.query('DELETE FROM schools WHERE id=?',[req.params.id],(error,result) => {
        if(!result) {
            console.log(error);
        }else{
            return res.render('index', {
                message: 'School Delected'
            });   
        }
        
    });
    res.redirect('/')
}

exports.getclass = (req,res,next) => {
    db.query('SELECT * FROM class WHERE school_id=?',[req.params.id],(error,result) => {
        if(!result) {
            return next();
        }
        req.user = result;
        return next();
    });
}
exports.getSchoolId = (req,res,next) => {
    db.query('SELECT * FROM class WHERE id=?',[req.params.id],(error,result) => {
        if(!result) {
            return next();
        }
        req.user = result;

        return next();
    });

}

exports.addclass = (req,res) =>{
    console.log(req.body);
    const { class1,section } = req.body;
    const id2 = req.params.id;

    db.query('SELECT class FROM class WHERE class = ?', [class1] , ( error, results) => {
        if ( error) {
            console.log( error);
        }        
        if ( results.length > 0) {
            return res.render('classindex')
        }
    
    db.query('INSERT INTO class SET ?', {class: class1, section: section,school_id: id2}, ( error, results) =>{
        if(error){
            console.log(error);
        } else{
            console.log(results);
            return res.render('classindex');
        }
    })
    });
    res.redirect('/')
    
}
exports.editclass = (req,res,next) =>{
    db.query('SELECT * FROM class WHERE id=?',[req.params.id],(error,result) => {
        if(!result) {
            return next();
        }
        req.user = result[0];
        return next();
    });
}

exports.edit_class = (req,res) =>{
    const { class1,section } = req.body;
    db.query('UPDATE class SET class=?,section=? WHERE id=?', [class1,section,req.params.id], (error,result) => {
        console.log(result);
        if(error){
            console.log(error);
        } else{
            return res.render('index', {
                message: 'School Added'
            });
        }
    });
    res.redirect('/')
}

exports.delete_class = (req,res) =>{
    db.query('DELETE FROM class WHERE id=?',[req.params.id],(error,result) => {
        if(!result) {
            console.log(error);
        }else{
            return res.render('index', {
                message: 'School Delected'
            });   
        }
        
    });
    res.redirect('/')
}
exports.getdetails = (req,res,next) => {
    db.query('SELECT * FROM details WHERE class_id=?',[req.params.id],(error,result) => {
        if(!result) {
            return next();
        }
        req.user = result;
        return next();
    });
}

exports.adddetails = (req,res) =>{
    console.log(req.body);
    const { name, type, genter, addresss, bloodgrp} = req.body;
    const id2 = req.params.id;

    db.query('SELECT name FROM details WHERE name = ?', [name] , ( error, results) => {
        if ( error) {
            console.log( error);
        }        
        if ( results.length > 0) {
            return res.render('classindex')
        }
    
    db.query('INSERT INTO details SET ?', {name: name, type: type,gender: genter,address: addresss,blood_group: bloodgrp, class_id: id2}, ( error, results) =>{
        if(error){
            console.log(error);
        } else{
            console.log(results);
            return res.render('classindex');
        }
    })
    });
    res.redirect('/')
    
}

exports.editdetails = (req,res,next) =>{
    db.query('SELECT * FROM details WHERE id=?',[req.params.id],(error,result) => {
        if(!result) {
            return next();
        }
        req.user = result[0];
        return next();
    });
}


exports.edit_details = (req,res) =>{
    const { name, type, genter, addresss, bloodgrp} = req.body;
    db.query('UPDATE details SET name=?,type=?,gender=?,address=?,blood_group=? WHERE id=?', [name,type,genter,addresss,bloodgrp,req.params.id], (error,result) => {
        console.log(result);
        if(error){
            console.log(error);
        } else{
            return res.render('index', {
                message: 'School Added'
            });
        }
    });
    res.redirect('/')
}

exports.delete_details = (req,res) =>{
    db.query('DELETE FROM details WHERE id=?',[req.params.id],(error,result) => {
        if(!result) {
            console.log(error);
        }else{
            return res.render('index', {
                message: 'Details Delected'
            });   
        }
        
    });
    res.redirect('/')
}