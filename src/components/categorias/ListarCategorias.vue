<template>  
  <div>
    <b-row class="pb-2">
      <b-col class="text-center pt-3">
        <p class="h3 text-center ">
         <strong class="parrafoCategorias"> {{$t('publicaciones.tipo_categoria') }}</strong>
        </p>
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
    </b-table>
  </div>
</template>    
<script>
export default {
  name: "ListadoCategorias",
  props: {
    categorias:{ 
      type: Array,
    },
  },
  data() {
    return {    
      selectMode: "single",
      fields: [{ key: "nombre", class: "text-center p2" }],
    };
  },
  computed: {

  },
  created() {},
  methods: {   
    onRowSelected(items) {
      this.$emit("update-categoria", items);
    },
    
  },
  mounted() {
   this.$refs.selectableTable.selectRow(0)
  },
};
</script>

<style>
</style>
       