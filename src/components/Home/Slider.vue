<template>
  <div>
    <b-carousel
      id="carousel-1"
      class="carrusel1"
      v-model="slide"
      :interval="5000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
    >
      <div v-for="publicidad in publicidades" v-bind:key="publicidad.id">
        <b-carousel-slide
          :img-src="publicidad.imagen"
          alt="image slot"
        ></b-carousel-slide>
      </div>
    </b-carousel>
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
    return {
      slide: 0,
      sliding: null,
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


<style scoped>
</style>

