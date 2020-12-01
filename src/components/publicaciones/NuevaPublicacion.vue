<template>
<div>
        <form-wizard @on-complete="onComplete">
            <tab-content title="¡Hola! Antes que nada contanos,
¿qué vas a publicar?"
                         icon="ti-user">
            <ListarCategorias
            :categoriaPrincipal="this.categoriaPrincipal"
            @update-categoria="update" 
            ></ListarCategorias>
            </tab-content>
            <tab-content title="Additional Info"
                         icon="ti-settings">
             <ListarCategoriasHijas
            :categoria="this.categoriaPrincipal"
     
            ></ListarCategoriasHijas>
            </tab-content>
            <tab-content title="Last step"
                         icon="ti-check">
              Yuhuuu! This seems pretty damn simple
            </tab-content>
        </form-wizard>
 </div>

</template>

<script>
import ListarCategorias from '@/components/categorias/ListarCategorias.vue'
import ListarCategoriasHijas from '@/components/categorias/ListarCategoriasHijas.vue'

  export default {
    name: "nuevaPublicacion",
  components: {
    ListarCategorias,
    ListarCategoriasHijas
  },
  data() {
   
    return { 
      categoriaPrincipal:1
    }
  },
     methods: {
      onComplete: function(){
  
       },
        update(categoria) {
        
      this.categoriaPrincipal = categoria[0].id;
    }
      }
  }
</script>