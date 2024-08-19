import axios from 'axios';
dotenv.config();

const Axios = axios.create({
    baseURL: process.env.BACKEND_BASED_URL
})

export default Axios;