<template>
  
<b-container>
  <h3 class="m-5 titulo">Productos destacados</h3>  
  <vueper-slides
      class="no-shadow"
      :visible-slides="5"
      slide-multiple
      :gap="3"
      :slide-ratio="1 / 4"
      :dragging-distance="60"
      :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }"
      >
  
        <vueper-slide 
          v-for="i in 10" 
          :key="i" 
          class="item"
          :image="`https://www.eluniverso.com/sites/default/files/styles/powgallery_1024/public/fotos/2020/08/-_huawei.jpg?itok=rFf7R74N`" 
        />
        
</vueper-slides>

  
</b-container>

  
 
  
</template>



<script>

import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  name: "slider",
  components: { VueperSlides, VueperSlide },

  data() {
    return {
      productos: [],
      sliding: null,
    };
  },
  
  
};
</script>


<style scoped>

  .item{
    box-shadow: 3px 3px 5px 3px rgba(0, 0, 0, 0.2);;
  }
    
</style>
