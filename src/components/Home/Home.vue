<template>
  <div class="body">
    <Slider />
  
  
      <SliderProductos />
      <Sliderempresa />
     <Publicidad />
     </div>

</template>


<script>
import Slider from "@/components/Home/Slider.vue";
import SliderProductos from "@/components/Home/SliderProductos.vue";
import Sliderempresa from "@/components/Home/slideEmpresas.vue";
import Publicidad from "@/components/Home/EspacioPublicidad.vue";


export default {
  name: "Home",

  components: {
    Slider,
    SliderProductos,
    Sliderempresa,
    Publicidad,
    
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