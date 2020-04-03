const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();


const app = express();

app.use(cors());
app.use(bodyParser.json());


const dbUser = process.env.DB_USER;
const password = process.env.DB_PASS;
const uri = `mongodb+srv://${dbUser}:${password}@cluster0-g2jg7.mongodb.net/test?retryWrites=true&w=majority`;


const fruits = ['mango', 'apple', 'orange', 'banana', 'watermelon'];
const users = ['Abdul Kader', 'Dilara Alo', 'Pulock', 'Palash', 'Promi', 'Piya'];
let client = new MongoClient(uri, { useNewUrlParser: true });

// db connection



//get
app.get('/products', (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        // perform actions on the collection object
        collection.find().toArray((err, documents) => {
            if(err) {
                console.log(err);
            }
            else {
                res.send(documents);
            }
            
        });
        console.log('Database connected...');
        client.close();
    });   
});

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const name = users[userId];
    res.send({id: userId, name: name});
});

//post
app.post('/addProduct', (req, res) => {
    const product = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        // perform actions on the collection object
        collection.insertOne(product, (err, result) => {
            if(err) {
                console.log(err);
            }
            else {
                res.send(result.ops[0]);
            }
            
        });
        console.log('Database connected...');
        client.close();
    });
    
});

const port = process.env.PORT || 4200;
app.listen(port, () => console.log('Listening to port 4200'));