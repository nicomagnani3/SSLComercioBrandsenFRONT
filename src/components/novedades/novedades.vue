<template>
  <div class="" v-if="novedades.length > 0">
    <br>
       <b-row class="text-left">
      <b-col cols="1"></b-col>
      <b-col cols="8">
        <div class="h4 font-britannic text widget-title destacados" >
          <strong class="parraforTitProd"> Novedades de la semana </strong>
          <!-- <a v-if="!loading" @click="verDestacados()" class="verMasServi"
            >ver mas</a
          > -->
        </div>
      </b-col>
    </b-row>
    <VueSlickCarousel :arrows="true" :dots="true" v-bind="settings">
      <b-col      
        v-for="(item, index) in novedades"
        :key="index"
        class="columnaCards"
      >
        <div class="project"><card-template :item="item" /></div>
      </b-col>
    </VueSlickCarousel>
    </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import CardTemplate from "@/components/novedades/CardTemplate";

export default {
  components: { VueSlickCarousel, CardTemplate },
  props: {
    novedades: {
      type: Array,
    },
  },
  data() {
    return {
      settings: {
        arrows: true,
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 2,
        cssEase: "linear",

        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
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
              slidesToShow: 2,
              slidesToScroll: 1,
             
            },
          },
        ],
      },
    };
  },
};
</script>

<style>
@media only screen and (max-width: 480px) {
  .columnaCards {
    padding-left: 0px !important;
  }
  .project:hover {
  transform: scale(1.0) !important;
}
}
.slick-arrow {
        display: block;
    width: 70px;
}
.slick-dots {
display: none !important;
}
.best-products {
  margin-bottom: 10px;
}

.imagnesIcon {
  width: 30px;
  margin-left: auto;
  margin-right: auto;
}

.projects {
  margin-bottom: 50px;
  margin-top: 25px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.projects-enter {
  transform: scale(0.5) translatey(-70px);
  opacity: 0;
}

.projects-leave-to {
  transform: translatey(20px);
  opacity: 0;
}

.projects-leave-active {
  position: absolute;
  z-index: -1;
  padding-left: 0px;
}

.project {
  transition: all 0.35s ease-in-out;
  margin: 10px;
  box-shadow: 0px 2px 8px lightgrey;
  border-radius: 13px;
  width: 180px;
  flex-direction: column;
  align-items: center;
}
.zoom {
  transition: transform 0.2s;
}

.project:hover {
  transform: scale(1.3)
}
</style>