<template>  
  <div>
    <b-row class="pb-2">
      <b-col class="text-center pt-3">
        <p class="h2 text-center">
             <strong class="parrafoCategorias">  ¿Que tipo de emprendimiento vas a publicar? </strong>
        </p>
      </b-col>
    </b-row>
    <b-table
      ref="selectableTable"
      selectable
      :select-mode="selectMode"
      :items="emprendimientos"
      :fields="fields"
      @row-selected="onRowSelected"
      responsive="sm"
       hover medium 
    >
    </b-table>
  </div>
</template>    
<script>
export default {
  name: "ListadoEmprendimientos",
  props: {
    emprendimientos:{ 
      type: Array,
    },
  },
  data() {
    return {    
      selectMode: "single",
      fields: [{ key: "nombre", class: "text-center p2" ,  style:"padding:1rem;"}],
    };
  },
  computed: {

  },
  created() {},
  methods: {   
    onRowSelected(items) {
      this.$emit("update-emprendimiento", items);
    },
    
  },
  mounted() {
   this.$refs.selectableTable.selectRow(0)
  },
};
</script>

<style>
</style>
       