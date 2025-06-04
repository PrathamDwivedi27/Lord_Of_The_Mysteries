import express from 'express';
import bodyParser from 'body-parser';
import { PORT } from './config/server-config.js';
import { connectDB } from './config/db.js';
import apiRoutes from './routes/index.js'
import mongoose from 'mongoose';

const app=express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//database connection
connectDB();

//routes
app.use("/api",apiRoutes);



app.get('/', (req, res) => {
    res.send('Mathango Assignment is on');
});


const setup_and_start_server=()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
}

setup_and_start_server();


// shutdown server in case of crash or interruption like ctrl+c or kill command
const handleServerShutdown=async ()=>{
    try {
        console.log("Shutting down server...");
        console.log("Server shutdown complete.");
        await mongoose.connection.close();
        console.log("Database connection closed.");
        process.exit(0);
    } catch (error) {
        console.error("Error during server shutdown:", error);
        process.exit(1);
    }
}

process.on('SIGINT', handleServerShutdown);
process.on('SIGTERM', handleServerShutdown);
