<template>
  <div>
 <div>
    <VueSlickCarousel v-bind="settings">
      <div><img src="@/assets/correa.png" fluid alt="Responsive image 1"  /></div>
      <div><img src="@/assets/ford.png"  alt="Responsive image 2" /></div>
      <div><img src="@/assets/marquez.png"  alt="Responsive image 3" /></div>
      <div><img src="@/assets/trivilin.png"  alt="Responsive image 4" /></div>
      <div><img src="@/assets/viceconte.png"  alt="Responsive image 5"/></div>
      <div><img src="@/assets/ecobolsa.png"  alt="Responsive image 6"/></div>
    </VueSlickCarousel>
 </div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="5000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
    >
      <div v-for="item in publicidades" :key="item.id">
        <a @click="irUrl(item.url)" style="cursor: pointer" target="_blank">
          <b-carousel-slide
            :img-src="item.imagen"
            class="item"
            alt="image slot"
          ></b-carousel-slide>
        </a>
      </div>
    </b-carousel>
  </div>
</template>



<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  name: "slider",
  components: { VueSlickCarousel },
  props: {
    publicidades: {
      type: Array,
    },
  },
  data() {
    return {
      slide: 0,
      sliding: null,
      settings: {
        arrows: false,
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
      autoplay:true,
        speed: 6000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
              infinite: true,
              speed: 6000,
              autoplaySpeed: 2000,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
               infinite: true,
              speed: 6000,
              autoplaySpeed: 2000,
              dots: true,
               centerPadding: "20px",
              
            },
          },
        ],
      },
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
@media only screen and (max-width: 480px) {
  img {
    width: 90%;
  }
}
.carousel-wrapper {
  padding: 40px;
}

.img-wrapper img {
  margin: auto;
  width: 240px;
  height: 100px;
  background-image: linear-gradient(gray 100%, transparent 0);
}
</style>

