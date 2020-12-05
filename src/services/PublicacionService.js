import Api from '@/services/Api'
const API_USER = "";
const API_URL = "api/";

export default {

    getPublicaciones(credentials) {    
        return Api().get(API_URL + API_USER + "get_publicaciones", credentials)
    },
    addPublicacion(credentials) {
        return Api().post(API_URL + API_USER + "nueva_publicacion", credentials)
    },
    getImagen(credentials) {    
        return Api().get(API_URL + API_USER + "getImagen", credentials)
    },
    addImagen(credentials) {    
        return Api().post(API_URL + API_USER + "addImagen", credentials)
    },
    
}