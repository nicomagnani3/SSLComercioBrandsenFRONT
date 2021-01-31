<template>
  
    
      <b-carousel class="carrousel "  
      
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="300"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >

      <b-carousel-slide class="carrousel"
        img-src="https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mla-home-desktop-slider-picture-290f11b5-c9d4-4fe1-b74f-36ba54cca903.jpg"
        img-width="1024%"
      ></b-carousel-slide>

      <b-carousel-slide class="carrousel" img-src="https://http2.mlstatic.com/optimize/o:f_webp/resources/exhibitors/MLA-verano-liquidacion/7f048300-5449-11eb-ad67-51076904dbb8-home-slider_desktop.jpg">
        <h1></h1>
      </b-carousel-slide>

       <b-carousel-slide class="carrousel" img-src="https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mla-home-desktop-slider-picture-b313de13-522c-40c7-bec2-c0a946403ba0.jpg">
        <h1></h1>
      </b-carousel-slide>

     </b-carousel>
    
      

    
     



  
</template>



<script>


    export default {
      name: 'slider',
    data() {
      return {
        slide: 0,
        img1: 'portada1.jpg',
       
     productos: [],
      sliding: null,
    };
  },
  methods: {
    onSlideStart(slide) {
      console.log(slide);
      this.sliding = true;
    },
    onSlideEnd(slide) {
      console.log(slide);
      this.sliding = false;
    },
     }
    }

   
</script>


<style scoped>
 
 
  
  

</style>>

