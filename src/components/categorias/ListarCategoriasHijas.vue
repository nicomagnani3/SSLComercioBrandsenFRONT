<template> 
  <div>
    <b-row class="pb-2">
      <b-col class="text-center pt-3">
        <p class="h3 text-center">
          Ahora debes elegir una categoria en particular
        </p>
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
    </b-table>
  </div>
</template>    
<script>
export default {
  name: "ListadoCategorias",
  props: {  
    categoriasHijas: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {    
      isBusy: false,   
      selectMode: "single",
      fields: [{ key: "nombre", class: "text-center p2" }],
    };
  },
  computed: {    
  },    

  methods: {
    onRowSelected(items) {
      this.$emit("update-categoria", items);
    },
  },
  mounted() {
       this.$refs.selectableTable.selectRow(1)
  },
};
</script>

<style>
</style>
       