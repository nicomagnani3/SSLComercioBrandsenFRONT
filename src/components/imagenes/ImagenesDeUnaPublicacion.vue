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
    <slider ref="slider" :options="options">
      <slideritem v-for="imagen in imagenes" :key="imagen.numero">
        <b-card
          :img-src="`data:image/png;base64, ${imagen.imagen}`"
          img-alt="Image"
          alt="Image"
          img-height="400px;"
          class="imgProd"
        >
        </b-card>
      </slideritem>
    </slider>
  </div>
</template>

<script>
import axios from "axios";
import PublicacionService from "@/services/PublicacionService";
import "vueperslides/dist/vueperslides.css";
import { slider, slideritem } from "vue-concise-slider";

export default {
  name: "imagenesDeUnaPublicacion",
  components: { slider, slideritem },
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
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      },
    },
  },
  methods: {
    aceptarDetalle() {
      this.$emit("okImagenesPublicacion");
    },
    async getImagenesPublicacion() {
      try {
        const response = await PublicacionService.getImagenesPublicacion({
          idPublicacion: this.idPublicacion,
          tipo:this.tipo
        });
        this.imagenes = response.data.data;
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

.imgProd {
  width: 50%;
}
</style>>

