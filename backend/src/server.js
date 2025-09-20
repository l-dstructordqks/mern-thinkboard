import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001


app.use(cors({
    origin: "http://localhost:5173"
}))
// * Content Type: (type of content that the server will show) MIDDLEWARE
app.use(express.json()); // this MIDDLEWARE will parse JSON bodies: req.body, basically it allows to access to the req.body
app.use(rateLimiter);


app.use("/api/notes", notesRoutes);
//app.use("/api/products", productsRoutes);

connectDB().then( () => { //once the db is connected only then we start listening the port
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT);
        console.log("http://localhost:", PORT)
    });
});

