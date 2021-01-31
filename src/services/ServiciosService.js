import Api from '@/services/Api'
const API_USER = "";
const API_URL = "api/";

export default {

    getServicios(credentials) {    
        return Api().get(API_URL + API_USER + "get_servicios", credentials)
    },
    
    getserviciossHijos(credentials) {    
        return Api().get(API_URL + API_USER + "get_serviciossHijos", credentials)
    },
    addServicio(credentials) {
        return Api().post(API_URL + API_USER + "nuevo_servicio", credentials)
    },  
    getProductos(credentials) {    
        return Api().get(API_URL + API_USER + "get_publicaciones", credentials)
    },
    getPublicacionServicios(credentials) {    
        return Api().get(API_URL + API_USER + "get_publicaciones_servicios", credentials)
    },
    searchPublicacionesPorServicio(credentials) {    
        return Api().post(API_URL + API_USER + "search_publicaciones_servicios", credentials)
    },
    
  
}