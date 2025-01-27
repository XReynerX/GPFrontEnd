import axios from "axios";

export default  axios.create({
    params: {
        baseURL: 'https://localhost:7087/api/v1.0',
        key: ''
    }
})