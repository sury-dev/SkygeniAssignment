import express, { urlencoded } from 'express'; // for creating the server
import cors from 'cors'; // for ability to access the server from different domains

const app = express(); // create an instance of express

app.use(express.json({limit: '24kb'})); // for parsing json, with a limit of 20kb

app.use(urlencoded({ extended: true })); // for parsing urlencoded data, extended: true allows for rich objects and arrays to be encoded into the URL-encoded format

app.use(express.static('public')); // for serving static files from the public directory

const allowedOrigins = [
    'http://localhost:5173', // for local development
];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

// importing routes for modularity

import dataVisualizerRoutes from './routes/dataVisualizer.routes.js'; // for data visualization routes

// routes declaration
app.use('/api/v1', dataVisualizerRoutes); // for api versioning

export { app }; // export the app instance for use in other files