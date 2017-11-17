'use strict';
const mongoose = require("mongoose"),
    express    = require("express"),
    app        = express(),
    request    = require("request"),
    bodyParser = require("body-parser");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp",{useMongoClient: true});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

const campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});
const Campground = mongoose.model("Campground", campgroundSchema); 

/*Campground.create({
    name:"Salmon creek",
    image: "https://farm9.staticflickr.com/8577/16263386718_c019b13f77.jpg",
    description: "One of the most wanted camps in the US!"
},(err,camp)=>{
    if (err){
        console.log(err);
    }
    else{
        console.log(camp);
    }
});

Campground.create({
    name:"Metzokey dragot",
    image: "https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg",
    description: "Very nice place above the dead sea"
},(err,camp)=>{
    if (err){
        console.log(err);
    }
    else{
        console.log(camp);
    }
});
*/

/*app.get("/",function(req, res) {
    res.render("landing");
});
*/
app.get("/campgrounds",function(req,res){
    Campground.find({},(err,allCampgrounds) => {
        if(err){
            console.log("Fails!");
        }
        else{
            res.render("campgrounds",{campgrounds:allCampgrounds});
        }
    })
       
});

app.post("/campgrounds",function(req,res){
    var name = req.body.campName;
    var image = req.body.imageURL;
    var description = req.body.campDescription;
    var newCampground = {name: name, image: image, description:description}
    Campground.create(newCampground,(err,camp) =>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/");

        }
    })
    
});

app.get("/campgrounds/new",function(req, res) {
    res.render("new.ejs");
})

app.get("/campgrounds/:id",(req,res)=>{
    Campground.findById(req.params.id,(err,foundCamp)=>{
       if(err){
           console.log(err)
       } 
       else{
           res.render("show.ejs",{campground:foundCamp});   
       }
    });
});

app.listen(process.env.PORT, process.env.IP,function(){
    console.log("Yelpcamp started!!!");
});