import Api from '@/services/Api'
const API_USER = "";
const API_URL = "api/";

export default {
    register(credentials) {
        return Api().post(API_URL + API_USER +'register', credentials)
    },
    registerEmpresa(credentials) {
        return Api().post(API_URL + API_USER +'register_empresa', credentials)
    },
    login(credentials) {
        return Api().post(API_URL + API_USER + "login", credentials)
    },
    logout(credentials) {
        return Api().post(API_URL + API_USER + "logout", credentials)
    },
    recuperarClave(credentials) {
        return Api().post(API_URL + API_USER + "recuperarClave", credentials)
    }
}