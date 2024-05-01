// working on the backend 
const express = require("express")
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const multer = require("multer");
const router = express.Router();
const authRoute = require('../facebookcloneBackend/routes/auth')
const userRoute = require('../facebookcloneBackend/routes/users')
const postRoute = require('../facebookcloneBackend/routes/posts')

const PORT = 3000

dotenv.config();

//Mongodb credentials 
//Username :- nernaykumar98
//Password :- bVlSPtcfvuTCW9hB

//middleware

try {
    mongoose.connect(
        process.env.MONGODB_URL,
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error?.message);
}


app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/post", postRoute)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

// get api we have

app.get("/",(req, res) => {
  res.status(200).json({
    message : "message sent successfully!"
  })
})

