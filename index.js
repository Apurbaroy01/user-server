const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion ,ObjectId} = require('mongodb');
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://adrikaroy487:z1dZJHilxwwf00q9@cluster0.znyn8om.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");

    const database = client.db("usersDB");
    const userCollection = database.collection("users");

    // Example route to get users

    
    app.get('/users', async (req, res) => {
      const users = await userCollection.find().toArray();
      res.send(users);
    });

    // Example route to add a user


    app.post('/users', async (req, res) => {
      const newUser = req.body;
      console.log(req.body);
      const result = await userCollection.insertOne(newUser);
      res.send(result);

    });

    // Delet a user by ID
    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      console.log("Delete user with ID:", id);
      const query ={ _id: new ObjectId(id)}
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

run();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
