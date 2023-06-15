<template>
  <div v-if="loading" class="text-center">
    <br /><br />
    <img class="logo" src="@/assets/malamboIngreso.png" alt="" height="auto" />
  </div>
  <div v-else class="contenedor">
    <div class="wrapper">
      <Menu :daily="dailyData" :seven="sevenData" />
      <router-view
        class="content"
        :productos="productos"
        :productosDestacados="productosDestacados"
      />
    </div>
    <Publicidad :publicidades="this.publicidadesSlider5" />
    <Footer class="footer" />
  </div>
</template>

<script>
import Footer from "@/components/menu/Footer.vue";
import Menu from "@/components/menu/Menu.vue";
import Publicidad from "@/components/Home/EspacioPublicidad.vue";
import PublicidadService from "@/services/PublicidadService";
import PublicacionService from "@/services/PublicacionService";
import ProductosService from "@/services/ProductosService";
import LenguajeService from "@/services/LenguajeService";

import axios from "axios";
export default {
  name: "Dashboard",
  components: {
    Menu,
    Footer,
    Publicidad,
  },
  data() {
    return {
      loading: true,
      publicidades: [],
      publicidadesSlider5: [],
      productos: [],
      productosDestacados: [],
      dailyData: [],
      sevenData: [],
    };
  },
  props: {},
  methods: {    
    async getLenguaje() {
      try {
        const response = await LenguajeService.getLenguaje();
        console.log(response)
        const i18n = this.$root.$options.i18n
        i18n.setLocaleMessage('es', response.data.es); 
      } catch (err) {
        console.log(err)
      }
    },
    printAlltoast() {
      this.toast.forEach((data) => {
        this.addToast(data);
        let index = this.toast.indexOf(data);
        if (index > -1) {
          this.toast.splice(index, 1);
        }
      });
    },
    addToast(data) {
      this.$bvToast.toast(data.message, {
        title: data.title || "",
        toaster: data.toaster || "b-toaster-top-center",
        solid: true,
        variant: data.variant || "secondary",
        appendToast: data.append || false,
      });
    },
    async getPublicidades() {
      try {
        const response = await PublicidadService.getPublicidades();
        if (response.data.error == false) {
          this.publicidades = response.data.data;
          this.asignarPublicidades5(this.publicidades);
        }
      } catch (err) {
        this.getPublicidades();
        this.publicidades = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
      }
    },
    ordenarDatos(categoria) {
      return categoria.sort(function (a, b) {
        if (a.nombre > b.nombre) {
          return 1;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        return 0;
      });
    },
    asignarPublicidades5(publicidades) {
      this.publicidadesSlider5 = publicidades.filter((c) => c.ubicacion == 5);
    },
    async getPorductos() {
      this.loading = true;
      try {
        const response = await PublicacionService.getUltimasPublicaciones();
        if (response.data.error == false) {
          this.productos = response.data.data;

          //this.getImporte(this.productos);
        }
      } catch (err) {
        console.log(err);
        this.loading = true;
        this.getPorductos();
        this.productos = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
      } finally {
        this.loading = false;
      }
    },
    async getPorductosDestacados() {
      this.loading = true;
      try {
        const response = await ProductosService.getProductosDestacados();
        if (response.data.error == false) {
          this.productosDestacados = response.data.data;
          //this.getImporte(this.productos);
        }
      } catch (err) {
        this.loading = true;
        this.getPorductosDestacados();
        this.productosDestacados =
          "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
      } finally {
        this.loading = false;
      }
    },
    async clima() {
      try {
        let data = {
          coords: {},
        };
        data.coords.latitude = -35.1635;
        data.coords.longitude = -58.233007;
        this.getGeolocation(data);
      } catch (error) {
        console.log(error);
      }
    },
    async getGeolocation(data) {
      try {
        await axios(
          `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${data.coords.latitude}&lon=${data.coords.longitude}&units=metric&appid=20571ab45c74dc2a1897b60c5b8047a1`
        ).then((res) => {
          this.sevenData = res.data;
        });

        await axios(
          `https://api.openweathermap.org/data/2.5/weather?lat=${data.coords.latitude}&lon=${data.coords.longitude}&units=metric&appid=20571ab45c74dc2a1897b60c5b8047a1`
        ).then((res) => {
          this.dailyData = res.data;
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    axios
      .all([
        this.getPublicidades(),
        this.getPorductos(),
        this.getPorductosDestacados(),
        this.clima(),
        this.getLenguaje()
      ])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  created() {},
};
</script>

<style>
html,
body {
  width: auto !important;
  overflow-x: hidden !important;
}
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");
body {
  font-family: EuclidSquareRegular, sans-serif !important;
  background-color: white;
  line-height: 2.5;
}

.contenedor {
  background-color: #ececec;
}

.box-shadow {
  border-radius: 15px 15px 15px 15px;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.75);
  min-height: calc(100vh * 0.6);
}

.box-shadow-min {
  border-radius: 15px 15px 15px 15px;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.75);
}

.wrapper {
  min-height: calc(100vh - 60px);
}

.footer {
  /*display: block;*/

  margin-top: 10px;

  line-height: 50px;
  /*
      */
  color: black;
  font-weight: bold;
  background-color: #ececec;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

