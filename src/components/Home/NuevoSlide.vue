<template>

<b-container style="width:100%;margin:20px auto;height:400px">
    <h3 class="m-5 titulo">Productos en oferta</h3>
   <!-- Using the slider component -->
   <slider ref="slider" :options="options" @slide='slide' @tap='onTap' @init='onInit'>
       <!-- slideritem wrapped package with the components you need -->
       <slideritem v-for="(item,index) in someList" :key="index" :style="item.style">

        <b-card 
          img-src="https://http2.mlstatic.com/D_NQ_NP_797041-MLA31010002588_062019-O.webp"
          img-alt="Image"
          img-top
          tag="article"
          img-height="300px"
          class=" itemCarrusel "
        > 
          
          <b-button href="#" variant="primary">Ver más</b-button>
                            

                            
        </b-card > 



       </slideritem>
       <!-- Customizable loading -->
       <div slot="loading">loading...</div>
   </slider>
</b-container>
</template>
<script>
// import slider components
import { slider, slideritem } from 'vue-concise-slider'
export default {
name: 'NuevoSlide',
data () {
   return {
     //data list [array]
     someList:[
       {
         html: 'slide1',
         style: {
            
            'width': '23.5%',
            'margin-right': '2%'
             
         }
       },
       {
         html: 'slide2',
         style: {
           
            'width': '23.5%',
            'margin-right': '2%'
         }
       },
       {
         html: 'slide3',
         style: {
            
            'width': '23.5%',
            'margin-right': '2%',
            
         }
       },
       {
         html: 'slide4',
         style: {
            
            'width': '23.5%',
            'margin-right': '2%'
         }
       },
       {
         html: 'slide5',
         style: {
            
            'width': '23.5%',
            'margin-right': '2%'
         }
       },
       {
         html: 'slide6',
         style: {
            
            'width': '23.5%',
            'margin-right': '2%'
         }
       },
       {
         html: 'slide7',
         style: {
            
            'width': '23.5%',
            'margin-right': '2%'
         }
       },
       
     ],
     //Slider configuration [obj]
     options: {
        currentPage: 0,
        infinite: 4,
        slidesToScroll: 4,
        loop: true
     }
   }
 },
 components: {
   slider,
   slideritem
 }
}
</script>


