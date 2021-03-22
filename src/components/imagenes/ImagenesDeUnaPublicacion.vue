<template>
  <div v-if="loading" class="text-center">
    <b-spinner
      style="width: 11rem; height: 11rem"
      variant="warning"
      label="Text Centered"
    >
    </b-spinner>
  </div>

  <div v-else>
    <b-row class="text-center">
      <b-col class="d-none d-sm-none d-md-block">
        <div class="d-none d-sm-none d-md-block">
          <b-icon
            @click="backPage()"
            :class="{ active: pagina() }"
            icon="arrow-left-circle-fill"
            id="iconright"
          >
          </b-icon>
        </div>
      </b-col>
      <b-col cols="10">
        <b-card-group autoplay deck>
          <b-card
            v-for="(producto, index) in imagenes"
            :key="index"
            :img-src="`data:image/png;base64, ${producto.imagen}`"
            img-alt="Img"
            img-height="150px; max-height:100px"
            img-top
            style="height: auto; max-height: 100%; display: inline-block; max-width: 350px;"
            @click="verImagen(producto.imagen)"
            
          >
          </b-card>
        </b-card-group>

        <div class="card-pagination">
          <div
            class="page-index"
            v-for="i in nbPages"
            :key="i"
            @click="goto(i)"
            :class="{ active: currentPage(i) }"
          ></div>
        </div>
      </b-col>
      <b-col class="d-none d-sm-none d-md-block">
        <div class="d-none d-sm-none d-md-block">
          <b-icon
            @click="nexPage()"
            :class="{ active: pagina() }"
            icon="arrow-right-circle-fill"
            id="iconright"
          >
          </b-icon>
        </div>
      </b-col>
    </b-row>
    <hr />
    <div class="text-center">
      <b-img   
      fluid alt="Responsive image"
        style="max-height: 600px; width: 450px;"
        class="rounded-0"
        :src="`data:image/png;base64,${this.imgSlider()}`"
      ></b-img>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PublicacionService from "@/services/PublicacionService";
import "vueperslides/dist/vueperslides.css";

export default {
  name: "imagenesDeUnaPublicacion",
  components: {},
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
      nbRowPerPage: 1,
      currentPageIndex: 0,
      imagenseleccionada: null,
      options: {
        currentPage: 0,
        thresholdDistance: 100,
        thresholdTime: 500,
        loop: true,
        direction: "horizontal",
        loopedSlides: 5,
        slidesToScroll: 1,
        effect: "slide",
      },
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
.imgProd img {
  object-fit: contain;
}
</style>>

