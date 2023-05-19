const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
require('dotenv').config();
const cors = require('cors')
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.VITE_USER}:${process.env.VITE_PASSWORD}@cluster0.jt15atw.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
 useNewUrlParser: true,
 useUnifiedTopology:true,
 maxPoolSize:10
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect((err)=>{
       if(err){
        console.log(err);
         return ;
       }
    });
    const ToyShopCollection = client.db("ToycarDB").collection("ShopCategory");


    app.get('/shop/:id', async (req, res) => {
      const id = req.params.id;
      const query = { category: id }
      const result = await ToyShopCollection.find(query).toArray();
      res.send(result)

    });
    app.post('/shop', async (req, res) => {
      const body = req.body;
      const result = await ToyShopCollection.insertOne(body);
      res.send(result)
    })


    app.get('/shop', async (req, res) => {
      // console.log(req.query.email);
      let query = {};
      if (req.query?.email) {
        query = { email: req.query.email }
      }
      const result = await ToyShopCollection.find(query).toArray();
      res.send(result)
    })

    app.get('/shopdetils/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await ToyShopCollection.findOne(query);
      res.send(result);
    })

    app.put('/shop/:id', async (req, res) => {
      const id = req.params.id;
      const car = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateCar = {
        $set: {
          name: car.name,
          email: car.email,
          price: car.price,
          rating: car.rating,
          description: car.description,
          quantity: car.quantity,
          image: car.image,
          sellername: car.sellername,
          category: car.category
        },
      };
      const result = await ToyShopCollection.updateOne(filter, updateCar, options);
      //  console.log(car);
      res.send(result);
    });

    //  delete aption 

    app.delete('/shopDelete/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await ToyShopCollection.deleteOne(query);
      res.send(result);
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