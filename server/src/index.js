import dotenv from 'dotenv';
import { app } from './app.js'; // import the app instance from app.js, to get the express server, middlewares and routes

dotenv.config({path: './.env' }); // load environment variables from .env file

const PORT = process.env.PORT || 5000; // setting the port to listen on 5000 in case the environment variable is not set

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`); // log the port the server is listening on
})