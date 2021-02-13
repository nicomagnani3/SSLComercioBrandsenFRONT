<template>
  <b-container>
    <h3 class="m-5 titulo">Servicios destacados</h3>
        <vueper-slides
          class="no-shadow"
          :visible-slides="5"
          slide-multiple
          :gap="1"
          :slide-ratio="1 / 4"          
          :dragging-distance="60"
          :breakpoints="{ 800: {visibleSlides: 2, slideMultiple: 2} }"
        >
          <vueper-slide
            v-for="producto in productos"
            :key="producto.id"
            :title="tituloAjustar(producto.titulo)"
            :content="producto.precio.fontsize(4).fontcolor('#FFCE4E')"
            :image="`data:image/png;base64, ${producto.imagen}`"
            class="item"
          />  
       
        </vueper-slides>
   
  </b-container>
</template>



<script>
import axios from "axios";
import ServiciosService from "@/services/ServiciosService";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  name: "slider",
  components: { VueperSlides, VueperSlide },

  data() {
    return {
      productos: [],
      sliding: null,
    };
  },
  methods: {
    async getPorductos() {
      try {
        const response = await ServiciosService.getPublicacionServicios();
        this.productos = response.data.data;
        this.productos = this.productos.filter(
        (c) => c.destacado == true
      );
        this.getImporte(this.productos);
        console.log(this.productos);
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

</style>



