<template>
  <div class="contenedorSliderP">

      <b-carousel class=" "  
      
      id="carousel-1"
      v-model="slide"
      :interval="3000"
      
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      
        <b-carousel-slide class="carrousel">
            <b-container>   
                <b-row>  
                    <b-col> 
                        <b-card 
                            img-src="https://i.pinimg.com/564x/cd/45/c6/cd45c6aaa70345daa0c619d38f7353af.jpg"
                            img-alt="Image"
                            img-top
                            tag="article"
                            img-height="150"
                            class=" itemCarrusel "
                        > 
          
                        </b-card >  
                    </b-col>  
                    <b-col class="itemCarrusel "> 
                        
                        <b-card 
                            img-src="https://i.pinimg.com/564x/cd/45/c6/cd45c6aaa70345daa0c619d38f7353af.jpg"
                            img-alt="Image"
                            img-top
                            tag="article"
                            img-height="150"
                            class=" itemCarrusel "
                        > 
                       

                            
                        </b-card >    
                        
                    
                    </b-col>  
                    <b-col class="itemCarrusel "> 
                        
                        <b-card 
                            img-src="https://i.pinimg.com/564x/cd/45/c6/cd45c6aaa70345daa0c619d38f7353af.jpg"
                            img-alt="Image"
                            img-top
                            tag="article"
                            img-height="150"
                            class=" itemCarrusel"
                        > 
                       
                           

                           
                        </b-card >

                     </b-col> 
                    <b-col class="itemCarrusel">

                        <b-card 
                            img-src="https://i.pinimg.com/564x/cd/45/c6/cd45c6aaa70345daa0c619d38f7353af.jpg"
                            img-alt="Image"
                            img-top
                            tag="article"
                            img-height="150"
                            class=" itemCarrusel"
                        > 
                        </b-card >
                    </b-col> 
                     <b-col class="itemCarrusel">

                        <b-card 
                            img-src="https://i.pinimg.com/564x/cd/45/c6/cd45c6aaa70345daa0c619d38f7353af.jpg"
                            img-alt="Image"
                            img-top
                            tag="article"
                            img-height="150"
                            class=" itemCarrusel"
                        > 
                        </b-card >
                    </b-col> 
                     <b-col class="itemCarrusel">

                        <b-card 
                            img-src="https://i.pinimg.com/564x/cd/45/c6/cd45c6aaa70345daa0c619d38f7353af.jpg"
                            img-alt="Image"
                            img-top
                            tag="article"
                            img-height="150"
                            class=" itemCarrusel"
                        > 
                        </b-card >
                    </b-col> 
                </b-row >  
            </b-container >
            
        </b-carousel-slide>
         <b-carousel-slide class="carrousel">
            <b-container>   
                <b-row >  
                    <b-col  > 
                        <b-card 
                            img-src="https://i.pinimg.com/564x/cd/45/c6/cd45c6aaa70345daa0c619d38f7353af.jpg"
                            img-alt="Image"
                            img-top
                            tag="article"
                            img-height="150"
                            class=" itemCarrusel "
                        > 
          
                        </b-card >  
                    </b-col>  
                    <b-col class="itemCarrusel "> 
                        
                        <b-card 
                            img-src="https://i.pinimg.com/564x/cd/45/c6/cd45c6aaa70345daa0c619d38f7353af.jpg"
                            img-alt="Image"
                            img-top
                            tag="article"
                            img-height="150"
                            class=" itemCarrusel "
                        > 
                       

                            
                        </b-card >    
                        
                    
                    </b-col>  
                    <b-col class="itemCarrusel "> 
                        
                        <b-card 
                            img-src="https://i.pinimg.com/564x/cd/45/c6/cd45c6aaa70345daa0c619d38f7353af.jpg"
                            img-alt="Image"
                            img-top
                            tag="article"
                            img-height="150"
                            class=" itemCarrusel"
                        > 
                       
                           

                           
                        </b-card >

                     </b-col> 
                    <b-col class="itemCarrusel">

                        <b-card 
                            img-src="https://i.pinimg.com/564x/cd/45/c6/cd45c6aaa70345daa0c619d38f7353af.jpg"
                            img-alt="Image"
                            img-top
                            tag="article"
                            img-height="150"
                            class=" itemCarrusel"
                        > 
                        </b-card >
                    </b-col> 
                     <b-col class="itemCarrusel">

                        <b-card 
                            img-src="https://i.pinimg.com/564x/cd/45/c6/cd45c6aaa70345daa0c619d38f7353af.jpg"
                            img-alt="Image"
                            img-top
                            tag="article"
                            img-height="150"
                            class=" itemCarrusel"
                        > 
                        </b-card >
                    </b-col> 
                     <b-col class="itemCarrusel">

                        <b-card 
                            img-src="https://i.pinimg.com/564x/cd/45/c6/cd45c6aaa70345daa0c619d38f7353af.jpg"
                            img-alt="Image"
                            img-top
                            tag="article"
                            img-height="150"
                            class=" itemCarrusel"
                        > 
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
        img: 'logo.png',
        slide: 0,
       sliding:null
      }
      },
      methods:{
          onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
      }
     }

   
</script>


<style scoped>


  .contenedorSliderP{
    
    margin: 30px;

  }
  .carrousel{

      height: 200px;
      
  }

  .itemCarrusel{
      
      width: 120px;
      height: 130px;
      
      
  }

  .titulo{

      color: rgb(109, 108, 108);
      
      
  }

  .texto{

      color: gray;
      font-family: 'Poppins', sans-serif;
      
  }
 

</style>>
