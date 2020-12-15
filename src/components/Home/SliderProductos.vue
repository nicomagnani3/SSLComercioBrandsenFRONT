<template>
  <div>
      <h3 class="m-5 titulo">Productos en oferta</h3>

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
                            img-src="https://http2.mlstatic.com/D_NQ_NP_2X_617439-MLA43293281398_082020-F.webp"
                            img-alt="Image"
                            img-top
                            tag="article"
                            img-height="150"
                            class=" itemCarrusel "
                        > 
                        <hr>
                            <b-card-text class="texto">
                                Plancha Sublimación
                                <p class="texto">$700</p>
                            </b-card-text >
                            <b-button href="#" variant="primary">Ver más</b-button>
                            

                            
                        </b-card >  
                    </b-col>  
                    <b-col class="itemCarrusel "> 
                        
                        <b-card 
                            img-src="https://http2.mlstatic.com/D_NQ_NP_773430-MLA31594127544_072019-O.webp"
                            img-alt="Image"
                            img-top
                            tag="article"
                            img-height="150"
                            class=" itemCarrusel "
                        > 
                        <hr>
                           <b-card-text class="texto">
                                Comutadora Gamer
                                <p class="texto">$700</p>
                            </b-card-text >
                            <b-button href="#" variant="primary">Ver más</b-button>

                            
                        </b-card >    
                        
                    
                    </b-col>  
                    <b-col class="itemCarrusel   "> 
                        
                        <b-card 
                            img-src="https://http2.mlstatic.com/D_NQ_NP_905755-MLA42129960418_062020-O.webp"
                            img-alt="Image"
                            img-top
                            tag="article"
                            img-height="150"
                            class=" itemCarrusel"
                        > 
                        <hr>
                            <b-card-text class="texto">
                                Tarjeta gráfica
                                <p class="texto">$700</p>
                            </b-card-text >
                            <b-button href="#" variant="primary">Ver más</b-button>

                           
                        </b-card >

                     </b-col> 
                    <b-col class="itemCarrusel">

                        <b-card 
                            img-src="https://http2.mlstatic.com/D_NQ_NP_710841-MLA44112324467_112020-O.webp"
                            img-alt="Image"
                            img-top
                            tag="article"
                            img-height="150"
                            class=" itemCarrusel"
                        > 
                        <hr>
                           <b-card-text class="texto">
                                Monopatin
                                <p class="texto">$700</p>
                            </b-card-text >
                            <b-button href="#" variant="primary">Ver más</b-button>

                           
                        </b-card >
                    </b-col> 
                </b-row >  
            </b-container >
            
        </b-carousel-slide>


        <b-carousel-slide class="carrousel">
            <b-container  class = "">   
                <b-row >  
                    <b-col class=" " > 
                        <b-card 
                            img-src="https://http2.mlstatic.com/D_NQ_NP_603321-MLA20734126403_052016-O.webp"
                            img-alt="Image"
                            img-top
                            tag="article"
                            img-height="150"
                            class=" itemCarrusel "
                        > 
                        <hr>
                          <b-card-text class="texto">
                                Auriculares
                                <p class="texto">$700</p>
                            </b-card-text >
                            <b-button href="#" variant="primary">Ver más</b-button>

                            
                        </b-card >  
                    </b-col>  
                    <b-col class="itemCarrusel "> 
                        
                        <b-card 
                            img-src="https://http2.mlstatic.com/D_NQ_NP_663511-MLA32019625619_082019-O.webp"
                            img-alt="Image"
                            img-top
                            tag="article"
                            img-height="150"
                            class=" itemCarrusel "
                        > 
                        <hr>
                           <b-card-text class="texto">
                                reproductor de musica
                                <p class="texto">$700</p>
                            </b-card-text >
                            <b-button href="#" variant="primary">Ver más</b-button>
                            
                        </b-card >    
                        
                    
                    </b-col>  
                    <b-col class="itemCarrusel   "> 
                        
                        <b-card 
                            img-src="https://http2.mlstatic.com/D_NQ_NP_910813-MLA31063770658_062019-O.webp"
                            img-alt="Image"
                            img-top
                            tag="article"
                            img-height="150"
                            class=" itemCarrusel"
                        > 
                        <hr>
                            <b-card-text class="texto">
                                Pileta Pelopincho
                                <p class="texto">$700</p>
                            </b-card-text >
                            <b-button href="#" variant="primary">Ver más</b-button>

                           
                        </b-card >

                     </b-col> 
                    <b-col class="itemCarrusel">

                        <b-card 
                            img-src="https://http2.mlstatic.com/D_NQ_NP_687664-MLA31351471850_072019-O.webp"
                            img-alt="Image"
                            img-top
                            tag="article"
                            img-height="150"
                            class=" itemCarrusel"
                        > 
                        <hr>
                           <b-card-text class="texto">
                                Cortadora de pasto
                                <p class="texto">$700</p>
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
       
      }
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



