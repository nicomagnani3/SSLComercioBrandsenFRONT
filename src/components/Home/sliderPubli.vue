<template>
  <div>
   <div class="" v-if="publicidades.length > 0">
    <br>    
    <VueSlickCarousel :arrows="true" :dots="true" v-bind="settings">
      <b-col      
        v-for="(item, index) in publicidades"
        :key="index"
        class="columnaCards"
      >
        <img :src="item.imagen" fluid alt="Responsive image" />
      </b-col>
    </VueSlickCarousel>
    </div>
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
        slidesToShow:6,
        rows: 1,
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
                rows: 2,
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
              slidesToShow: 3,
              slidesToScroll: 2,
              initialSlide: 2,
                    rows: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
               infinite: true,
               rows: 2,
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
@media all and (max-width: 480px) {
  .itemCarrusel {
    width: 124px;
    height: auto;
    margin-left:8px;
    margin-right: 5px;
    justify-content: center;
  }
  .contenedorPubli {
    display: flex;
    justify-content: center;
    align-items: center;    
  }
   img {
    width: 60%;
  }
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
</style>>



