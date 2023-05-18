const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
require('dotenv').config();
const cors = require('cors')
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// console.log(process.env.VITE_PASSWORD);

// ToycarDB
// ShopCategory


const uri = `mongodb+srv://${process.env.VITE_USER}:${process.env.VITE_PASSWORD}@cluster0.jt15atw.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const ToyShopCollection = client.db("ToycarDB").collection("ShopCategory");


app.get('/shop', async(req,res)=>{
  
  const result=await ToyShopCollection.find().toArray();
  res.send(result)
})

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get('/', (req, res) => {
  res.send('toy Marketplace')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})