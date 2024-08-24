const mongoose = require('mongoose');
const Schema = mongoose.Schema


const UserSchema = new Schema({
    name:{
        type:String,
        reqired:true
    },
    email:String,
    subject:String,
});


const ContactSchema = new Schema({
    user:{
        type:UserSchema,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    createdAt: { type: Date, default: Date.now }
});

ContactSchema.post('save', function(doc, next) {
    console.log('New user was created & saved', doc);
    next();
  });


module.exports = mongoose.model('Contact',ContactSchema);