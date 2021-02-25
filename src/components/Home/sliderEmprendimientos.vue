<template>
  <b-container>
    <b-row class="pb-3">
      <b-col lg="2" sm="4" class="text-center"></b-col>
      <b-col md="8" sm="6" class="text-left pt-3">
        <div>
          <p class="h1 text-center">Emprendimientos destacados</p>
        </div>
      </b-col>
    </b-row>
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
          img-height="300px; max-height:300px"
          @click="verProducto(producto)"
          :sub-title="tituloAjustar(producto.titulo)"
        >
          <b-button  @click="verProducto(producto)" variant="primary">Ver más</b-button>
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
  </b-container>
</template>


<script>
import axios from "axios";
import EmprendimientoService from "@/services/EmprendimientoService";
import { slider, slideritem } from "vue-concise-slider";
export default {
  name: "SlideEmprendimietnos",
  data() {
    return {
      productos: [],
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
    async getPorductos() {
      try {
        const response = await EmprendimientoService.getPublicacionEmprendimientos();
      
        this.productos = response.data.data;
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
      return titulo
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



