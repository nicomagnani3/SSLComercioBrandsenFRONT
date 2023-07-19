<template> 
  <div>
    <b-row class="pb-2">
      <b-col class="text-center pt-3">
        <p class="h3 text-center">
         <strong class="parrafoCategorias">     Contanos un poco mas con detalle el servicio que vas a publicar!</strong>
        </p>
      </b-col>
    </b-row>
    <b-table
      ref="selectableTable"
      selectable
      :select-mode="selectMode"
      :items="servicioshijos"
      :fields="fields"
      @row-selected="onRowSelected"
      responsive="sm"
    >
    </b-table>
  </div>
</template>    
<script>
export default {
  name: "ListadoServiciosHijos",
  props: {  
    servicioshijos: {
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
      this.$emit("update-servicioHijo", items);
    },
  },
  mounted() {
       this.$refs.selectableTable.selectRow(1)
  },
};
</script>