<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
    <div>
      <b-carousel-slide
        img-src="https://i.pinimg.com/originals/15/e1/aa/15e1aa808c9d7e1fb78e2654362ada4d.jpg"
        fluid
        alt="Responsive image"
      ></b-carousel-slide>
    </div>
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
@media (max-width: 1023px){
.exhibitor-holder img, .exhibitor .slick-list {
    
        height: 134px;
}
}
</style>

