import express from 'express';
import { Ranges } from './models/Sensor.js';
import db from './config/Database.js';
import cors from "cors";

const app = express();
const PORT = 5000;

try {
    await db.authenticate();
    // await Ranges.sync();
    console.log("Database connected");

} catch(err) {
    console.log(err);
}

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());

app.get("/hello", async(req, res) => {
  res.json({message: "Masuk gan!"});
})

app.post("/add", async(req, res) => {
  const { range } = req.body;
  try {
      await Ranges.create({
        range: range
      });
      res.status(200).json({message: "Berhasi mengirim data!"});
  } catch(err) {
    console.log(err);
    res.json({message: "Error internal"});
  }
})

// app.get("/range", async(req, res) => {
//   try {
//     const range = await Ranges.findAll({
//       limit: 7,
//       order: [
//         ['createdAt', 'DESC']
//       ]
//     });

//     res.json(range);
//   }
//   catch(err) {
//     console.log(err)
//   }
// });

app.get("/range/last", async(req, res) => {
  try {
    const lastRange = await Ranges.findOne({
      order: [
        ['createdAt', 'DESC']
      ]
    });

    res.json(lastRange);
  }
  catch(err) {
    console.log(err)
  }
});

app.listen(PORT, () => console.log("Server running at http://localhost:5000"));