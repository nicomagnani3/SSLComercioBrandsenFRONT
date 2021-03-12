<template>
    
    <b-container fluid class=" containpubli bv-example-row">
        <b-row>
            <b-col class="publicidad"><img Class="imgPubliF" src="@/assets/Malambo-footer.png" alt=""></b-col>
            <b-col class="publicidad"><img Class="imgPubliF" src="@/assets/Malambo-footer2.png" alt=""></b-col>
            <b-col class="publicidad"><img Class="imgPubliF" src="@/assets/Malambo-footer3.png" alt=""></b-col>
        </b-row>

</b-container>

</template>




<script>
export default {
    name: "Publicidad",
    data () {
        return {
            img: 'publi.jpg'
        }
    }
}
</script>

<style  scoped>
    .imagen{

        width: 100%;
    }

    

    .publicidad{

        
       margin-bottom: 5px;
        
        
    }

   

    .imgPubliF{
        width: 400px;
        height: 250px;
    }
</style>