<template>
  <div class="body">
    <Slider />
    <sliderPubli />
    <div fluid class="subtitulo">
      <strong>Registrate y publica tu primer producto gratis!</strong>
      <P>Al publicar está colaborando con Apaa de Brandsen</P>
    </div>

    <NuevoSlide />
    <sliderServicios />
    <sliderEmprendimientos />
    <Sliderempresa />
  </div>
</template>


<script>
import Slider from "@/components/Home/Slider.vue";
import NuevoSlide from "@/components/Home/NuevoSlide.vue";
import Sliderempresa from "@/components/Home/slideEmpresas.vue";
import sliderServicios from "@/components/Home/sliderServicios.vue";
import sliderEmprendimientos from "@/components/Home/sliderEmprendimientos.vue";
import sliderPubli from "@/components/Home/sliderPubli.vue";

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
    return {};
  },

  methods: {},
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