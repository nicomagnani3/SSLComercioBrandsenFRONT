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
        return Api().get(API_URL + API_USER + "get_publicaciones_emprendimientos_destacados", credentials)
    },
    searchPublicacionesPorEmprendimiento(credentials) {    
        return Api().post(API_URL + API_USER + "search_publicaciones_emprendimientos", credentials)
    },
    setPagoPublicacion(credentials) {    
        return Api().get(API_URL + API_USER + "set_pago_publicacion/"+ credentials.publicacion)
    },
    get_ultimas_emprendimientos_paginate(page){
        return Api().get(API_URL + API_USER + "get_ultimas_emprendimientos_paginate/"+ page)
    }
  
}