import Api from '@/services/Api'
const API_USER = "";
const API_URL = "api/";

export default {

    getPublicidades(credentials) {    
        return Api().get(API_URL + API_USER + "get_publicidades", credentials)
    },
    addGuiaComercial(credentials) {
        return Api().post(API_URL + API_USER + "nueva_publicacion_guia_comercial", credentials)
    },
    getGuiaComercial(credentials) {    
        return Api().get(API_URL + API_USER + "get_guia_comercial", credentials)
    },
}