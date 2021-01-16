import Api from '@/services/Api'
const API_USER = "";
const API_URL = "api/";

export default {

    getEmprendimientos(credentials) {    
        return Api().get(API_URL + API_USER + "get_emprendimientos", credentials)
    },
    addEmprendimiento(credentials) {
        return Api().post(API_URL + API_USER + "nuevo_emprendimiento", credentials)
    },  
    getPublicacionEmprendimientos(credentials) {    
        return Api().get(API_URL + API_USER + "get_publicaciones_emprendimientos", credentials)
    },
  
}