<template>

 <div>
<VueSlickCarousel v-bind="settings">
  <div v-for="i in 8" :key="i" class="img-wrapper">
         <!-- <img :src="`./${i}-200x100.jpg`" />  -->
         <img src="@/assets/simon2.png" />
      </div>
</VueSlickCarousel>
 
<br>

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
 import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  name: "slider",
   components: { 
     VueSlickCarousel 
   },
  props: {
    publicidades: {
      type: Array,
    },
  },
  data() {
    return {
      slide: 0,
      sliding: null,
      settings:{        
  "arrows": false,
  "dots": true,
  "infinite": true,
  "slidesToShow": 6,
  "slidesToScroll": 1,
  "autoplay": true,
  "speed": 6000,
  "autoplaySpeed": 2000,
  "cssEase": "linear",
   "responsive": [
    {
      "breakpoint": 1024,
      "settings": {
        "slidesToShow": 2,
        "slidesToScroll": 2,
        "infinite": true,
        "dots": true
      }
    },
    {
      "breakpoint": 600,
      "settings": {
        "slidesToShow": 2,
        "slidesToScroll": 2,
        "initialSlide": 2
      }
    },
    {
      "breakpoint": 480,
      "settings": {
        "slidesToShow": 2,
        "slidesToScroll": 2
      }
    }
  ]

      }
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

