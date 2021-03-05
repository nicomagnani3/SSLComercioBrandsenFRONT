<template>
  <b-container>
    <div v-if="loading" class="text-center">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <span class="text-danger">
        <b>Cargando</b>
      </span>
      <b-spinner variant="primary" label="Text Centered"></b-spinner>
    </div>
    <div v-else>
      <b-row class="pb-2">
        <b-col class="text-center pt-3">
          <br />
          <p class="h1 text-center">Contratos</p>
        </b-col>
      </b-row>
      <b-card no-body class="mb-3 p-0" header="Detalles de tu contrato">
        <b-container class="pb-3">
          <b-table
            show-empty
            small
            responsive
            :items="contrato"
            :fields="fields"
            empty-text="Usted todavia no pose ningun contrato,abajo tiene la posibilidad de realizar uno"
          >
            <template v-slot:cell(desde)="row">{{
              row.item.desde | formatDate
            }}</template>
            <template v-slot:cell(hasta)="row">{{
              row.item.hasta | formatDate
            }}</template>
          </b-table>
        </b-container>
      </b-card>
      <b-card
        no-body
        class="mb-3 p-0"
        header="Comprar o renovar paquete para realizar publicaciones"
      >
        <b-container class="pb-3">
          <b-table
            class="flip-list-move"
            ref="selectableTable"
            small
            responsive
            :items="planes"
            :fields="fieldsContrato"
            selectable
            :select-mode="selectMode"
            @row-selected="onRowSelected"
          >
            <!-- @row-selected="onRowSelected" -->
            <div slot="table-busy" class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Cargando...</strong>
            </div>
            <template v-slot:cell(precio)="row">{{
              getImporte(row.item.precio)
            }}</template>

            <template v-slot:cell(selected)="{ rowSelected }">
              <template v-if="rowSelected">
                <span aria-hidden="true">&check;</span>
              </template>
              <template v-else>
                <span aria-hidden="true">&nbsp;</span>
                <span class="sr-only">Not selected</span>
              </template>
            </template>
          </b-table>
          <b-row class="pb-2">
            <b-col class="text-center pt-3">
              <b-button variant="success" @click="pagarPaquete()"
                >Confirmar Eleccion</b-button
              >
            </b-col>
          </b-row>
          <b-row
            v-if="this.presionoBtnPagar && this.selectedpaquete != null"
            class="pb-2"
          >
            <b-col class="text-center pt-3">
              <section class="payment-form dark">
                <div class="container_payment">
                  <div class="form-payment">
                    <div class="products">
                      <h3 class="title">Pagar paquete</h3>
                      <div class="item">
                        <span class="price" id="summary-price"></span>
                        <p class="item-name">
                          Presiona el boton "pagar" para pagar el paquete
                          <strong> {{ this.selectedpaquete[0].nombre }}</strong
                          >, cuando finalizes el pago tu paquete se cargara en
                          Malambo<span id="summary-quantity"></span>
                        </p>
                      </div>
                      <br />
                      <div class="total">
                        Total :${{ this.selectedpaquete[0].precio
                        }}<span class="price" id="summary-total"></span>
                      </div>
                    </div>
                    <div class="payment-details">
                      <div class="form-group col-sm-12">
                        <br />
                        <div id="button-checkout"></div>
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </b-col>
          </b-row>
        </b-container>
      </b-card>
    </div>
  </b-container>
</template> 
<script>
import Contratos from "@/services/ContratosService";
import axios from "axios";
import { mapGetters, mapState } from "vuex";
import MercadoPago from "@/services/MercadoPago";

