<template>
  <b-container>


       <h3 class="m-5 titulo">Productos en oferta</h3>
        <vueper-slides
          class="no-shadow"
          :visible-slides="5"
          slide-multiple
          :gap="1"
<<<<<<< HEAD
          :slide-ratio="1 / 4"     
=======

          :slide-ratio="1 / 4"          
>>>>>>> 2ba06be9ed4ed5f88d354be211a85f593d8c65f8
          :dragging-distance="60"
          :breakpoints="{ 800: {visibleSlides: 2, slideMultiple: 2} }"
        >
         <vueper-slide
            v-for="producto in productos"
            :key="producto.id"
            :image="`data:image/png;base64, ${producto.imagen}`"
            class="item"
          />  

          
       
        </vueper-slides>


  </b-container>

</template>



<script>
import axios from "axios";
import ProductosService from "@/services/ProductosService";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  name: "slider",
  components: { VueperSlides, VueperSlide },

  data() {
    return {
      productos: [],
     
    };
  },
  methods: {
    async getPorductos() {
      try {
        const response = await ProductosService.getProductos();
        this.productos = response.data.data;
        console.log(this.productos);
          this.productos = this.productos.filter(
        (c) => c.destacado == true
      );
        this.getImporte(this.productos);
        
      } catch (err) {
        this.categorias = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
      }
    },
    getImporte(productos) {
      productos.forEach((producto) => {
        const options2 = { style: "currency", currency: "USD" };
        const numberFormat2 = new Intl.NumberFormat("en-US", options2);
        producto.precio = numberFormat2.format(producto.precio);
      });
    },
    tituloAjustar(titulo) {
      titulo = this.primerMayuscula(titulo.toLowerCase());
      return titulo.fontsize(6).fontcolor("#FFCE4E ");
    },
    primerMayuscula(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    accederLink(){
      console.log("entro")
    }
  },
  mounted() {
    axios
      .all([this.getPorductos()])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>


<style scoped>
.titulo {
  color: rgb(109, 108, 108);
}

.texto {
  color: rgb(226, 205, 199);
  font-family: "Poppins", sans-serif;
}
.vueperslide__title {
  font-size: 7em;
  opacity: 0.7;
}

.item{

  box-shadow: 3px 3px 5px 3px rgba(0, 0, 0, 0.2);;
}
</style>
