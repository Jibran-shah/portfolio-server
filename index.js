const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const routes = require('./routes/index');
const app = express();
const webPush = require('web-push');
const subscriptions = require('./subscriptions');

app.listen(80,()=>{
    console.log("listening on port 80");
})


app.use(express.static(path.join(__dirname,"/public")));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://127.0.0.1:27017/portfolio',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
        console.log("connected");
})
.catch((err)=>{
        console.log("error connecting");
});

app.use(express.static(path.resolve("./../client/build")));
app.use(express.json());
app.use(express.urlencoded({
    extended:false,
}));

app.use('/api',routes);

const publicVapidKey = "BD_0FB9pqeJYnAu1KSe5Otw0kurtXYxNNDANIh-w46RvDZC_x_MyPFgAxc-T32xsBueli5ivIk7PmeWu6XOne3c";
const privateVapidKey = "F_W3X2fmCJ6RpeJiNizTMg3WDBTqxVg7e9UXQncPBLw";
webPush.setVapidDetails('mailto:jibranshah228@gmail.com', publicVapidKey, privateVapidKey);


let failedNotificationsCount = 0;
app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    subscriptions.push(subscription);
    console.log(subscriptions);
    res.status(201).json({});
    const payload = JSON.stringify({
        title:"subscribbed",
        body:"Notifications for contacts enabled",
        icon:"http://localhost/logo.png",
    });
    webPush.sendNotification(subscription, payload).catch(error => {
        console.error('Error sending notification NO:',failedNotificationsCount++);
    });
});