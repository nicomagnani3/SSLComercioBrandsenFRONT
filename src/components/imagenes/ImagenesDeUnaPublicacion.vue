<template>
  <div v-if="loading" class="text-center">
    <br />
    <br />
    <span class="text-danger">
      <b>Cargando</b>
    </span>
    <b-spinner variant="primary" label="Text Centered"></b-spinner>
  </div>
  <div v-else>
    <vueper-slides
     autoplay
      
    >
      <vueper-slide
        v-for="imagen in imagenes"
        :key="imagen.numero"
        :image="`data:image/png;base64, ${imagen.imagen}`"
        style="    width: 346px;
    height: 369px;"
      />
    </vueper-slides>
  </div>
</template>

<script>
import axios from "axios";
import PublicacionService from "@/services/PublicacionService";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  name: "imagenesDeUnaPublicacion",
  components: { VueperSlides, VueperSlide },
  props: {
    idPublicacion: {
      type: Number,
    },
  },
  data() {
    return {
      loading: true,
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

<style>

</style>