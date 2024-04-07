import express from "express";
const app=express();
import authRoute from './routes/auth.js';
import userRoute from './routes/users.js';
import postRoute from './routes/posts.js';
import likeRoute from './routes/likes.js';
import commentRoute from './routes/comments.js';
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import relationshipRoute from './routes/relationships.js';

//middleware
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials", true);
    next();
})
app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
}));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });

  app.post("/api/upload", upload.single("file"),(req, res)=>{
    const file = req.file;
    res.status(200).json(file.filename);
  })

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/likes", likeRoute);
app.use("/api/comments", commentRoute);
app.use("/api/relationship", relationshipRoute);

app.listen(8000,()=>{
    console.log("API working!....");
})