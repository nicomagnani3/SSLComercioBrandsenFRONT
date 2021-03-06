<template>
  <b-container>
    <b-row class="pb-3">
      <b-col lg="2" sm="4" class="text-center"></b-col>
      <b-col md="8" sm="6" class="text-left pt-3">
        <div>
          <p class="h1 text-center">Servicios destacados</p>
        </div>
      </b-col>
    </b-row>
     <div v-if="loading" class="text-center">
      <b-spinner
        style="width: 3rem; height: 3rem"
        variant="warning"
        label="Text Centered"
      >
      </b-spinner>
    </div>
    <div v-else>
    <slider ref="slider" :options="options">
      <slideritem
        v-for="(producto, index) in productos"
        :key="index"
        style="width: 20%; margin-right: 1%; max-width: 20%"
      >
        <b-card
          :img-src="`data:image/png;base64, ${producto.imagen}`"
          img-alt="Image"
          alt="Image"
          img-height="200px; max-height:300px"
          @click="verProducto(producto)"
          :sub-title="tituloAjustar(producto.titulo)"
          class="ItemProd"
        >
          <b-button @click="verProducto(producto)" variant="primary"

            >Ver más</b-button

          >
        </b-card>
      </slideritem>
      <!-- Customizable loading -->
      <div class="text-center" slot="loading">
        <span class="text-danger">
          <b>Cargando</b>
        </span>
        <b-spinner variant="primary" label="Text Centered"></b-spinner>
      </div>
    </slider>
    </div>
  </b-container>
</template>


<script>
import axios from "axios";
import ServiciosService from "@/services/ServiciosService";
import { slider, slideritem } from "vue-concise-slider";
export default {
  name: "NuevoSlide",
  data() {
    return {
      productos: [],
          loading: true,
      options: {
        currentPage: 0,
        thresholdDistance: 100,
        thresholdTime: 500,
        autoplay: 4000,
        loop: true,
        direction: "horizontal",
        loopedSlides: 5,
        slidesToScroll: 1,
        effect: "slide",
      },
    };
  },
  components: {
    slider,
    slideritem,
  },

  methods: {
      verProducto(producto) {
      if (producto != null) {
        const path = `/buscarProductos/${producto.titulo}`;
        if (this.$route.path !== path)
          this.$router.push({
            name: "buscarProductos",
            params: {
              producto: producto.titulo,
            },
          });
      }
    },
    async getPorductos() {
      try {
        const response = await ServiciosService.getPublicacionServicios();
          if (response.data.error == false) {
          this.productos = response.data.data;
          //this.getImporte(this.productos);
        }     
      } catch (err) {
        this.loading = true;
        this.categorias = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
      }
    },    
    tituloAjustar(titulo) {
     return this.primerMayuscula(titulo.toLowerCase());
      
    },
    primerMayuscula(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
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
  
  text-align: center;
  
}

.texto {
  
  font-family: "Poppins", sans-serif;
}

.ItemProd img{

  object-fit: contain;

}

.ItemProd{

  text-align: center;

}



</style>



