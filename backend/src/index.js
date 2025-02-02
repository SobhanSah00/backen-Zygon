import dotenv from "dotenv"
import connectDB from "./db/Database.js"
import { app } from "./app.js"

dotenv.config({
    path: "./env",
})

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("Error occurred",error);
        throw error;
    })

    app.listen(process.env.PORT || 5000, () => {
        console.log(`⚙️  Server running on port ${process.env.PORT} 🔥`)
    });
})
.catch((error) => {
    console.log("MONGODB CONNECTION FAILED");
    console.log("ERROR",error)
    throw error
})