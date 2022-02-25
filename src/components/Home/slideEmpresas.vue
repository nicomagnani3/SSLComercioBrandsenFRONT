<template>
  <div>
    <!-- <h3 class="m-5 titulo text-center">
      <strong class="parraforAPA">Al publicar estas colaborando con Apaa</strong>
    </h3> -->  
    <b-container class="contenedorPubli mb-5">
      <div class="card-deck-wrapper">
        <div class="card-deck">
          <b-row
            v-for="publicidad in publicidades"
            v-bind:key="publicidad.id"
            class="text-center"
          >
            <b-col class="itemCarrusel">
              <b-card
                style="
                cursor: pointer;
                border-width: 1px;
                border-style: solid;
                border-color: black;
              "
                overlay
                :img-src="publicidad.imagen"
                img-alt="Responsive image"
                img-top
                class="img-fluid"
                alt="Responsive image"
                @click="irUrl(publicidad.url)"
              >
              </b-card>
            </b-col>
          </b-row>
        </div>
      </div>
    </b-container>
  </div>
</template>



<script>
export default {
  name: "slider",
  props: {
    publicidades: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  methods: {
    irUrl(url) {
      if (url != null) {
        window.open(url, "_blank");
      }
    },
  },
};
</script>


<style scoped>
@media only screen and (max-width: 480px) {
  .itemCarrusel {
    width: 190px;
    height: auto;
    justify-content: center;
    margin-left: 4px;
  }
  .card-deck {
    justify-content: center;
    flex-wrap: wrap !important;
  }
}
@media all and (max-width: 600px) {
  .itemCarrusel {
    width: 124px;
    height: auto;
    margin-left: 10px;
  }
}
.contenedorPubli {
  display: flex;
  align-items: center;
  justify-content: center;
}

.itemCarrusel img {
  object-fit: contain;
}
.card-deck {
  display: flex;
  justify-content: flex-start;
  flex-flow: row wrap;
  align-items: stretch;
}
.card-deck .card {
  display: block;
  flex-basis: 33.3%; /* change this value for each breakpoint*/
}
</style>



