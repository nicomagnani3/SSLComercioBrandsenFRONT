<template>
  <b-container class="listadoCategorias">
    <div v-if="loading" class="py-5 text-center box-shadow">
      <span class="text-danger">
        <b>Cargando</b>
      </span>
      <b-spinner variant="primary" label="Text Centered"></b-spinner>
    </div>
    <div v-else class="py-5 text-center box-shadow">
      <b-row class="pb-2">
        <b-col class="text-center pt-3">      
            <p class="h3 text-center" style="color: #ffe428;">¡Hola! Antes que nada contanos,¿qué vas a publicar?</p>                  
        </b-col>
      </b-row>
     
    <b-table
      ref="selectableTable"
      selectable
      :select-mode="selectMode"
      :items="categorias"
      :fields="fields"
      @row-selected="onRowSelected"
      responsive="sm"
    >
      <!-- Example scoped slot for select state illustrative purposes -->
  
    </b-table>  
    </div>
  </b-container>
</template>    
<script>
import CategoriasService from "@/services/CategoriasService";

export default {
  name: "ListadoCategorias",
     props: {  
    
    },
  data() {
    return {
  
      loading: true,
      isBusy: false,
      categorias: [],
      selectMode: 'single',
      fields: [     
        { key: "nombre", class: "text-center p2" },          
      ],   
    };
  },
  computed: {   
  },
  created () {    
 
  },
 methods: {
    async getcategorias() {
      try {
        const response = await CategoriasService.getCategorias();
        this.categorias = response.data.data;
     
      } catch (err) {
        this.categorias = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
      }
    },
     onRowSelected(items) {       
        
        this.$emit("update-categoria", items);

      },
  },
  mounted() {
    this.getcategorias().then(() => {
      this.loading = false;
    });
  },
};
</script>

<style>
</style>
       