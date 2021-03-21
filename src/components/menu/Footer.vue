<template>
    
 <b-container fluid class="contenedor">
    
  <b-row class="fila">
    <b-col xs="12" md="6" lg="3" align-self="center">
        
        <img class="logo" src="@/assets/MalamboLogo.png" alt="">
    </b-col>

    <b-col xs="12" md="12" lg="3" align-self="center">
        
        <ul>
            <li>Buscá articulos en Brandsen</li>
            <li>Buscá servicios en Brandsen</li>
            <li>Buscá profesionales en Brandsen</li>

        </ul>
    
    </b-col>
    
    
    <b-col xs="12" md="12" lg="3" align-self="center"> 
    
        
        <ul>
            <li>Todo en un mismo sitio</li>
            <li>Rápido y fácil</li>
            <li>Las mejores ofertas</li>
        </ul>
    </b-col>

    <b-col xs="12" md="12" lg="3" align-self="end">
        <p>Contáctenos:</p>
        <p>info@malambobrandsen.com.ar</p>
        <a href=""> <img  class="icono" src="@/assets/logowsp.png" alt=""> </a>
        <a href="https://www.instagram.com/malambobrandsen/"> <img  class="icono" src="@/assets/logo-ig.png" alt=""> </a>
        <a href="https://www.facebook.com/MalamboBrandsen"> <img  class="icono" src="@/assets/icono-face.png" alt=""> </a> 
    </b-col>
 
  </b-row>

  <b-row class="big">
      <b-col>
          <a href=""> <img  class="logoBig" src="@/assets/bigdatapng.png" alt=""> </a> 
      </b-col>

  </b-row>
  
</b-container>
</template>


<script>



export default {
    name: "Footer",
    components: {
    
    
  },
    data () {
       return {
            
        }
    }
}
</script>

<style  scoped>

    .contenedor{

        
        height: auto;
        background-color: #ffce4e;
        
    }
    
    .columna{

        border: 1px solid black;
        
    }
    .containPubli{
        margin:10px;
    }

    .logo{
        width: 300px;
    }

    .icono{
        width: 35px;
        margin: 5px;
    }

    .logoBig{

        width:40%;
        
    }

    .big{

        text-align: center;
        
    }
    


</style>

