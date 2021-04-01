<template>
  <div>
    <b-carousel
      id="carousel-1"
   
      v-model="slide"
      :interval="5000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
    >
    
        <b-carousel-slide
        v-for="item in publicidades"
        :key="item.id"
        
        :img-src="item.imagen"
          class="item"
 
          alt="image slot"
        ></b-carousel-slide>
        </b-carousel>    
      </div>
 <!-- 
    <b-carousel
      id="carousel-1"
   
      v-model="slide"
      :interval="5000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
    >
    <b-carousel-slide v-for="(slide, index) in publicidades" :key="index">
   <template >
      <img
       class="d-block class-name"
       width="1024"
       :src="slide.imagen"
       alt="image slot">
    </template>
    </b-carousel-slide>
    </b-carousel>
  </div> -->
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

