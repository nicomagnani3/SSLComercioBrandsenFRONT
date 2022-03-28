<template>
  <div v-if="loading" class="text-center">
    <br /><br />
    <b-spinner
      style="width: 5rem; height: 5rem"
      variant="warning"
      label="Text Centered"
    >
    </b-spinner>
  </div>
  <div v-else class="body">    
     <a 
      href="https://api.whatsapp.com/send?text=Hola!%20,me%20quiero%20sumar%20al%20grupo%20de%20Whatsapp%20😃%20¿me%20suman?&phone=+542223431948"  
             class="btn-wsp" target="_blank"
       ><img style="max-width: 100%" src="@/assets/wspsigue.png" alt="logo carrito"
      /> <span  style="display:none" class="position-absolute bottom-0 start-50 translate-middle-x">
        Sumate a nuestro grupo      
    </span></a>
            
          
    <br />
    <Slider :publicidades="this.publicidadesSlider1" />
    <br>
    <NuevoSlide :productos="this.productosDestacados" :nuevaPublicacion="this.nuevaPublicacionDestacada" />
    <CategoriasHomeImagenes />
    <sliderUltimasPublicaciones :productos="this.productos" :nuevaPublicacion="this.nuevaPublicacion"/>
    <div>
      <Novedades :novedades="novedades"> </Novedades>
    </div> 
       <sliderPubli :publicidades="this.publicidadesSlider2" />
   <!-- <sliderServicios />
    <sliderEmprendimientos /> -->
<!-- 
    <Sliderempresa :publicidades="this.publicidadesSlider3" /> -->
  </div>
</template>


<script>
import CategoriasHomeImagenes from "@/components/categorias/CategoriasHomeImagenes.vue";
import Slider from "@/components/Home/Slider.vue";
import NuevoSlide from "@/components/Home/NuevoSlide.vue";
/*import Sliderempresa from "@/components/Home/slideEmpresas.vue";
 import sliderServicios from "@/components/Home/sliderServicios.vue";
import sliderEmprendimientos from "@/components/Home/sliderEmprendimientos.vue"; */
import sliderUltimasPublicaciones from "@/components/Home/sliderUltimasPublicaciones.vue";
import sliderPubli from "@/components/Home/sliderPubli.vue";
import axios from "axios";
import PublicidadService from "@/services/PublicidadService";
import Novedades from "../novedades/novedades.vue";

export default {
  name: "Home",

  components: {
    CategoriasHomeImagenes,
    Slider,
    NuevoSlide,
    //sliderServicios,
    //Sliderempresa,
    //sliderEmprendimientos,
    sliderPubli,
    sliderUltimasPublicaciones,
    Novedades,
  },
props: {
    productos:{ 
      type: Array,
    }, 
    productosDestacados :{ 
      type: Array,
    }, 
},
  data() {
    return {
      loading: true,
      novedades: [],
      publicidades: [],
      publicidadesSlider1: [],
      publicidadesSlider2: [],
      publicidadesSlider3: [],
      nuevaPublicacion:false,
      nuevaPublicacionDestacada:false
    };
  },
  created (){
    
    if (this.$route.params.nuevaPublicacion == true){
      this.nuevaPublicacion=true   
    }
    if (this.$route.params.nuevaPublicacionDestacada == true){
      this.nuevaPublicacionDestacada=true   
    }
  },
  methods: {   
    verWSP(){
    },
    async getPublicidades() {
      try {
        const response = await PublicidadService.getPublicidades();
        if (response.data.error == false) {
          this.publicidades = response.data.data;
          this.asignarPublicidades(this.publicidades)
          //this.asignarPublicidades1(this.publicidades);
          //this.asignarPublicidades2(this.publicidades);
          //this.asignarPublicidades3(this.publicidades);
        }
      } catch (err) {
        this.getPublicidades();
        this.publicidades = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
      }
    },
    asignarPublicidades(publicidades){
      publicidades.forEach(publicidad => {
         
          if (publicidad.ubicacion == 1){
            this.publicidadesSlider1.push(publicidad)
          }
           if (publicidad.ubicacion == 2 ){
            this.publicidadesSlider2.push(publicidad)
          }
        
      });
    },
    asignarPublicidades1(publicidades) {
      this.publicidadesSlider1 = publicidades.filter((c) => c.ubicacion == 1);
    },
    asignarPublicidades2(publicidades) {

      this.publicidadesSlider2 = publicidades.filter((c) =>console.log(c.ubicacion) (c.ubicacion == 2) );
    },
  /*   asignarPublicidades3(publicidades) {
      this.publicidadesSlider3 = publicidades.filter((c) => c.ubicacion == 3);
    }, */
    async getNovedad() {
      this.loading = true;
      try {
        const response = await PublicidadService.getNovedad();
        this.novedades = response.data.data;
      } catch (err) {
        this.novedades = "ATENCION NO SE PUDIERON OBTENER LAS EMPRESAS";
        this.loading = true;
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    axios
      .all([this.getPublicidades(), this.getNovedad()])
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
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;500;700&display=swap");
@media only screen and (max-width: 480px) {
  .parraforTitProd {
  font-size: 20px !important;
    font-weight: 300;
    margin: 0 0 0 8px;
    color: #666;
  }

  .verMasServi {
    white-space: inherit;
  }
  .parrafor {
    text-align: center;
    /* margin: 10px; */
    font-size: 15px;
    white-space: pre-wrap;
  }
  .parraforNotificacion {
    text-align: center;
    /* margin: 10px; */
    font-size: 8px;
    white-space: unset !important;
  }
  .parrafoCategorias {
    font-size: 16px;
    text-align: center;
  }

  .card-deck {
    margin-left: auto;
    margin-right: auto;
  }
  #valorDestacado {
    font-size: 10px;
  }
  .subtitulo {
    font-size: 13px !important;
    color: white;
    text-align: center;
    /* margin: 10px; */
    background-color: rgb(70 70 70);
  }
  .parraforAPA {
    font-size: 15px;
    white-space: pre;
  }
}

.body {
  background-color: #ebebeb;
  height: auto;
  font-family: "Roboto" !important;
}
p,
input,
strong,
li,
label,
a,
b,
button {
  font-family: "Roboto" !important;
}
.subtitulo {
  text-align: center;
  font-size: 18px;
  background-color: rgb(70 70 70);
  font-family: "Roboto";
  color: white;
}

.btn-wsp{   
    position: fixed;
    width: 65px;
    left: 15px;
    height: 65px;    
    bottom: 28px;
    right: 28px;
    color: #FFF;
    border-radius: 56px;

    cursor: pointer;
    z-index: 99999999;
    transition: all 300ms ease;
}
.btn-wsp:hover{
    background: #20ba5a;
}
 .parraforTitProd {
  font-size: 26px;
    font-weight: 300;
    margin: 0 0 0 8px;
    color: #666;
  }
@media only screen and (min-width:320px) and (max-width:768px){
    .btn-wsp{
        width:63px;
        height:63px;
        line-height: 66px;
	}
}
.btn-wsp:hover > span{
   overflow:hidden;
    position: top;
    display: block !important;
    top: 0;
    left: 63px;
    display: block;
    color: white;
    padding: 60px;
    padding: 0px 16px;
    line-height: 2.0;
    font-size: 17px;
    background-color: rgb(37, 211, 102);
    color: rgb(255, 255, 255);
    border-radius: 10px;
    margin: 0px 10px;
    white-space: nowrap;
}


</style>