import axios from "axios";

const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
};

const httpClient = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
        
    }
});

export default httpClient;