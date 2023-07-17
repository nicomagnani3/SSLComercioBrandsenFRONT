import Api from "@/services/Api";
const API_USER = "";
const API_URL = "api/";
import axios from "axios";

export default {
  getPaquetes(credentials) {
    return Api().get(API_URL + API_USER + "get_paquetes", credentials);
  },

  getContratosUser(credentials) {
    return Api().get(
      API_URL + API_USER + "get_contratos_user/" + credentials.user
    );
  },
  addContrato(credentials) {
    return Api().post(API_URL + API_USER + "add_contrato", credentials);
  },
  setPagoContrato(credentials) {
    return Api().get(
      API_URL + API_USER + "set_pago_contrato/" + credentials.publicacion
    );
  },
  getContratos(credentials) {
    return Api().get(API_URL + API_USER + "get_contratos/", credentials);
  },
  getContratosCliente(credentials) {
    return Api().get(
      API_URL + API_USER + "get_contratos_clientes/",
      credentials
    );
  },
  getContratosEmpresa(credentials) {
    return Api().get(
      API_URL + API_USER + "get_contratos_empresa/",
      credentials
    );
  },
  getCurriculums(credentials) {
    return Api().get(API_URL + API_USER + "get_curriculum/", credentials);
  },
  deleteCurriculum(id){
    return Api().delete(API_URL + API_USER + "delete_curriculum/" +id );

  },
  descargarCV(id,tipo) {
    let credenciales = window.localStorage.getItem("token"); 
    axios({
      method: "get",
      url: "https://malambobelgranoapi.com.ar/api/descargarcurriculum/" + id,
      responseType: "arraybuffer",
      headers: { Authorization: "Bearer " + credenciales },
    }).then(function(response) {
      const blob = new Blob([response.data], { type: "application/pdf" });
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "curriculum"+id+"."+tipo;
      link.click();
    });
  },
};
