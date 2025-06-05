import express from 'express';
import bodyParser from 'body-parser';
import { PORT } from './config/server-config.js';
import { connectDB } from './config/db.js';
import apiRoutes from './routes/index.js'
import mongoose from 'mongoose';
import logger from './utils/logger.js';

const app=express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//database connection
connectDB();

//routes
// app.use('/',()=>{
//     logger.info("Root route accessed");
// })
app.use("/api",apiRoutes);



app.get('/', (req, res) => {
    res.send('Mathango Assignment is ready.');
});


const setup_and_start_server=()=>{
    app.listen(PORT,()=>{
        logger.info(`Server is running on port ${PORT}`);
    })
}

setup_and_start_server();


// shutdown server in case of crash or interruption like ctrl+c or kill command
const handleServerShutdown=async ()=>{
    try {
        logger.info("Shutting down server...");
        logger.info("Server shutdown complete.");
        await mongoose.connection.close();
        logger.info("Database connection closed.");
        process.exit(0);
    } catch (error) {
        logger.error("Error during server shutdown:", error);
        process.exit(1);
    }
}

process.on('SIGINT', handleServerShutdown);
process.on('SIGTERM', handleServerShutdown);
