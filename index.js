const { urlencoded, static } = require('express');
const express = require('express');
const { appendFileSync } = require('fs');
const { join } = require('path');
const path = require('path');
const port = 8000;

// required mongoose
const db = require('./config/mongoose');
// required model 
const Contact = require('./models/contact');
const app = express();

app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// Array of obj used to simulate db before using db
/*
var contactList = [
    {
        name: "Riddhi Suteri",
        phone: "8076251556"
    },

    {
        name: 'Kaptaan Amrika',
        phone: '011 011 0011'
    },

    {
        name: 'Bruce Banner',
        phone: '6999 696969'
    }
];
*/

// middleWares 

// middleware 1
// app.use(function(req,res,next){
//     console.log('middleware 1 is here ');
//     next();
// });

// middleware 2
// app.use(function(req,res,next){
//     console.log('middleware 2 is here ');
//     next();
// });

app.get('/delete-contact/', function (req, res) {
    console.log(req.query.id);
    let id = req.query.id;

    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error Deleting Contact from db');
            return;
        }
    });

    return res.redirect('back');
})

app.get('/', function (req, res) {
    // return res.send('<h1>Hey Gotchaa!</h1>')

    Contact.find({}, function (err, contacts) {
        if (err) {
            console.log('error fetching contacts from db');
            return;
        }

        return res.render('home',
            {
                title: 'My Contacts',
                contact_list: contacts
            }
        );
    });
});

app.get('/practice', function (req, res) {
    return res.render('practice', { title: 'Playground' });
});

app.post('/create-contact', function (req, res) {
    // console.log(req.body);
    // contactList.push(req.body);

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function (err, newContact) {

        if (err) {
            console.log('Error in creating contact!');
            return;
        }

        console.log('**** Contact : ', newContact);
        return res.redirect('back');
    });

    // return res.redirect('/');
});

app.listen(port, function (err) {
    if (err) {
        console.log(err);
        res.send(err);
    }
    console.log('Server is up and running on port: ', port);
});