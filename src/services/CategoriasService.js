import Api from '@/services/Api'
const API_USER = "";
const API_URL = "api/";

export default {

    getCategorias(credentials) {    
        return Api().get(API_URL + API_USER + "get_categorias", credentials)
    },
    getcategoriasHijas(credentials) {    
        return Api().get(API_URL + API_USER + "get_categoriasHijas",credentials)
    },
    getBuscarCategorias(credentials) {    
        return Api().get(API_URL + API_USER + "get_buscar_categoria",credentials)
    },
    
    
  
}