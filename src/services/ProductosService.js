import Api from '@/services/Api'
const API_USER = "";
const API_URL = "api/";

export default {

    getProductosDestacados(credentials) {    
        return Api().get(API_URL + API_USER + "get_publicaciones_destacadas", credentials)
    },
    getProducto(credentials) {
        return Api().get(API_URL + API_USER + "publicacion/" + credentials.tipo + "/" + credentials.id);

    },
  
}