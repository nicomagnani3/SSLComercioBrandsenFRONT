<template>
  <div v-if="loading" class="text-center">
    <b-spinner style="width: 7rem; height: 7rem" variant="warning" label="Text Centered">
    </b-spinner>
  </div>

  <div v-else>
    <!--     <b-card>
      <b-row>
        <b-col cols="3" v-for="imagen in imagenes" :key="imagen.id">
          <img :src="`data:image/png;base64, ${imagen.imagen}`" class="img-fluid"
            :style="{ maxWidth: '400px', maxHeight: '400px' }">
        </b-col>
      </b-row>
    </b-card> -->

    <VueSlickCarousel v-bind="settings">
      <div v-for="(producto, index) in imagenes" :key="index" class="carousel-slide">
        <img :src="`data:image/png;base64, ${producto.imagen}`" class="carousel-image" alt="Responsive image" />
      </div>
    </VueSlickCarousel>

    <!--  <section class="py-5">
      <div class="container px-4 px-lg-5 my-5">
        <div class="row gx-4 gx-lg-5 align-items-center">
          <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0"
              src="https://dummyimage.com/600x700/dee2e6/6c757d.jpg" alt="..." /></div>
        </div>
      </div>
    </section> -->
    <!--     <b-row class="text-center">
      <b-col cols="12">
        <b-card-group autoplay deck>
          <b-card v-for="(producto, index) in imagenes" :key="index" no-body
            :img-src="`data:image/png;base64, ${producto.imagen}`" img-top class="cardGuia"
            style="cursor: pointer; max-width: 283px" alt="Responsive image" @click="verImagen(producto.imagen)">
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
    <hr />
    <div class="text-center d-none d-sm-none d-md-block">
      <b-img fluid alt="Responsive image" style="max-height: 450px; width: 450px" class="rounded-0"
        :src="`data:image/png;base64,${this.imgSlider()}`"></b-img>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
import PublicacionService from "@/services/PublicacionService";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  name: "imagenesDeUnaPublicacion",
  components: { VueSlickCarousel },
  props: {
    idPublicacion: {
      type: Number,
    },
    tipo: {
      type: String,
    },
  },
  data() {
    return {
      loading: true,
      nbPages: 0,
      ubicaicon: 0,
      currentPageIndex: 0,
      imagenseleccionada: null,
      settings: {

        lazyLoad: "ondemand",
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        paginationClass: "carousel-pagination"
      }
    };
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      },
    },
  },
  methods: {
    imgSlider() {
      return this.imagenseleccionada;
    },
    verImagen(imagen) {
      this.imagenseleccionada = imagen;
    },
    nexPage() {
      this.currentPageIndex = this.ubicaicon + 1;
      this.indice = this.ubicaicon + 1;
      if (++this.indice <= this.nbPages) {
        this.ubicaicon++;
      } else {
        this.currentPageIndex = 0;
        this.ubicaicon = 0;
      }
    },
    backPage() {
      if (this.ubicaicon == 0) {
        this.currentPageIndex = this.nbPages - 1;
        this.ubicaicon = this.nbPages - 1;
      } else {
        this.currentPageIndex = this.ubicaicon - 1;
        this.ubicaicon = this.ubicaicon - 1;
      }
    },
    pagina() {
      return this.ubicaicon - 1 === this.currentPageIndex;
    },
    goto(i) {
      this.currentPageIndex = i - 1;
    },
    currentPage(i) {
      this.ubicaicon = this.currentPageIndex;
      return i - 1 === this.currentPageIndex;
    },
    aceptarDetalle() {
      this.$emit("okImagenesPublicacion");
    },
    async getImagenesPublicacion() {
      try {
        const response = await PublicacionService.getImagenesPublicacion({
          idPublicacion: this.idPublicacion,
          tipo: this.tipo,
        });
        if (response.data.error == false) {
          this.imagenes = response.data.data;
          this.imagenseleccionada = this.imagenes[0].imagen;
        }
      } catch (err) {
        this.imagenes = "ATENCION NO SE PUDIERON OBTENER LAS IMAGENES";
      }
    },
  },
  mounted() {
    axios
      .all([this.getImagenesPublicacion()])
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
.ItemProd img {
  object-fit: contain;
}

.cardGuia img {
  max-height: 209px;
  max-width: 280px;
}

.carousel-slide {
  /* Estilos para centrar la imagen */
  display: flex;
  justify-content: center;
  align-items: center;

  /* Estilos para ajustar la altura */
  max-height: 300px;
  /* Ajusta la altura máxima según tus necesidades */
}

.carousel-image {
  max-height: 300px;
  /* Ajusta la altura máxima deseada para las imágenes */
  object-fit: contain;
  /* Ajusta el comportamiento de ajuste de la imagen dentro del contenedor */
  margin: 0 auto;
  /* Centra horizontalmente la imagen dentro del carrusel */
}

ation {
  display: none;
  /* Ocultar los dots */
}

.carousel-slide {
  position: relative;
}

.carousel-slide::before,
.carousel-slide::after {
  font-family: "Font Awesome 5 Free";
  /* Nombre de la fuente de iconos */
  font-weight: 900;
  /* Peso de la fuente de iconos (debes usar la versión sólida de Font Awesome) */
  font-size: 24px;
  /* Tamaño del icono */
  color: black;
  /* Color de las flechas (negro en este caso) */
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.carousel-slide::before {
  content: "\f060";
  /* Código del icono de flecha izquierda en Font Awesome */
  left: 10px;
  /* Posición izquierda */
}

.carousel-slide::after {
  content: "\f061";
  /* Código del icono de flecha derecha en Font Awesome */
  right: 10px;
  /* Posición derecha */
}</style>

