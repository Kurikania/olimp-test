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
  name: String,
  time: Number,
  text: String,
  age: Number,
  profession: String,
});

const Items = mongoose.model("Item", itemScema);

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

  try {
    const csv = json2csvParser.parse(...data);
    fs.writeFile("public/data.csv", csv, function(err) {
      if (err) throw err;
      console.log("file saved");
    });
  } catch (err) {
    console.error(err);
  }
});

app.post("/post", async (req, res) => {
  console.log(req.body);
  const record = new Items({
    name: req.body.name,
    time: req.body.time,
    text: req.body.text,
    age: req.body.age,
    profession: req.body.profession,
  });
  try {
    const newRecord = await record.save()
    // res.redirect(`authors/${newAuthor.id}`)
  } catch(err) {
    console.log(err)
  }
  res.send(req.body);
});

http.listen(process.env.PORT || 3000, function() {
  console.log("Connected");
});
