import Api from '@/services/Api'
const API_USER = "";
const API_URL = "api/";

export default {

    sendEmail(credentials) {    
        return Api().post(API_URL + API_USER + "send_email", credentials)
    },
    getMailPersona(credentials) {    
        return Api().post(API_URL + API_USER + "get_mail_persona", credentials)
    },
   
    
}