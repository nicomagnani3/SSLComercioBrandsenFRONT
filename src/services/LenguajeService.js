import Api from '@/services/Api'
const API_USER = "";
const API_URL = "api/";

export default {

    getLenguaje(credentials) {    
        return Api().get(API_URL + API_USER + "traducciones", credentials)
    },
    actualizarLenguaje(credentials) {    
        return Api().post(API_URL + API_USER + "actualizar_traducciones", credentials)
    },
   
   
    
}