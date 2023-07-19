<template>
  <div>
    <br />
    <div v-if="loading" class="text-center">
      <br /><br />
      <br /><br />
      <b-spinner
        style="width: 7rem; height: 7rem"
        variant="warning"
        label="Text Centered"
      >
      </b-spinner>
    </div>
    <div v-else>
      <b-row>
        <b-col>
          <div fluid class="categoria">
            <b-row class="pb-2">
              <b-col class="text-center pt-3">
                <br />
                <p class="h1 font-britannic text">
                  <strong class="parrafoCategorias">Empresas/comercios</strong
                  ><br />
                  Total: {{ totalContratosEmpresa() }}
                </p>
              </b-col>
            </b-row>
          </div>
          <b-list-group>
            <b-list-group-item
              v-for="contrato in contratosEmpresa"
              v-bind:key="contrato.id"
              :per-page="perPage"
              :current-page="currentPage"
            >
              <h5>
                Nombre: <strong> {{ contrato.nombre }} </strong>
              </h5>
              <h5>
                Usuario: <strong> {{ contrato.userMail }} </strong>
              </h5>
              <h5>
                Tipo de usuario: <strong> {{ contrato.userTipo }}</strong>
              </h5>
              <p>
                Vencimiento:
                <strong>{{ contrato.hasta | formatDate }}</strong>
              </p>
             
              <b-alert
                variant="danger"
                show
                v-if="
                  canttdias(contrato.hasta) <= 5 &&
                  canttdias(contrato.hasta) >= 1
                "
                >El contrato finalizara en
                {{ canttdias(contrato.hasta) }} Dias</b-alert
              >
              <b-alert
                variant="success"
                show
                v-if="canttdias(contrato.hasta) > 5"
                >El contrato finalizara en
                {{ canttdias(contrato.hasta) }} Dias</b-alert
              >
              <b-alert
                variant="warning"
                show
                v-if="canttdias(contrato.hasta) < 0"
                >El contrato Ya finalizo</b-alert
              >
              <b-alert
                variant="warning"
                show
                v-if="canttdias(contrato.hasta) == 0"
                >El contrato Finaliza HOY</b-alert
              >
              <p>
                Paquete utilizado: <strong>{{ contrato.paquete }}</strong>
              </p>
              <p>
                Cantidad publicaciones comunes disponibles:
                <strong>{{ contrato.cantnormal }}</strong>
              </p>
              <p>
                Cantidad publicaciones destacadas disponibles:
                <strong>{{ contrato.cantDestacada }}</strong>
              </p>
              <p>Notificiarlo por:</p>
              <div>
                <a
                  v-if="contrato.userCel != null"
                  :href="
                    'https://api.whatsapp.com/send?text=Hola!%20,desde%20'+$t('footer.nombre_plataforma')+'%20queriamos%20notificarle%20que%20se%20vence%20el%20contrato ' +
                    contrato.paquete +
                    ',el%20dia%20' +
                    acomodarFecha(contrato.hasta) +
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
                    '&body=Hola!%20,desde%20'+$t('footer.nombre_plataforma')+'%20queriamos%20notificarle%20que%20se%20vence%20el%20contrato%20' +
                    contrato.paquete +
                    ',el%20dia%20' +
                    acomodarFecha(contrato.hasta) +
                    '&su=Atencion!'+$t('footer.nombre_plataforma')+' Vencimiento de contrato'
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
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col>
          <div fluid class="categoria">
            <b-row class="pb-2">
              <b-col class="text-center pt-3">
                <br />
                <p class="h1 font-britannic text">
                  <strong class="parrafoCategorias"
                    >Emprendedores-Profesional/Servicio</strong
                  ><br />
                  Total: {{ totalContratos() }}
                </p>
              </b-col>
            </b-row>
          </div>
          <b-list-group>
            <b-list-group-item
              v-for="contrato in contratos"
              v-bind:key="contrato.id"
              :per-page="perPage"
              :current-page="currentPage"
            >
              <h5>
                Nombre: <strong> {{ contrato.nombre }} </strong>
              </h5>
              <h5>
                Usuario: <strong> {{ contrato.userMail }} </strong>
              </h5>
              <h5>
                Tipo de usuario: <strong> {{ contrato.userTipo }}</strong>
              </h5>
              <p>
                Vencimiento:
                <strong>{{ contrato.hasta | formatDate }}</strong>
              </p>

              <b-alert
                variant="danger"
                show
                v-if="
                  canttdias(contrato.hasta) <= 5 &&
                  canttdias(contrato.hasta) >= 1
                "
                >El contrato finalizara en
                {{ canttdias(contrato.hasta) }} Dias</b-alert
              >
              <b-alert
                variant="success"
                show
                v-if="canttdias(contrato.hasta) > 5"
                >El contrato finalizara en
                {{ canttdias(contrato.hasta) }} Dias</b-alert
              >
              <b-alert
                variant="warning"
                show
                v-if="canttdias(contrato.hasta) < 0"
                >El contrato Ya finalizo</b-alert
              >
              <b-alert
                variant="warning"
                show
                v-if="canttdias(contrato.hasta) == 0"
                >El contrato Finaliza HOY</b-alert
              >
              <p>
                Paquete utilizado: <strong>{{ contrato.paquete }}</strong>
              </p>
              <p>
                Cantidad publicaciones comunes disponibles:
                <strong>{{ contrato.cantnormal }}</strong>
              </p>
              <p>
                Cantidad publicaciones destacadas disponibles:
                <strong>{{ contrato.cantDestacada }}</strong>
              </p>
              <p>Notificiarlo por:</p>
              <div>
                <a
                  v-if="contrato.userCel != null"
                  :href="
                    'https://api.whatsapp.com/send?text=Hola!%20,desde%20'+$t('footer.nombre_plataforma')+'%20queriamos%20notificarle%20que%20se%20vence%20el%20contrato ' +
                    contrato.paquete +
                    ',el%20dia%20' +
                    acomodarFecha(contrato.hasta) +
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
                    '&body=Hola!%20,desde%20'+$t('footer.nombre_plataforma')+'%20queriamos%20notificarle%20que%20se%20vence%20el%20contrato%20' +
                    contrato.paquete +
                    ',el%20dia%20' +
                    acomodarFecha(contrato.hasta) +
                    '&su=Atencion!'+$t('footer.nombre_plataforma')+' Vencimiento de contrato'
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
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template> 
<script>
import Contratos from "@/services/ContratosService";
import axios from "axios";
import { mapGetters, mapState } from "vuex";
import moment from "moment";
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
      contratosEmpresa: [],
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
    acomodarFecha(fecha) {
      return moment.utc(String(fecha)).format("DD-MM-YYYY");
    },
    canttdias(fecha) {
      let fechaHoy = new Date();
      let fechaContrato = new Date(fecha);
      fechaHoy.setHours(0, 0, 0, 0);
      fechaContrato.setHours(0, 0, 0, 0);
      if (fechaHoy > fechaContrato) {
        return -1;
      }
      var difference = Math.abs(fechaContrato - fechaHoy);

      return Math.trunc(difference / (1000 * 60 * 60 * 24));
    },

    async getContratosCliente() {
      try {
        const response = await Contratos.getContratosCliente({});
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
    async getContratosEmpresa() {
      try {
        const response = await Contratos.getContratosEmpresa({});
        this.contratosEmpresa = response.data.data;
      } catch (err) {
        this.$bvToast.toast(err.response.data.message, {
          title: "Atencion!",
          toaster: "b-toaster-top-center",
          solid: true,
          variant: "danger",
        });
      }
    },
    totalContratos() {
      return this.contratos.length;
    },
    totalContratosEmpresa() {
      return this.contratosEmpresa.length;
    },
  },
  mounted() {
    axios
      .all([this.getContratosCliente(), this.getContratosEmpresa()])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
       