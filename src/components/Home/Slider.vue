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

>

      <div>
        <b-carousel-slide
          img-src="https://i.pinimg.com/originals/70/d3/c7/70d3c7f76c3f8bd256f035b962c41bb9.jpg"
          fluid
          alt="Responsive image"
        ></b-carousel-slide>
        <b-carousel-slide
          img-src="https://i.pinimg.com/originals/58/ee/21/58ee21b3b162bd9efaddf385a70d2a79.jpg"
          fluid
          alt="Responsive image"
        ></b-carousel-slide>

        <b-carousel-slide
          img-src="  https://i.pinimg.com/originals/d8/48/fa/d848fa352826b4dd9cd1a2182ad11562.jpg"
          fluid
          alt="Responsive image"
        ></b-carousel-slide>
        <b-carousel-slide
          img-src="https://i.pinimg.com/originals/1c/42/7e/1c427ee01e792e3f3c614e0d447a479e.jpg"
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
<<<<<<< HEAD
@media (max-width: 1023px){
.exhibitor-holder img, .exhibitor .slick-list {
    
        height: 134px;
}
=======
@media (max-width: 1023px) {
  .exhibitor-holder img,
  .exhibitor .slick-list {
    height: 134px;
  }
>>>>>>> 4164ba75c029ec68da9afd9e9c203dd470a36f1a
}
</style>

