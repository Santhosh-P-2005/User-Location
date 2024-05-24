const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const locationmodel = require('./model.js')
const PORT = 5500;

const app = express();

app.use(express.json());
app.use(cors());

const MONGO_URI = "mongodb://localhost:27017/intern"



mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
  });

  app.get("/api/locations", async (req, res) => {
    try {
      const locations = await locationmodel.find();
      res.status(200).json(locations);
    } catch (error) {
      console.error('Error fetching locations:', error);
      res.status(500).send({ message: "Error fetching locations" });
    }
  });

app.post("/api/location", async (req, res) => {

   console.log("hi")
  const { latitude, longitude } = req.body;
  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
   try{
    
    const obj= await locationmodel({latitude:latitude,longitude:longitude})
    obj.save()
    console.log("success")
   }
   catch(error)
   {
    res.status(500).send({message:"Unsuccessful"})
   }
});



app.listen(PORT, function () {
  console.log(`Server running at ${PORT}`);
});
