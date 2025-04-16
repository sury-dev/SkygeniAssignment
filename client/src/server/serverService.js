import axios from "axios";

export class ServerService { // class to handle server requests and to avoid vendor Lock In
    async getCountData(){
        try {
            const response = await axios.get("/api/v1/count-data"); // fetching the data from the server
            return response;
        } catch (error) {
            console.error("Server :: serverService.js :: Error fetching count data:", error);
            throw error.response; // Rethrow the error for further handling if needed
        }
    }

    async getAcvData(){
        try {
            const response = await axios.get("/api/v1/acv-data"); // fetching the data from the server
            return response;
        } catch (error) {
            console.error("Server :: serverService.js :: Error fetching acv data:", error);
            throw error.response; // Rethrow the error for further handling if needed
        }
    }
}

const serverService = new ServerService();
export default serverService;