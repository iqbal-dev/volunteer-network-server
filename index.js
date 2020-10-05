const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.j1hzz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const port = 5000;

console.log(process.env.DB_PASS,process.env.DB_NAME)

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
    const volunteerCollection = client.db(`${process.env.DB_NAME}`).collection("volunteerCollection");
    const volunteerDetailCollection = client.db(`${process.env.DB_NAME}`).collection("volunteerDetailCollection");
    app.post('/volunteer', (req, res) => {
        const volunteer = req.body;
      
        console.log(volunteer)
    })
    app.post('/addEvent', (req, res) => {
        volunteerCollection.insertOne(req.body)
        console.log(req.body)
    })
    app.get('/getVolunteer', (req, res) => {
        volunteerCollection.find({})
            .toArray((err, documents) => {
            res.send(documents)
        })
    })
    app.get('/getVolunteerDetail/:id', (req, res) => {
        volunteerCollection.find({_id: ObjectId(req.params.id )})
            .toArray((err, documents) => {
                res.send(documents[0])
        })
    })
    app.post('/register', (req, res) => {
        volunteerDetailCollection.insertOne(req.body)
            .then(result => {
        })
    })
    app.get('/eventTask', (req, res) => {
        volunteerDetailCollection.find({ email: req.query.email })
            .toArray((err, document) => {
            res.send(document)
        })
    })
    app.get('/allVolunteer', (req, res) => {
        volunteerDetailCollection.find({})
            .toArray((err, documents) => {
            res.send(documents)
        })
    })
    app.delete('/delete/:id', (req, res) => {
        volunteerDetailCollection.deleteOne({ _id: ObjectId(req.params.id) })
            .then(result => {
            
        })
    })
    app.delete('/cancel/:id', (req, res) => {
        volunteerDetailCollection.deleteOne({ _id: ObjectId(req.params.id) })
            .then(res => {
            
        })
    })

});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT ||port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})