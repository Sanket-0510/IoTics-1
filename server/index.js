require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(process.env.DATABASE_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("connected");
    },
    (e) => {
      console.log(e);
    }
  );
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    
 
  },
  email: {
    type: String,
    unique:true
    
  },
  rollNO: {
    type: Number,
    unique:true
  
  },
  phoneNo: {
    type: Number
   
  },
});

const user = new mongoose.model("user", userSchema);
app.listen(8000, async (req, res) => {
  console.log("listening");
});

app.post("/register", async (req, res) => {
  try {
  
    const { firstname, email, rollNo, phoneNo } = req.body;
    console.log(req.body.email)
    const doc = new user({
      name: firstname,
      email: email,
      rollNO: rollNo,
      phoneNo: phoneNo,
    });
    const result = await doc.save();
    console.log(result);
    res.send("ok ok")
  } catch (e) {
    console.log(e);
  }
});
app.get("/register",async(req,res)=>{
   res.send("nice")
   console.log("nice")
}
)
