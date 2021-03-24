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
import PublicacionService from "@/services/PublicacionService";

//import axios from "axios";
export default {
  name: "crearPublicacion",
  components: {},
  props: {
    publicacion: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  created() {
   
      this.setearPagoPublicacion();
   
  },
  computed: {},
  watch: {
    producto() {},
  },
  methods: {
    volver() {
      this.$router.push("/");
    },
   
    async setearPagoPublicacion() {
      await PublicacionService.setPagoPublicacion({
        publicacion: this.publicacion,
      });
    },
   
  },
  mounted() {},
};
</script>
<style >
</style>
