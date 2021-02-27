<template>
  <div class="body">

      

      <Slider />
      <sliderPubli/>
      <b-container fluid class="subtitulo"> 
          <P>Malambo Aporta el 10% de los ingresos a Apad brandsen</P>
      </b-container>
      <NuevoSlide/>
      <sliderServicios/>
      <sliderEmprendimientos/>
      <Sliderempresa />
      <Publicidad />
      
     
     
     </div>

</template>


<script>
import Slider from "@/components/Home/Slider.vue";
 import NuevoSlide from "@/components/Home/NuevoSlide.vue";
import Sliderempresa from "@/components/Home/slideEmpresas.vue";
import Publicidad from "@/components/Home/EspacioPublicidad.vue";
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
    Publicidad,
    sliderEmprendimientos,
    sliderPubli,
    
  
    
    
    
    
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
  height: auto;
}

.subtitulo{

  text-align: center;
  margin: 10px;
  background-color: rgb(66, 129, 248);
  padding: 20px;
  font-size: 20px;
  color: white;

}


</style>