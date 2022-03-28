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
 
    getPublicacionServicios(credentials) {    
        return Api().get(API_URL + API_USER + "get_publicaciones_servicios_destacados", credentials)
    },
    searchPublicacionesPorServicio(credentials) {    
        return Api().post(API_URL + API_USER + "search_publicaciones_servicios", credentials)
    },    
    setPagoPublicacion(credentials) {    
        return Api().get(API_URL + API_USER + "set_pago_publicacion_servicio/"+ credentials.publicacion)
    },
    get_ultimas_servicios_paginate(page){
        return Api().get(API_URL + API_USER + "get_ultimas_servicios_paginate/"+ page)
    }
  
}