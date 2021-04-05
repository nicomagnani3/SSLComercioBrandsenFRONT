<template>
  <div>
    <br />
    <div class="card-deck-wrapper">
      <div class="card-deck">
        <b-row v-for="publicidad in publicidades" v-bind:key="publicidad.id">
          <b-col sm class="itemCarrusel">
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
  </div>
</template>




<script>
export default {
  name: "Publicidad",
  props: {
    publicidades: {
      type: Array,
    },
  },
  data() {
    return {
      img: "publi.jpg",
    };
  },
  created() {},
  methods: {
    irUrl(url) {
      if (url != null) {
        window.open(url, "_blank");
      }
    },
  },
};
</script>

<style  scoped>
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
@media only screen and (max-width: 880px) {
  .itemCarrusel {
    width: 190px;
    height: auto;
    justify-content: center;
    margin-left: 4px;
  }
  .card-deck {
    justify-content: center;
     flex-wrap: wrap !important;;
  }
}
.contenedorPubli {
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-deck {
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
  justify-content: center;
}
.card-deck .card {
  display: block;

  /* change this value for each breakpoint*/
}

.itemCarrusel img {
  object-fit: contain;
}
</style>