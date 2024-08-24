const express = require('express');
const router = express.Router();
const Contact = require('../dbModels/contact');
const webPush = require('web-push');
const subscriptions = require('../subscriptions');

router.use(express.urlencoded({
    extended:false,
}));


let failedNotificationsCount = 0;
router.post("/",(req,res)=>{
    try{
        const contact = new Contact({
            user:{
                name:req.body.name,
                email:req.body.email,
                subject:req.body.subject
            },
            message:req.body.message,
        })
        contact.save().then(contact => {
            console.log('Contact saved:');
          }).catch(error => {
            console.error('Error saving Contact');
          });
        res.status(201).send(contact);
        const payload = JSON.stringify({
            title:req.body.name,
            body:req.body.message,
            icon:"http://localhost/logo.png",
        });
        subscriptions.forEach(subscription => {
            webPush.sendNotification(subscription, payload)
            .then(()=>{
                console.log(options);
            }).catch(error => {
                console.log("Erro sending notification NO:",failedNotificationsCount++);
            });
        });
    } catch (error) {
        res.status(400).send(error);
    }
    finally{
      
    }
});

router.get("/",(req,res)=>{
    Contact.find({})
    .then((contacts)=>{
        res.status(200).render('contacts/contacts',{contacts});
    })
    .catch((err)=>{
        res.status(404).send(err);
    })
});

router.get("/:name",(req,res)=>{
    res.status(200).send("something");
});

router.post('/admin',(req,res)=>{});

module.exports = router;