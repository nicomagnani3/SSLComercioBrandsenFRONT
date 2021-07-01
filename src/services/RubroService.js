import Api from '@/services/Api'
const API_USER = "";
const API_URL = "api/";

export default { 

    addRubro(credentials) {
        return Api().post(API_URL + API_USER + "nuevo_rubro", credentials)
    },
   
    
}