import Api from '@/services/Api'
const API_USER = "";
const API_URL = "api/";

export default {

    getProductos(credentials) {    
        return Api().get(API_URL + API_USER + "get_productos", credentials)
    },
  
}