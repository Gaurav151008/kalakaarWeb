const express = require('express');
const rec_route = express.Router();
const recruiters = require('../models/recruiter');
const artists = require('../models/artists');
const work = require('../models/work');


//profile
rec_route.get("/profile", async (req, res) => {
    try {
        const acntdtl = await recruiters.find({ _id:req.session.recId });
        const postedworks = await work.find({ _id:req.session.recId });
        res.render("recruiterView/profile", { acntdtl, postedworks });
    } catch (err) {
        // Handle error
        console.log(err);
    }
});


//home
rec_route.get('/home', async (req,res)=>{
    try{
        const allWorks = await collection.find({}).toArray();
        const allCategory = await collection.find({}).toArray();

        res.render("recruiterView/home",{ allWorks, allCategory });
    }catch (err) {
        console.log(err);
    }

});

//show artists according to selected category
rec_route.get('/openCategory/:name', async (req,res)=>{
    const catName = req.params.name;

    try{
        const artistlist = await artists.find({ category: catName });
        res.render("recruiterView/artistList",{ artistlist })
    }catch (err){
        console.log(err);
    }
});

module.exports = rec_route;