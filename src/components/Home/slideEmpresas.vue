<template>
  <div>
      <h3 class="m-5 titulo">Los mejores negocios te esperan </h3>

      <b-carousel class="carrousel "  
      
      id="carousel-1"
      v-model="slide"
      :interval="0"
      controls
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      
        <b-carousel-slide class="carrousel">
            <b-container>   
                <b-row >  
                    <b-col  > 
                        <b-card 
                            img-src="https://rrhhjobs.com/wp-content/uploads/2020/03/logo-hendel.png"
                            img-alt="Image"
                            img-top
                            tag="article"
                            img-height="150"
                            class=" itemCarrusel "
                        > 
                        <hr>
                            <b-card-text class="texto">
                                Hendel
                               
                            </b-card-text >
                            <b-button href="#" variant="primary">Ver más</b-button>
                            

                            
                        </b-card >  
                    </b-col>  
                    <b-col class="itemCarrusel "> 
                        
                        <b-card 
                            img-src="https://directoriopampeano.com/fotos/2017/01/be99bc9b9154c4a37d7466fca4656bb5_62468-1.png"
                            img-alt="Image"
                            img-top
                            tag="article"
                            img-height="150"
                            class=" itemCarrusel "
                        > 
                        <hr>
                           <b-card-text class="texto">
                                Grupo Marquez
                            </b-card-text >
                            <b-button href="#" variant="primary">Ver más</b-button>

                            
                        </b-card >    
                        
                    
                    </b-col>  
                    <b-col class="itemCarrusel   "> 
                        
                        <b-card 
                            img-src="https://static.wixstatic.com/media/3af348_4b5958483e564f28a460570116f93461~mv2.jpg/v1/fill/w_258,h_258,al_c,q_80,usm_0.66_1.00_0.01/logo%20brisa.webp"
                            img-alt="Image"
                            img-top
                            tag="article"
                            img-height="150"
                            class=" itemCarrusel"
                        > 
                        <hr>
                            <b-card-text class="texto">
                                Carniceria Brisa
                            </b-card-text >
                            <b-button href="#" variant="primary">Ver más</b-button>

                           
                        </b-card >

                     </b-col> 
                    <b-col class="itemCarrusel">

                        <b-card 
                            img-src="https://static.wixstatic.com/media/3af348_b659f619d64c4dbd8bfb8ad274dd4214~mv2.jpg/v1/fill/w_258,h_258,al_c,q_80,usm_0.66_1.00_0.01/logo%20meissen.webp"
                            img-alt="Image"
                            img-top
                            tag="article"
                            img-height="150"
                            class=" itemCarrusel"
                        > 
                        <hr>
                           <b-card-text class="texto">
                                Cerveceria Meissen
                            </b-card-text >
                            <b-button href="#" variant="primary">Ver más</b-button>

                           
                        </b-card >
                    </b-col> 
                </b-row >  
            </b-container >
            
        </b-carousel-slide>
    </b-carousel>
    
        
      

  </div>
    
    
     



  
</template>



<script>


    export default {
      name: 'slider',
    data() {
      return {
        slide: 0,
       sliding:null
      }
      },
      methods:{
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

      height: 350px;
      
  }

  .itemCarrusel{
      
      width: 200px;
      height: 300px;
      
  }

  .titulo{

      color: rgb(109, 108, 108);
      
      
  }

  .texto{

      color: gray;
      font-family: 'Poppins', sans-serif;
      
  }
 

</style>>



