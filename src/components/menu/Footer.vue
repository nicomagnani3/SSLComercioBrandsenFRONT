<template>
 <b-container fluid class="contenedor">
  <b-row class="fila">
    <b-col align-self="center">
        
        <img class="logo" src="@/assets/locallogo.jpg" alt="">
    </b-col>

    <b-col align-self="center">
        
        <ul>
            <li>Buscá articulos en brandsen</li>
            <li>Buscá servicios en brandsen</li>
            <li>Buscá profesionales en brandsen</li>
        </ul>
    
    </b-col>
    
    
    <b-col align-self="center"> 
    
        
        <ul>
            <li>Todo en un mismo sitio</li>
            <li>Rápido y fácil</li>
            <li>Las mejores ofertas</li>
        </ul>
    </b-col>

    <b-col md="2" align-self="end"> 
        <a href=""><b-icon icon="bag-dash" font-scale="3"></b-icon></a>
        <a href=""><b-icon icon="bag-dash" font-scale="3"></b-icon></a>
        <a href=""><b-icon icon="bag-dash" font-scale="3"></b-icon></a>  
    </b-col>
    
  </b-row>
  
</b-container>
</template>


<script>
export default {
    name: "Footer",
    data () {
       
    }
}
</script>

<style  scoped>

    .contenedor{

        width: 100%;
        height: 300px;
        background-color: #ffce4e;;
    }
    
    .columna{

        border: 1px solid black;
        
    }

    .fila{height: 300px;}
    

    .logo{
        width: 300px;
    }
    


</style>

