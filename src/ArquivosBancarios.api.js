import axios from 'axios';

const arquivosBancariosApi = axios.create({
    baseURL:'http://localhost:8080/arquivosBancarios'})

 export default arquivosBancariosApi;
