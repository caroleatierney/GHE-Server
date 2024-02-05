// ******************************
// ******* DEPENDENCIES *********
// ******************************
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");

// ******************************
// ******** Express App *********
// ******************************
const app = express();

// ******************************
// ************ PORT ************
// ******************************
const PORT = process.env.PORT || 8000;

// ******************************
// ***********  MONGO ***********
// ******************************
connectDB();

// ******************************
// ********  MIDDLEWARE *********
// ******************************

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ******************************
// **********  DATABASE *********
// ******************************
const Soap = require('./models/Soap');
const soapSeed = require("./models/soapSeed");

// ******************************
// *********** ROUTES ***********
// ******************************

// ******************************
// ** POPULATE WITH SEED DATA ***
// ******************************
// ** remove after running once
// async function createSoap() {
//   try {
//     const data = await Soap.create(soapSeed);
//     console.log("Added provided soap data");
//   } catch (err) {
//     console.log(err.message);
//   }
// }
// createSoap();

// ******** Get All Data *********
app.get("/api/soaps", async (req, res) => {
  try {

    const category = req.query.category;
    // console.log(category)

    const filter = {};
    if (category) {
      filter.category = category;
    }

    const data = await Soap.find(filter);
    // res.json(data)

    if (!data) {
      throw new Error("An error occurred while fetching soaps.");
    }
    res.status(201).json(data);
  } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching soaps...this is from the index.js file" });
      return;
  }
});

// ******** Get a single soap by slug when user selects on soap *********
app.get("/api/soaps/:slug", async (req, res) => {
  try {
    const slugParam = req.params.slug;
    // console.log(slugParam);

    const data = await Soap.findOne({slug: slugParam});
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching a soap..." });
  }
});

// ******** Create soap *********
// app.post("/api/soaps", async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const data = await Soap.create({ title, description });

//     if (!data) {
//       throw new Error("An error occurred while creating a soap.");
//     }

//     res.status(201).json(data);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while creating a soap..." });
//   }
// });

// ******** Update a Soap *********
// app.put("/api/soaps/:id", async (req, res) => {
//   // res.send(req.params.id);
//   // res.send(req.body)

//   console.log(req.body)

//   let editSoap = {
//     name: req.body.name,
//     image: req.body.image,
//     percentSuperFat: req.body.percentSuperFat,
//     ingredients: {
//       ingredient1: req.body.ingredient1,
//       amount1: req.body.amount1,
//       ingredient2: req.body.ingredient2,
//       amount2: req.body.amount2,
//       ingredient3: req.body.ingredient3,
//       amount3: req.body.amount3,
//       ingredient4: req.body.ingredient4,
//       amount4: req.body.amount4,
//       ingredient5: req.body.ingredient5,
//       amount5: req.body.amount5,
//       ingredient6: req.body.ingredient6,
//       amount6: req.body.amount6,
//       ingredient7: req.body.ingredient7,
//       amount7: req.body.amount7,
//       ingredient8: req.body.ingredient8,
//       amount8: req.body.amount8,
//     },
//     costPerBar: req.body.costPerBar,
//     costPerPound: req.body.costPerPound,
//     addCostToGiftWrapPerBar: req.body.addCostToGiftWrapPerBar,
//     lyeCalculation: {
//       minimumWaterNeeded: req.body.minimumWaterNeeded,
//       sodiumHydroxide: req.body.sodiumHydroxide,
//     },
//     totalOilsWeight: req.body.totalOilsWeight,
//     totalRecipeWeight: req.body.totalRecipeWeight,
//     totalBarsAvail: req.body.totalBarsAvail,
//     exfoliating: req.body.exfoliating,
//     notes: req.body.notes,
//   };

//   try {
//     const soapId = req.params.id;
//     editSoap;
//     const data = await Soap.findByIdAndUpdate(soapId, editSoap);

//     if (!data) {
//       throw new Error("An error occurred while updating a soap.");
//     }

//     res.status(201).json(data);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while updating a soap..." });
//   }
// });

// // Delete a soap by Id
// app.delete("/api/soaps/:id", async (req, res) => {
//   try {
//     const soapId = req.params.id;
//     const data = await Soap.findByIdAndDelete(soapId);

//     if (!data) {
//       throw new Error("An error occurred while deleting a soap.");
//     }

//     res.status(201).json(data);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while deleting a soap..." });
//   }
// });

// ****************************************
// ************** LISTENER ****************
// ****************************************
app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});

app.get("*", (req, res) => {
  res.sendStatus("404");
});
