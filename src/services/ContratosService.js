import Api from '@/services/Api'
const API_USER = "";
const API_URL = "api/";

export default {

    getPaquetes(credentials) {    
        return Api().get(API_URL + API_USER + "get_paquetes", credentials)
    },
    
    getContratosUser(credentials) {    
        return Api().get(API_URL + API_USER + "get_contratos_user/"+ credentials.user)
    },
    addContrato(credentials) {    
        return Api().post(API_URL + API_USER + "add_contrato", credentials)
    },
    setPagoContrato(credentials) {    
        return Api().get(API_URL + API_USER + "set_pago_contrato/"+ credentials.publicacion)
    },
    getContratos(credentials) {    
        return Api().get(API_URL + API_USER + "get_contratos/", credentials)
    },
    getContratosCliente(credentials) {    
        return Api().get(API_URL + API_USER + "get_contratos_clientes/", credentials)
    },
    getContratosEmpresa(credentials) {    
        return Api().get(API_URL + API_USER + "get_contratos_empresa/", credentials)
    },
    
    
  
}