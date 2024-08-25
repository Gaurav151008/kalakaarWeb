const express = require('express');
const artist_route = express.Router();
const artists = require("../models/artists");
const recruiters = require("../models/recruiter");
const Posts = require("../models/posts");
const work = require('../models/work');
const category = require('../models/category');
const applied = require('../models/applied');
const multer = require('multer');
const upload = multer({ dest: 'public/imgs/' });

//signup for artist
artist_route.get("/signup",(req,res)=>{
    res.render("signup",{title:"Register here..."});
    console.log("artist");

});

artist_route.post('/submitForm', async (req,res)=>{
    // get details
    const email = req.body.email;
    // let profile = req.body.profile;
    // profile = "public/imgs/"+profile;
    const role = req.body.role;
    if(role === "recruiter"){
        const recchk = await recruiters.findOne({ email });
        if(recchk){
            return res.status(401).json({message: "Email already exist" });
        }

        const recruiter = new recruiters({
            fullname: req.body.fullname,
            email,
            password: req.body.password,
            contact: req.body.contact,
        });

        recruiter.save().then(()=>{
            req.session.message = {
                type: "success",
                message: "recruiter registered successfully",
            };
            res.redirect("/signin");
        }).catch((err)=>{
            res.json({ message: err.message });
        });
    }
    else{

        const recchk = await artists.findOne({ email });
        if(recchk){
            return res.status(401).json({message: "Email already exist" });
        }

        const artist = new artists({
            fullname: req.body.fullname,
            email,
            password: req.body.password,
            contact: req.body.contact,
        });
        
        artist.save().then(()=>{
            req.session.message = {
                type: "success",
                message: "artist registered successfully",
            };
            res.redirect("/signin");
        }).catch((err)=>{
            res.json({ message: err.message });
        });
            
    }
});

// artist login
artist_route.get("/signin",(req,res)=>{
    res.render("signin",{title:"Sigin here..."});
    console.log("artist");

});

artist_route.post('/verifySignin', async (req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        console.log("Email:",email, "Password:",password);
        const artist = await artists.findOne({$and: [{ email }, { password }],}); // Replace with your authentication logic
        const recruiter = await recruiters.findOne({$and: [{ email }, { password }],}); // Replace with your authentication logic

        if (artist) {
            req.session.loggedin = true;
            req.session.userId = artist._id; 
            req.session.user = "artist";
            res.redirect('/');
        }else if(recruiter){
            req.session.loggedin = true;
            req.session.userId = recruiter._id; 
            req.session.user = "recruiter";
            res.redirect('/uploadworkform');
        } else {
            res.status(401).send('Invalid username or password');
        }
    }
    catch(error){
        res.send(error);
    }
})

//upload post achivements
artist_route.get("/uploadPost",(req,res)=>{
    res.render("artistView/uploadPost");
});
  

//profile
artist_route.get("/profile", async (req, res) => {
    try {
        const artist = await artists.findOne({ _id: req.session.userId });
        console.log("here0");
        
        if(artist)
        {
            if(artist.completed){
                console.log("here");
                res.render("artistView/profile",{ artist });
            }
            else{
                res.render("artistView/uploadprofile");
            }
        }
        else{
            res.render("signin");
        }
    } catch (err) {
        // Handle error
        console.log(err);
    }
});

artist_route.post("/uploadprofile", upload.fields([{ name: 'profile', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
    let profilephoto = req.files.profile[0].filename; // multer stores files in req.files
    profilephoto = "public/imgs/" + profilephoto;
    let profilevideo = req.files.video[0].filename;
    profilevideo = "public/imgs/" + profilevideo;

    const artist = await artists.findOne({ _id: req.session.userId });

    const updatedtls = {
        location: req.body.location,
        profession: req.body.profession,
        budget: req.body.budget,
        description: req.body.description,
        achivements: req.body.achivements,
        profilephoto,
        profilevideo,
        completed: true,
    };

    artists.updateOne(artist, { $set: updatedtls })
    .then(() => {
        req.session.message = {
            type: "success",
            message: "updated successfully",
        };
        res.redirect("/");
    })
    .catch((err) => {
        res.redirect("/signin");
    });
});


//upload work and collabration invitation
artist_route.get("/uploadworkform",(req,res)=>{
    res.render("recruiterView/uploadworkform");
});
  
artist_route.post("/uploadworksubmit", async (req, res) => {
    //get details
    console.log("here");
    const newWork = new work({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        duration: req.body.duration,    
        budget: req.body.budget,
        date: req.body.date,
        recId: req.session.userId,
    });
    console.log(newWork);
    newWork.save()
    .then(() => {
        req.session.message = {
        type: "success",
        message: "work added successfully",
        };
        console.log("Added");
        res.redirect("/");
    })
    .catch((err) => {
        console.log(err);
        res.json({ message: err.message });
        res.redirect("/signin");
    });
});

// apply job
artist_route.get("/appliedjobs", async (req, res) => {
    try {
      // 1. Fetch applied jobs for the artist
        const allApplication = await work.find();
        res.render('artistView/appliedJobs',{ allApplication })
      
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching applied jobs'); // Handle errors gracefully
    }
  });
  

artist_route.post("/applyjob", async (req, res) => {
    //get details
    const workId = req.body.workId
    const testwork = await work.findOne({ _id:workId});

    let recId = testwork.recId;
    const application = new applied({
        artistId: req.session.userId,
        workId: req.body.workId,
        praposal: req.body.praposal,
        recId,
    });

    application.save()
    .then(() => {
        req.session.message = {
        type: "success",
        message: "applied successfully",
        };
        console.log("Added");
        res.redirect("/");
    })
    .catch((err) => {
        res.json({ message: err.message });
        res.redirect("/signin");
    });
});

//landing page
artist_route.get('/', async (req,res)=>{
    try{
        if(req.session.loggedin){
            const allWorks = await work.find();
            res.render('home', { allWorks });
        }
        else{
            res.render('landing',{ title:"Kalakaar" });
        }
    }catch (err) {
        console.log(err);
    }
});

//home
artist_route.get('/home', async (req,res)=>{
    try{
        // const allCategory = await category.find().toArray();  
        const allWorks = await work.find();

        res.render("home",{ allWorks });
    }catch (err) {
        console.log(err);
    }

});

//show post 
artist_route.get('/openCategory/:id', (req,res)=>{

});

artist_route.get('/logout', async (req,res)=>{
    
    try {
        req.session.destroy();
        res.redirect('/signin');
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Somthing went wrong'); // Handle errors gracefully
    }
    
})

module.exports = artist_route;
