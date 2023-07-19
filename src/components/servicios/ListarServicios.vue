<template>  
  <div>
    <b-row class="pb-2">
      <b-col class="text-center pt-3">
        <p class="h3 text-center">
          <strong class="parrafoCategorias">     ¿Que tipo de servicio vas a publicar?</strong>
        </p>
      </b-col>
    </b-row>
    <b-table
      ref="selectableTable"
      selectable
      :select-mode="selectMode"
      :items="servicios"
      :fields="fields"
      @row-selected="onRowSelected"
      responsive="sm"
    >
    </b-table>
  </div>
</template>    
<script>
export default {
  name: "ListadoServicios",
  props: {
    servicios:{ 
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
      this.$emit("update-servicio", items);
    },
    
  },
  mounted() {
   this.$refs.selectableTable.selectRow(0)
  },
};
</script>