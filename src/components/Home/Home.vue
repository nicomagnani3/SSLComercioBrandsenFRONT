<template>
  <div v-if="loading" class="text-center">
    <br /><br />
    <b-spinner
      style="width: 11rem; height: 11rem"
      variant="warning"
      label="Text Centered"
    >
    </b-spinner>
  </div>
  <div v-else class="body">
    <Slider :publicidades="this.publicidadesSlider1" />
    <sliderPubli :publicidades="this.publicidadesSlider2" />
    <div fluid class="subtitulo">
      <strong>Registrate y publica tu primer producto gratis!</strong>
      <P>Al publicar está colaborando con Apaa de Brandsen</P>
    </div>

    <NuevoSlide />
    <sliderServicios />
    <sliderEmprendimientos />
    <Sliderempresa :publicidades="this.publicidadesSlider3" />
  </div>
</template>


<script>
import Slider from "@/components/Home/Slider.vue";
import NuevoSlide from "@/components/Home/NuevoSlide.vue";
import Sliderempresa from "@/components/Home/slideEmpresas.vue";
import sliderServicios from "@/components/Home/sliderServicios.vue";
import sliderEmprendimientos from "@/components/Home/sliderEmprendimientos.vue";
import sliderPubli from "@/components/Home/sliderPubli.vue";
import axios from "axios";
import PublicidadService from "@/services/PublicidadService";
export default {
  name: "Home",

  components: {
    Slider,
    NuevoSlide,
    sliderServicios,
    Sliderempresa,
    sliderEmprendimientos,
    sliderPubli,
  },

  data() {
    return {
      loading: true,
      publicidades: [],
      publicidadesSlider1: [],
      publicidadesSlider2: [],
      publicidadesSlider3: [],
    };
  },

  methods: {
    async getPublicidades() {
      try {
        const response = await PublicidadService.getPublicidades();
        if (response.data.error == false) {
          this.publicidades = response.data.data;
          this.asignarPublicidades1(this.publicidades);
          this.asignarPublicidades2(this.publicidades);
          this.asignarPublicidades3(this.publicidades)
        }
      } catch (err) {
        this.getPublicidades();
        this.publicidades = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
      }
    },
    asignarPublicidades1(publicidades) {
      this.publicidadesSlider1 = publicidades.filter((c) => c.ubicacion == 1);
    },
      asignarPublicidades2(publicidades) {
      this.publicidadesSlider2 = publicidades.filter((c) => c.ubicacion == 2);
    },
     asignarPublicidades3(publicidades) {
      this.publicidadesSlider3 = publicidades.filter((c) => c.ubicacion == 3);
    },
  },
  mounted() {
    axios
      .all([this.getPublicidades()])
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
.body {
  background-color: #ebebeb;
  height: auto;
}

.subtitulo {
  text-align: center;
  /* margin: 10px; */
  background-color: rgb(66, 129, 248);
  font-size: 22px;
  color: white;
}
</style>