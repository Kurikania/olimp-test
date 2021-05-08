const express = require("express");
const app = express();
const http = require("http").createServer(app);
const fs = require("fs");
const fastcsv = require("fast-csv");
const cors = require("cors");
const path = require('path')
app.use(cors());
//app.use("../dist", express.static(__dirname + "/dist"));
app.use(express.static(path.join(__dirname, '/../dist')));
app.use(express.urlencoded());
const { Parser } = require("json2csv");
app.use(express.json());

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const uri =
  "mongodb+srv://abc123:123@cluster0.lthio.mongodb.net/myFirstDatabase?";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//mongodb+srv://abc123:3PCSw$Krq-v#iQ!@cluster0.22thd.mongodb.net/graphql-react?retryWrites=true&w=majority
const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error: ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));

const itemScema = new Schema({
  question1: Object,
  question2: Object,
  question3: Object,
  question4: Object,
  question5: Object,
  userAge: String,
  userEducation: String,
  userComputerLevel: String,
  userComputerExperienceYears: String,
  userProf: String,
  userProgExperience: String,
  userGamingExperience: String,
  withTree: Boolean
});

const CommentScema = new Schema({  
  complexity: String,
  userProf: String,
  improvments: String,
  userId : String
});

const Items = mongoose.model("Item", itemScema);
const Comments = mongoose.model("Comment", CommentScema);

app.get("/api/data", async (req, res) => {
  var data;
  data = await Items.find({});
  console.log("DATA LENGTH", data.length);
  res.send({number: data.length})
});

app.get("/api/exportData", async (req, res) => {
  var data;
  data = await Items.find({});
  data = JSON.stringify(data);
  data = JSON.parse(data);
  console.log("data", data);

  const json2csvParser = new Parser();
  let file
  try {
    const csv = json2csvParser.parse(...data);
   file = fs.writeFile("public/data.csv", csv, function(err) {
      if (err) throw err;
      console.log("file saved");
      res.download("public/data.csv")
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/new", async (req, res) => {
  const record = new Items();
  try {
    let newRecord = null
    await record.save(function(err,items) {
      newRecord = items.id;
      console.log(newRecord);
      res.send({id: newRecord})
   });
    // res.redirect(`authors/${newAuthor.id}`)
  } catch(err) {
    console.log(err)
  }
})

app.post("/api/post", async (req, res) => {
  console.log(req.body.userInfo);
  await Items.findByIdAndUpdate(req.body.userInfo.id, { 
    question1: req.body.questions[0],
        question2: req.body.questions[1],
        question3: req.body.questions[2],
        question4: req.body.questions[3],
        question5: req.body.questions[4],
        userAge:  req.body.userInfo.age,
        userEducation: req.body.userInfo.education,
        userComputerLevel: req.body.userInfo.computerLevel,
        userComputerExperienceYears: req.body.userInfo.computerExperienceYears,
        userProf: req.body.userInfo.prof,
        userProgExperience: req.body.userInfo.progExperience,
        userGamingExperience: req.body.userInfo.gamingExperience,
        withTree: req.body.withTree
  })
  res.send(req.body);
});

app.post("/api/comments", async (req, res) => {
  console.log(req.body);
  const record = new Comments({
    complexity: req.body.complexity,
    comments: req.body.comments,
    improvments: req.body.improvments,
    userId : req.body.userId
  });
  try {
    let newRecord = null
    await record.save(function(err,items) {
      newRecord = items.id;
      res.send({id: newRecord})
   });
  } catch(err) {
    console.log(err)
  }
  res.send(req.body);
});

app.get("/api/comments", async (req, res) => {
  var data;
  data = await Comments.find({});
  data = JSON.stringify(data);
  data = JSON.parse(data);
  console.log("data", data);

  const json2csvParser = new Parser();
  let file
  try {
    const csv = json2csvParser.parse(...data);
   file = fs.writeFile("public/data.csv", csv,'utf-8', function(err) {
      if (err) throw err;
      console.log("file saved");
      res.download("public/data.csv")
    });
  } catch (err) {
    console.log(err);
  }
});

http.listen(process.env.PORT || 3000, function() {
  console.log("Connected");
});
