<template>
 <transition name="modal">
  <div v-if="loading" class="text-center">
    <br />
    <br />
    <span class="text-danger">
      <b>Cargando</b>
    </span>
    <b-spinner variant="primary" label="Text Centered"></b-spinner>
  </div>
  <div v-else  >
    <vueper-slides
      slide-image-inside
    >
      <vueper-slide
        v-for="imagen in imagenes"
        :key="imagen.numero"
        :image="`data:image/png;base64, ${imagen.imagen}`"
      />
    </vueper-slides>

    <!-- <b-row>
      <b-col class="text-right">
        <b-button
          type="button"
          @click="aceptarDetalle()"
          v-hotkey="{ enter: aceptarDetalle }"
          variant="primary"
          >Aceptar</b-button
        >
      </b-col>
    </b-row>  -->
  </div>
  </transition>
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