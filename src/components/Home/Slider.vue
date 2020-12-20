<template>
  
    
      <b-carousel class="carrousel ml-4 mr-4"  
      
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
        img-src="https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mla-home-desktop-slider-picture-a09d7f48-499f-4838-82f1-b519c1ca28bc.jpg"
      ></b-carousel-slide>

      <b-carousel-slide class="carrousel" img-src="https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mla-home-desktop-slider-picture-f6d56ce6-efc6-42e9-b0bd-3138377d5941.jpg">
        <h1></h1>
      </b-carousel-slide>

       <b-carousel-slide class="carrousel" img-src="https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mla-home-desktop-slider-picture-134597c7-757a-426a-b790-0cadb7a68f4c.jpg">
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
        img1: 'blackfriday.jpg',
       
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
 
 
  .carrousel{

      height: 250px;
      
  }

  

</style>>

