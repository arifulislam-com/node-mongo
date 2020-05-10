const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const dbUser = "dbUser2";
const dbPass = "B8d2aiAqWCdzDDrU";

const users = ["Abul", "Khayer", "Alongir", "Moin", "Jolil", "Rashed"];

//database connection

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbUser2:B8d2aiAqWCdzDDrU@cluster0-ifnyo.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("onlineStore").collection("products");
  // perform actions on the collection object
  collection.insertOne({
      name:'Laptop',
      price:200,
      stoke:10
  },(err, res)=>{
      console.log("successfully inserted", err)
  })
  console.log('Database connected...')
  client.close();
});



app.get('/', (req, res) => {
    const fruit = {
        product: "ada",
        price: 220
    }
    res.send(fruit);
});
app.get('/ariful/islam', (req, res) =>{
    res.send({name:"ariful", address: "Fazilpur"})
});
app.get("/user/:id", (req, res) =>{
    const id = (req.params.id);
    const name  = users[id];
    res.send({name, id});
});

//Post
app.post('/addUser', (req, res) =>{
    //save to database
    const user = req.body;
    user.id = 55;
    res.send(user);
})

app.listen(4200, () => console.log("Listening to port 4200"));