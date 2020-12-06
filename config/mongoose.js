// required mongoose module
const mongoose=require('mongoose');

// connected mongodb
mongoose.connect('mongodb://localhost/contact_list_db');

// acquired connection to db
const db=mongoose.connection;

//on error  
db.on('err',console.error.bind(console,'OOps! Error connecting to DB'));

//on success 
db.once('open',function(){
console.log('Yay! Successfully connected')
});