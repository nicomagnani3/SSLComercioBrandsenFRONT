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
    eliminarGuia(credentials) {
        return Api().post(API_URL + API_USER + "delete_guia_comercial", credentials)
    },
    getNovedad(credentials) {    
        return Api().get(API_URL + API_USER + "get_novedades", credentials)
    },
    addNovedad(credentials) {
        return Api().post(API_URL + API_USER + "nueva_novedad", credentials)
    },
    eliminarNovedad(credentials) {
        return Api().post(API_URL + API_USER + "delete_novedad", credentials)
    },
    addNuevaPublicidad(credentials) {
        return Api().post(API_URL + API_USER + "nueva_publicidad", credentials)
    },
    eliminarPublicidad(credentials) {
        return Api().post(API_URL + API_USER + "delete_publicidad", credentials)
    },
}