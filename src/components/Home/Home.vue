<template>
  <div class="body">
    <Slider />
  
  
      <SliderProductos />
      <sliderServicios/>
      <sliderEmprendimientos/>
      <Sliderempresa />
     <Publicidad />
     </div>

</template>


<script>
import Slider from "@/components/Home/Slider.vue";
import SliderProductos from "@/components/Home/SliderProductos.vue";
import Sliderempresa from "@/components/Home/slideEmpresas.vue";
import Publicidad from "@/components/Home/EspacioPublicidad.vue";
import sliderServicios from "@/components/Home/sliderServicios.vue";
import sliderEmprendimientos from "@/components/Home/sliderEmprendimientos.vue";


export default {
  name: "Home",

  components: {
    Slider,
    SliderProductos,
    sliderServicios,
    Sliderempresa,
    Publicidad,
    sliderEmprendimientos
    
  },
  
  data() {
    return {        
      
    };
  },

  methods: {
      
  }
};
</script>


<style>
.body {
  background-color: #ebebeb;
}
</style>