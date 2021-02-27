<template>
 <b-container fluid class="contenedor">
  <b-row class="fila">
    <b-col xs="12" md="6" lg="3" align-self="center">
        
        <img class="logo" src="@/assets/MalamboLogo.png" alt="">
    </b-col>

    <b-col xs="12" md="12" lg="3" align-self="center">
        
        <ul>
            <li>Buscá articulos en brandsen</li>
            <li>Buscá servicios en brandsen</li>
            <li>Buscá profesionales en brandsen</li>

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
        <a href=""> <img  class="icono" src="@/assets/logowsp.png" alt=""> </a>
        <a href=""> <img  class="icono" src="@/assets/logo-ig.png" alt=""> </a>
        <a href=""> <img  class="icono" src="@/assets/icono-face.png" alt=""> </a> 
    </b-col>
 
  </b-row>

  <b-row class="big">
      <b-col>
          <p>Desarrollado por</p>
          <a href=""> <img  class="logoBig" src="@/assets/bigdata.png" alt=""> </a> 
      </b-col>

  </b-row>
  
</b-container>
</template>


<script>
export default {
    name: "Footer",
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

    .logo{
        width: 300px;
    }

    .icono{
        width: 35px;
        margin: 5px;
    }

    .logoBig{

        width:150px;
        
    }

    .big{

        text-align: center;
    }
    


</style>

