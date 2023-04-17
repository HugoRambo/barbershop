const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://hugorambo18:25081995@clusterdev.huxtqd1.mongodb.net/salao-na-mao?retryWrites=true&w=majority";
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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);





//const mongoose = require('mongoose')


//const URI = 'mongodb+srv://hugorambo18:@Fifaemarra2008@clusterdev.huxtqd1.mongodb.net/?retryWrites=true&w=majority'



//const uri = "mongodb://127.0.0.1:27017/testemongodb";
//mongodb://localhost:27017
/*mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao banco de dados'))
  .catch(error => console.error('Erro ao conectar ao banco de dados', error));*/