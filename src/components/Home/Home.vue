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


<style scoped>
.body {
  background-color: #ebebeb;
}

.contenedor {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-content: center;
}

.Buscador {
  width: 97%;
  height: 60px;
  background-color: #FFCE4E;
  border-radius: 5px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.buscar {
  width: 39%;
  height: 64%;

  border: 1px solid rgb(211, 210, 210);
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  margin: 5px;
}

.btn-buscar {
  color: white;
}
</style>