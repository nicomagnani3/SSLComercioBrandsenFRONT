<template>
  <div class="text-center">
    <br />
    <br />
    <br />
    <br />
    <b-navbar-brand :to="'/'">
      <img class="logo" src="@/assets/succes.png" alt="" height="auto" />
    </b-navbar-brand>
    <br />
    <br />
    <h3><strong> Su publicacion se creo con exito </strong></h3>
    <h3>
      <strong
        >y esta disponible para que todos los usuarios la puedan
        visualizar</strong
      >
    </h3>
    <br />
    <br />
    <b-row>
      <b-col class="text-center">
        <b-button
          @click="volver()"
          type="success"
          style="width: 274px"
          variant="success"
          >Inicio
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import EmprendimientoService from "@/services/EmprendimientoService";
import PublicacionService from "@/services/PublicacionService";
import ServiciosService from "@/services/ServiciosService";

//import axios from "axios";
export default {
  name: "crearPublicacion",
  components: {},
  props: {
    publicacion: {
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  created() {
    console.log(this.tipo);
    if (this.tipo == "PUBLICACION") {
      this.setearPagoPublicacion();
    }
    if (this.tipo == "EMPRENDIMIENTO") {
      this.setearPago();
    }
    if (this.tipo == "SERVICIO") {
      this.setearPagoservicio();
    }
    

    /*    
 console.log(this.$route.params)  */
  },
  computed: {},
  watch: {
    producto() {},
  },
  methods: {
    volver() {
      this.$router.push("/");
    },
    async setearPago() {
      console.log(this.publicacion);
      console.log("salio created");
      const response = await EmprendimientoService.setPagoPublicacion({
        publicacion: this.publicacion,
      });
      console.log(response);
    },
    async setearPagoPublicacion() {
      const response = await PublicacionService.setPagoPublicacion({
        publicacion: this.publicacion,
      });
      console.log(response);
    },
    async setearPagoservicio() {
      const response = await ServiciosService.setPagoPublicacion({
        publicacion: this.publicacion,
      });
      console.log(response);
    },
  },
  mounted() {},
};
</script>
<style >
</style>