export default {
  name: "RenovarContrato",
  props: {},
  data() {
    return {
      presionoCrear: false,
      loading: true,
      selectedpaquete: null,
      presionoBtnPagar: false,
      planes: [],
      selectMode: "single",
      optionsPlan: [
        { value: "E", text: "Plan Estandar" },
        { value: "P", text: "Plan Premium" },
      ],
      contrato: [],
      fields: [
        { key: "desde", label: "Fecha Inicio", class: "text-center p2" },
        { key: "hasta", label: "Fecha Vencimiento", class: "text-left p2" },
        { key: "paquete", label: "Tipo", class: "text-left p2" },
        {
          key: "cantnormal",
          label: "Publicaciones comunes",
          class: "text-left p2",
        },
        {
          key: "cantDestacada",
          label: "Publicaciones destacadas",
          class: "text-left p2",
        },
      ],
      fieldsContrato: [
        { key: "nombre", label: "Nombre", class: "text-center p2" },
        { key: "precio", label: "Precio", class: "text-left p2" },
        {
          key: "cantNormal",
          label: "Publicaciones comunes",
          class: "text-left p2",
        },
        {
          key: "cantDestacada",
          label: "Publicaciones destacadas",
          class: "text-left p2",
        },
      ],
    };
  },
  computed: {
    ...mapState("storeUser", ["username", "nombre", "grupos"]),
    ...mapGetters("storeUser", ["getUserId"], ["getGrupos"]),
  },
  created() {},
  methods: {
    pagarPaquete() {
      this.presionoBtnPagar = true;
      console.log(this.selectedpaquete);
      if (this.getUserId == null) {
        this.$router.push({
          name: "login",
          params: {
            autentificacion: false,
          },
        });
      } else {
        if (!this.presionoCrear && this.selectedpaquete != null) {
          this.crearPaquete();
        }
      }
    },
    async crearPaquete() {
      console.log("fin");     
      this.presionoCrear = true;
      try {
        const response = await Contratos.addContrato({
          usuario: this.getUserId,
          desde: new Date(),
          hasta: this.sumarDias(new Date(), +30),
          paquete: this.selectedpaquete[0].id,
          cantpublicaciones:
            Number(this.selectedpaquete[0].cantNormal) ,            
          cantdestacadas:
            Number(this.selectedpaquete[0].cantDestacada)           
        });
        console.log(response.data);
         if (response.data.error == false) {
          this.validarPagoMercadoPago(response.data.data)
        } 
      } catch (error) {
        this.$bvToast.toast(`No se pudo crear el contrato`, {
          title: error.data,
          toaster: "b-toaster-top-center",
          solid: true,
          variant: "danger",
        });
        this.$router.push({
          name: "Home",
        });
      }
    },
     async validarPagoMercadoPago(idPublicacion){     
       console.log(this.selectedpaquete[0].nombre)  
       console.log(Math.trunc(this.selectedpaquete[0].precio))
       console.log(idPublicacion)
        const response = await MercadoPago.crearContrato({
          titulo:this.selectedpaquete[0].nombre,
          precioPublicacion:Math.trunc( this.selectedpaquete[0].precio),
          idPublicacion:idPublicacion,
             
        });      
        this.createCheckoutButton(response.data.id);
    },
     createCheckoutButton(preference) {
      var script = document.createElement("script");
      script.src =
        "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
      script.type = "text/javascript";
      script.dataset.preferenceId = preference;
      document.getElementById("button-checkout").innerHTML = "";
      document.querySelector("#button-checkout").appendChild(script);
    },
    sumarDias(fecha, dias) {
      fecha.setDate(fecha.getDate() + dias);
      return fecha;
    },

    onRowSelected(items) {
      this.presionoCrear = false;
      this.presionoBtnPagar = false;
      console.log(items);
      this.selectedpaquete = items;
    },
    getImporte(importe) {
      const options2 = { style: "currency", currency: "USD" };
      const numberFormat2 = new Intl.NumberFormat("en-US", options2);
      return numberFormat2.format(importe);
    },

    async getPaquetes() {
      try {
        const response = await Contratos.getPaquetes({});
        this.planes = response.data.data;
        console.log(this.planes);
        if (response.data.error == false) {
          if (this.grupos == "COMERCIO" || this.grupos == "EMPRESA") {
            this.planes = this.planes.filter((c) => c.tipo == 1);
          } else {
            this.planes = this.planes.filter((c) => c.tipo == 2);
          }
        }
        console.log(this.grupos);
      } catch (err) {
        this.$bvToast.toast(err.response.data.message, {
          title: "Atencion!",
          toaster: "b-toaster-top-center",
          solid: true,
          variant: "danger",
        });
      }
    },

    async getContratosUser() {
      try {
        const response = await Contratos.getContratosUser({
          user: this.getUserId,
        });
        this.contrato = response.data.data;
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
      .all([
        this.getPaquetes(),
        this.getContratosUser(),
        //this.getServicios(),
      ])
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
       