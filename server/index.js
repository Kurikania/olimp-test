var express = require("express");
var app = express();
var http = require("http").createServer(app);
var fileSystem = require("fs");
var fastcsv = require("fast-csv");
 
app.use("/public", express.static(__dirname + "/public"));

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const uri = "mongodb+srv://abc123:123@cluster0.lthio.mongodb.net/myFirstDatabase?"

mongoose.connect(uri, {useNewUrlParser : true, useUnifiedTopology: true })
//mongodb+srv://abc123:3PCSw$Krq-v#iQ!@cluster0.22thd.mongodb.net/graphql-react?retryWrites=true&w=majority
const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));

const itemScema = new Schema({
    name: String,
    time: Number,
    text: String,
})

const Items = mongoose.model("Item", itemScema)
 

app.get("/exportData", async (request, result) => {
        var data     

        data = Items.find();
        console.log(data)
        data = await Items.find({})
        console.log(data)

    var ws = fileSystem.createWriteStream("public/data.csv");
    fastcsv
        .write(data, { headers: true })
        .on("finish", function() { 
            result.send("<a href='/public/data.csv' download='data.csv' id='download-link'></a><script>document.getElementById('download-link').click();</script>");
        })
        .pipe(ws);
});

http.listen(process.env.PORT || 3000, function () {
    console.log("Connected");
 
});