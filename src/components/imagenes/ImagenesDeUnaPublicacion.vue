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


      <slider ref="slider" :options="options">
        <slideritem
          v-for="imagen in imagenes"
          :key="imagen.numero"
          
        >
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
  components: {slider, slideritem, },
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

<style scoped>


 
  .imgProd img{

      object-fit: contain;
      

  }

  .imgProd{

    width: 50%;
  }
 

</style>>

