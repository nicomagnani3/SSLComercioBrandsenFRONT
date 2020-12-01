<template>
  <b-container class="listadoCategoriasHijas">
    <div v-if="loading" class="py-5 text-center box-shadow">
      <span class="text-danger">
        <b>Cargando</b>
      </span>
      <b-spinner variant="primary" label="Text Centered"></b-spinner>
    </div>
    <div v-else class="py-5 text-center box-shadow">
      <b-row class="pb-2">
        <b-col class="text-center pt-3">      
            <p class="h3 text-center" style="color: #ffe428;">Ahora debes elegir una categoria en particular</p>                  
        </b-col>
      </b-row>
     
    <b-table
      ref="selectableTable"
      selectable
      :select-mode="selectMode"
      :items="categoriasHijas"
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
     categoria: {
      type: Number,
       required: false
    },
    },
  data() {
    return {
  
      loading: true,
      isBusy: false,
      categoriasHijas: [],
      selectMode: 'single',
      fields: [     
        { key: "nombre", class: "text-center p2" },          
      ],   
    };
  },
  computed: {   
  },
 
 methods: {
    async getcategoriasHijas() {
       console.log(this.categoria)
      try {
        const response = await CategoriasService.getcategoriasHijas({
          categoria: this.categoria
        });
        this.categoriasHijas = response.data.data; 
      } catch (err) {
        this.categorias = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
      }
    },
     onRowSelected(items) {
         console.log(items)
        
        this.$emit("update-categoria", items);

      },
  },
  created() { 
      console.log(this.categoria)    
        this.categoriasHijas=[]
    this.getcategoriasHijas().then(() => {
      this.loading = false;
    });
  },
};
</script>

<style>
</style>
       