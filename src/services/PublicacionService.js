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
    getPublicacionesPorNombre(credentials) {    
        return Api().post(API_URL + API_USER + "getPublicacionesPorNombre", credentials)
    },
    getPublicacionesPorCategoria(credentials) {    
        return Api().post(API_URL + API_USER + "getpublicacionescategoria", credentials)
    },
    getImagenesPublicacion(credentials) {    
        return Api().post(API_URL + API_USER + "getImagenesPublicacion", credentials)
    },
    getTipoPublicaciones(credentials) {    
        return Api().get(API_URL + API_USER + "get_tipoPublicacion", credentials)
    },
    getPublicacionesUsuarios(credentials) {    
        return Api().post(API_URL + API_USER + "get_publicaciones_usuarios", credentials)
    },
    eliminarPublicacion(credentials) {    
        return Api().post(API_URL + API_USER + "eliminar_publicacion", credentials)
    },
    mercadoPago(credentials) {    
        return Api().post(API_URL + API_USER + "process_payment", credentials)
    },
    setPagoPublicacion(credentials) {    
        return Api().get(API_URL + API_USER + "set_pago_publicacion_producto/"+ credentials.publicacion)
    },
    getPreciosPublicaciones(credentials) {    
        return Api().get(API_URL + API_USER + "get_precios_publicaciones", credentials)
    },
    getRubros(credentials) {    
        return Api().get(API_URL + API_USER + "get_rubros", credentials)
    },
    
}