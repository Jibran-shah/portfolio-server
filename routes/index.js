const Router = require('express').Router();

const contactRoutes =  require("./contact"); 
const reviewRoutes = require("./reviews");

const runningRoutes = [
    "/contacts"
]

Router.use("/contacts",contactRoutes);
Router.use("/reviews",reviewRoutes);
Router.get('/',(req,res)=>{
    res.send({
        runningRoutes
    });
})

module.exports = Router;
