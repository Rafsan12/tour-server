import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from "./routes/user.js";
const port = 5000;

const app = express();
app.use(morgan("dev"));
app.use(express.json({limit:"30mb", extended: true}));
app.use(express.urlencoded({limit:"30mb", extended: true}));
app.use(cors());


// mongodb+srv://touradmin:<password>@cluster0.1sksogt.mongodb.net/?retryWrites=true&w=majority


app.use('/users', userRouter); // http://localhost:5000/users/signup



const MONGODB_URL = `mongodb+srv://tour_admin:1jrL3LydgaMx58KY@cluster0.1sksogt.mongodb.net/tour_db?retryWrites=true&w=majority`




mongoose
.connect(MONGODB_URL)
.then(() =>{
    app.listen(port,() => console.log(`Server running on port ${port}`));
})
.catch(error => console.log(`${error} did not connect`));


// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

// app.listen(port, () =>{
//     console.log(`Server running on port ${port}`);  
// });