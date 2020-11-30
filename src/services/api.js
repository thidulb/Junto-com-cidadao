import axios from "axios";

const api = axios.create({
    baseURL: "http://prodamjuntocomcidadao.azurewebsites.net/api"
})

export default api;