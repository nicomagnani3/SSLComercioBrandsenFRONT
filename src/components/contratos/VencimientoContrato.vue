<template>
  <b-container>
    <div v-if="loading" class="text-center">
      <br /><br />
      <br /><br />
      <b-spinner
        style="width: 11rem; height: 11rem"
        variant="warning"
        label="Text Centered"
      >
      </b-spinner>
    </div>
    <div v-else>
      <b-container fluid class="bv-example-row">
        <b-col>
          <transition
            v-for="contrato in contratos"
            v-bind:key="contrato.id"
            :per-page="perPage"
            :current-page="currentPage"
          >
            <b-card
              no-body
              class="overflow-hidden"
              style="max-width: auto; max-height: auto"
            >
              <b-card-body>
                <h3>
                 Usuario: <strong> {{ contrato.userMail }} </strong>
                </h3>
                <h4>Tipo de usuario: <strong> {{ contrato.userTipo }}</strong></h4>
                <p>
                  Vencimiento: <strong>{{ contrato.hasta | formatDate }}</strong>
                </p>
               <p> Paquete utilizado: <strong>{{ contrato.paquete }}</strong></p>
               <p> Cantidad publicaciones comunes disponibles:  <strong>{{contrato.cantnormal}}</strong></p>
               <p> Cantidad publicaciones destacadas disponibles: <strong>{{contrato.cantDestacada}}</strong></p>
               
                <div>
                  <a
                    v-if="contrato.userCel != null"
                    :href="
                      'https://api.whatsapp.com/send?text=Hola!%20,desde%20Malambo%20queriamos%20notificarle%20que%20se%20vence%20el%20contrato ' +
                      contrato.paquete +                    
                      ',el%20dia%20' + acomodarFecha( contrato.hasta) +
                      '&phone=+54' +
                      acomodarCelular(contrato.userCel)
                    "
                    target="_black"
                  >
                    <img
                      v-if="contrato.userCel != null"
                      src="@/assets/wsp.png"
                      alt=""
                      height="auto"
                      style="width: 45px; margin: 7px"
                    />&nbsp;&nbsp;
                  </a>
                  <a
                     :href="
                          'https://mail.google.com/mail/?view=cm&fs=1&to=' +
                          contrato.userMail +
                          '&body=Hola!%20,desde%20Malambo%20queriamos%20notificarle%20que%20se%20vence%20el%20contrato%20' +
                          contrato.paquete +
                          ',el%20dia%20' + contrato.hasta+
                          '&su=Atencion!Malambo Vencimiento de contrato' 
                        
                        "
                    target="_black"
                    >&nbsp;&nbsp;
                    <img
                      src="@/assets/mail.png"
                      alt=""
                      height="auto"
                      style="width: 45px; margin: 7px"
                    />
                  </a>
                </div>
              </b-card-body>
            </b-card>
          </transition>
        </b-col>
      </b-container>
    </div>
  </b-container>
</template> 
<script>
import Contratos from "@/services/ContratosService";
import axios from "axios";
import { mapGetters, mapState } from "vuex";

export default {
  name: "vencimientoContrato",
  props: {},
  data() {
    return {
      perPage: 2,
      currentPage: 1,
      loading: true,
      planes: [],
      contratos: [],
    };
  },
  computed: {
    ...mapState("storeUser", ["username", "nombre", "grupos"]),
    ...mapGetters("storeUser", ["getUserId"], ["getGrupos"]),
  },
  created() {},
  methods: {
    acomodarCelular(telefono) {
      if (telefono[0] == 0) {
        return telefono.substr(1);
      }
      return telefono;
    },
    acomodarFecha(fecha){
        return fecha 
    },

    async getContratos() {
      try {
        const response = await Contratos.getContratos({});
        this.contratos = response.data.data;
      } catch (err) {
        this.$bvToast.toast(err.response.data.message, {
          title: "Atencion!",
          toaster: "b-toaster-top-center",
          solid: true,
          variant: "danger",
        });
      }
    },
  },
  mounted() {
    axios
      .all([this.getContratos()])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
</style>
       