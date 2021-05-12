const express = require("express");
const app = express();
const http = require("http").createServer(app);
const fs = require("fs");
const fastcsv = require("fast-csv");
const cors = require("cors");
const path = require("path");
const history = require('connect-history-api-fallback');
const serveStatic = require('serve-static')
app.use(history());
app.use(cors());
//app.use("../dist", express.static(__dirname + "/dist"));
app.use(serveStatic(path.join(__dirname, "/../dist")));
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

const itemScema = new Schema(
  {
    userAge: String,
    userEducation: String,
    userComputerLevel: String,
    userComputerExperienceYears: String,
    userProf: String,
    userProgExperience: String,
    userProgComment: String,
    withTree: Boolean,

    question1Answer: String,
    question1Complexity: Number,
    question1Time: Number,

    question2Answer: String,
    question2Complexity: Number,
    question2Time: Number,

    question3Answer: String,
    question3Complexity: Number,
    question3Time: Number,

    question4Answer: String,
    question4Complexity: Number,
    question4Time: Number,

    question5Answer: String,
    question5Complexity: Number,
    question5Time: Number,
  },
  { timestamps: { createdAt: 'created_at' } }
);

const CommentScema = new Schema({
  comments: String,
  improvments: String,
  userId: String,
});

const Items = mongoose.model("Item", itemScema);
const Comments = mongoose.model("Comment", CommentScema);

app.get("/api/data", async (req, res) => {
  var data;
  data = await Items.find({});
  console.log("DATA LENGTH", data.length);
  res.send({ number: data.length });
});

app.get("/api/exportData", async (req, res) => {
  var data;
  data = await Items.find({});
  data = JSON.stringify(data);
  data = JSON.parse(data);
  console.log("data", data);

  const json2csvParser = new Parser();
  let file;
  try {
    const csv = json2csvParser.parse(data);
    file = fs.writeFile("public/data.csv", csv, function(err) {
      if (err) throw err;
      console.log("file saved");
      res.download("public/data.csv");
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/new", async (req, res) => {
  console.log(req.body.userInfo)
  const record = new Items({
    userAge: req.body.userInfo.age,
    userEducation: req.body.userInfo.education,
    userComputerLevel: req.body.userInfo.computerLevel,
    userComputerExperienceYears: req.body.userInfo.computerExperienceYears,
    userProf: req.body.userInfo.prof,
    userProgExperience: req.body.userInfo.progExperience,
    userProgComment: req.body.userInfo.progComment,
  });
  try {
    let newRecord = null;
    await record.save(function(err, items) {
      newRecord = items.id;
      console.log(newRecord);
      res.send({ id: newRecord });
    });
    // res.redirect(`authors/${newAuthor.id}`)
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/post", async (req, res) => {
  console.log(req.body.questions);
  if(req.body.questions) {
    await Items.findByIdAndUpdate(req.body.userInfo.id, {
      question1Answer: req.body.questions[0].answer,
      question1Complexity: req.body.questions[0].complexity,
      question1Time: req.body.questions[0].time,
      
      question2Answer: req.body.questions[1].answer,
      question2Complexity: req.body.questions[1].complexity,
      question2Time: req.body.questions[1].time,
      
      question3Answer: req.body.questions[2].answer,
      question3Complexity: req.body.questions[2].complexity,
      question3Time: req.body.questions[2].time,
      
      question4Answer: req.body.questions[3].answer,
      question4Complexity: req.body.questions[3].complexity,
      question4Time: req.body.questions[3].time,
      
      question5Answer: req.body.questions[4].answer,
      question5Complexity: req.body.questions[4].complexity,
      question5Time: req.body.questions[4].time,
      withTree: req.body.withTree,
    });
  } else {
    await Items.findByIdAndUpdate(req.body.userInfo.id, {
      withTree: req.body.withTree,
    })
  }
  res.send(req.body);
});

app.post("/api/comments", async (req, res) => {
  console.log(req.body);
  const record = new Comments({
    comments: req.body.comments,
    improvments: req.body.improvments,
    userId: req.body.userId,
  });
  try {
    let newRecord = null;
    await record.save(function(err, items) {
      newRecord = items.id;
      res.send({ id: newRecord });
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/comments", async (req, res) => {
  var data;
  data = await Comments.find({});
  data = JSON.stringify(data);
  data = JSON.parse(data);
  console.log("data", data);

  const json2csvParser = new Parser();
  let file;
  try {
    const csv = json2csvParser.parse(...data);
    file = fs.writeFile("public/comments.csv", csv, "utf-8", function(err) {
      if (err) throw err;
      console.log("file saved");
      res.download("public/comments.csv");
    });
  } catch (err) {
    console.log(err);
  }
});

http.listen(process.env.PORT || 3000, function() {
  console.log("Connected");
});
