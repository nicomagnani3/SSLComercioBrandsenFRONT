import Api from '@/services/Api'
const API_USER = "";
const API_URL = "api/";

export default {

    crearPreferencia(credentials) {    
        return Api().post(API_URL + API_USER + "create_preference", credentials)
    },
}