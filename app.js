//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const lodash = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//mongoose.connect("mongodb://127.0.0.1:27017/blog",{useNewURLParser:true});
mongoose.connect("mongodb+srv://Ram:Test-123@cluster0.h4zfrej.mongodb.net/blogDB",{useNewURLParser:true});

const postSchema = {
  title : String,
  post : String
}

//model 
const Post = mongoose.model("Post",postSchema);

let posts = [];

app.get("/",async function(req,res){

  const result = await Post.find({});
  if(!result) {
    const defaultPost = new Post({
    title : "Home",
    post : homeStartingContent
  });
  defaultPost.save();
  res.render("home",{Content : homeStartingContent,Posts:result});
  }
  else {
    res.render("home",{Content : homeStartingContent,Posts:result})
  }

  // console.log(result);
  // console.log(result[0].title);

  
});

app.get("/about",function(req,res){
  res.render("about",{secondContent:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{lastContent:contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",async function(req,res){
  const titleCompsoe = req.body.postTitle;
  const postBody = req.body.postBody;

  const titlePresent = await Post.findOne({title : titleCompsoe});

  if(titleCompsoe === titlePresent){
    console.log("This type of blog alredy present...");
  }else {
  
  const post = new Post({
    title : titleCompsoe,
    post : postBody
  });
  post.save();
  }
  //posts.push(post);
  res.redirect("/");
});

app.get("/post/:topics",async function(req,res){
  let postName = req.params.topics;
 // console.log(postName);
 //let lowercasestr = lodash.lowerCase(postName);

  const result = await Post.findById(postName);
  //console.log(result);
  //console.log(result);

  
  res.render("post",{postTitle : result.title, postBody : result.post})

  // posts.forEach(function(post){
  //   if(lowercasestr === lodash.lowerCase(post.title))
  //   {
  //      res.render("post",{postTitle : post.title, postBody : post.postBody});
  //   }
  // });
});

const port = process.env.PORT;

if(port == null || port == "" || port == " "){
  post = 3000;
}





app.listen(port, function() {
  console.log("Server started on port" +" "+port);
});
