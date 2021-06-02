<template>
  <div>
          <img class="logo" src="@/assets/simone.jpg" alt="" height="auto" />

  </div>
</template>



<script>
export default {
  name: "slider",
  props: {
  
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



