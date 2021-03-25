<template>
<div  >
  
  <b-carousel
    v-model="slide"
    :interval="4000"
    controls
    indicators
    background="#ababab"
    img-width="1024"
    img-height="100"
    style="text-shadow: 1px 1px 2px #333"
    @sliding-start="onSlideStart"
    @sliding-end="onSlideEnd"
  >
    <b-carousel-slide
     
      img-src="https://i.pinimg.com/originals/e4/aa/b3/e4aab3b7ff4dc32df38837895236ca4b.png"
      class="d-block w-100" alt="image"
    ></b-carousel-slide>
  </b-carousel>
  
</div>
</template>



<script>
export default {
  name: "slider",
  data() {
    return {
      slide: 0,

      productos: [],
      sliding: null,
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
};
</script>


<style scoped>


</style>>

