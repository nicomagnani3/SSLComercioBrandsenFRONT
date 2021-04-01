<template>
  <div>
    <br />

    <b-row class="text-center">
      <b-col class="publicidad"
        ><img
          class="img-fluid"
          @click="irUrl(publicidades[0].url)"
          alt="Responsive image"
          :src="publicidades[0].imagen"
        />
      </b-col>
      <b-col class="publicidad"
        ><img
          :src="publicidades[1].imagen"
          @click="irUrl(publicidades[1].url)"
          class="img-fluid"
          alt="Responsive image"
          style="cursor: pointer"
      /></b-col>
      <b-col class="publicidad"
        ><img
          :src="publicidades[2].imagen"
          @click="irUrl(publicidades[2].url)"
          class="img-fluid"
          style="cursor: pointer"
          alt="Responsive image"
      /></b-col>
    </b-row>
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
  created (){
    console.log(this.publicidades)

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

<style  scoped>
.contenedorPubli {
  display: flex;
  align-items: center;
  justify-content: center;
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