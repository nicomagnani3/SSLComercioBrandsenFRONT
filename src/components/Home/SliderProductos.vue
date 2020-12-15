<template>
  <div>
    <h3 class="m-5 titulo">Productos en oferta</h3>
<vueper-slides  bullets-outside 
 class="no-shadow"
  :visible-slides="5"
  slide-multiple
  :gap="1"
  :slide-ratio="1 / 4"
  :dragging-distance="100"
  :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }">
  <vueper-slide 
   v-for="producto in productos"
  
    :key="producto.id"
      :title="producto.titulo" 
      :content="producto.precio"
      :image="`data:image/png;base64, ${producto.imagen}`"
      />
   
</vueper-slides>
  </div>
</template>



<script>
import axios from "axios";
import ProductosService from "@/services/ProductosService";
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
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
    onSlideStart(slide) {
      console.log(slide);
      this.sliding = true;
    },
    onSlideEnd(slide) {
      console.log(slide);
      this.sliding = false;
    },
    async getPorductos() {
      try {
        const response = await ProductosService.getProductos();
        this.productos = response.data.data;
        console.log(this.productos);
      } catch (err) {
        this.categorias = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
      }
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
.carrousel {
  height: 350px;
}

.itemCarrusel {
  width: 200px;
  height: 300px;
}

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



