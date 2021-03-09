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
      <b-row class="pb-2">
        <b-col class="text-center pt-3">
          <br />
          <p class="h1 text-center">Contratos</p>
        </b-col>
      </b-row>
      <b-card no-body class="mb-3 p-0" header="Elegir el  usuario o empresa">
        <b-container class="pb-3">
          <b-input-group size="lg">
            <b-form-select
              size="lg"
              id="plan"
              data-checkout="Plan"
              v-model="value"
              :options="foptions"
              required
              @change="userSeleccionado()"
            ></b-form-select>
          </b-input-group>
        </b-container>
        <b-col class="text-center pt-3">
          <strong> Email: {{ value["email"] }}</strong>
        </b-col>
      </b-card>
      <b-card
        no-body
        class="mb-3 p-0"
        header="Elegir el paquete a la empresa o comercio"
      >
        <b-container class="pb-3">
          <b-table
            class="flip-list-move"
            ref="selectableTable"
            small
            responsive
            :items="planesUser"
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
                >Confirmar Eleccion
                 <b-icon
              icon="arrow-counterclockwise"
              v-if="this.presionoCrear"
              animation="spin-reverse-pulse"
              font-scale="1"
            ></b-icon></b-button
              >
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
import AuthenticationService from "@/services/AuthenticationService";

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
      usuarios: [],
      value: { email: null },
      selectMode: "single",
      planesUser: [],
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
    foptions() {
      let mc = this.usuarios.map((e) => ({
        value: e,
        text: e.nombre,
      }));
      mc.push({
        value: { email: null },
        text: "-Seleccione el usuario o empresa-",
        disabled: true,
      });

      return mc;
    },
  },
  created() {},
  methods: {
    userSeleccionado() {    
      this.planesUser = this.planes.filter(
        (c) => c.tipo == this.value.tipoPaquete
      );
    },
    pagarPaquete() {
      if (!this.presionoCrear && this.selectedpaquete != null) {
        this.crearPaquete();
      }
    },
    async crearPaquete() {
      this.presionoCrear = true;
      try {
        const response = await Contratos.addContrato({
          usuario: this.value.usuario,
          desde: new Date(),
          hasta: this.sumarDias(new Date(), +30),
          paquete: this.selectedpaquete[0].id,
          cantpublicaciones: Number(this.selectedpaquete[0].cantNormal),
          cantdestacadas: Number(this.selectedpaquete[0].cantDestacada),
          pago: 1,
        });
        if (response.data.error == false) {
          this.$bvToast.toast(
            `Se creo el contrato! al usuario` + this.value.nombre,
            {
              title: "Atencion!",
              toaster: "b-toaster-top-center",
              solid: true,
              variant: "success",
            }
          );
                this.presionoCrear = false;
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
    sumarDias(fecha, dias) {
      fecha.setDate(fecha.getDate() + dias);
      return fecha;
    },

    onRowSelected(items) {
      this.presionoCrear = false;
      this.presionoBtnPagar = false;
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

        if (response.data.error == false) {
          this.planes = response.data.data;
        }
      } catch (err) {
        this.$bvToast.toast(err.response.data.message, {
          title: "Atencion!",
          toaster: "b-toaster-top-center",
          solid: true,
          variant: "danger",
        });
      }
    },

    async getNombreUsuariosParaContrato() {
      try {
        const response = await AuthenticationService.getNombreUsuariosParaContrato(
          {}
        );
        this.usuarios = response.data.data;
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
        this.getNombreUsuariosParaContrato(),
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
       