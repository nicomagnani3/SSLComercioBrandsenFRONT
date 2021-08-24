<template>
  <div >
    <div class="project-image-wrapper">
      <img class="project-image" :src="item.imagen" />
    </div>
    <div class="cuerpo">
      <div style="text-align: center" class="selectTamaño">
        <div>
          <small
            ><strong
              >{{ item.nombre}}</strong
            ></small
          >
        </div>     
         <div class="cortar">
          <small
            ><strong
              >{{ item.descripcion}}</strong
            ></small
          >
        </div>       
    
      </div>
    
      <br />
   
    </div>
  </div>
</template>

<script>
export default {
  name: "cardTemplate",
  props: ["item", "productosSeleccionados", "nombreCategoria"],
  data() {
    return {
      cantidad: 0,
      selected: "Regular",
      options: [
        { value: null, text: "Tamaño", disabled: true },
        { value: "Mini", text: "Mini" },
        { value: "Regular", text: "Regular" },
        { value: "Grande", text: "Grande" },
      ],
    };
  },
  components: {},

  methods: {   
    cambiarCantidad() {
      this.cantidad = 1;
    },
    agregarCarrito(item) {

      console.log(item)
      if (this.cantidad > 0) {
        if (!this.yaEstaSeleccionado(item.id, this.selected, this.cantidad)) {
          let categoria = this.verNombreCategoria(item);
          this.productosSeleccionados.push({
            pedido: item.id,
            tamaño: this.selected,
            cantidad: this.cantidad,
            imagen: item.url,
            nombre: item.nombre,
            numero: item.numero,
            categoria: categoria,
          });
          this.$emit("seleccionoProducto");
        }
      }
    },
    verNombreCategoria(item) {   
      if (item.nombre != null && item.nombre != '') {
        return item.nombre;
      } else {
        return this.nombreCategoria;
      }
    },
    yaEstaSeleccionado(id, tamaño, cantidad) {
      console.log("pedido")
      let retornan = false;
      this.productosSeleccionados.forEach((pedido) => {
        console.log(pedido)
        
        if (pedido.pedido == id && pedido.tamaño == tamaño) {
          pedido.cantidad = Number(pedido.cantidad) + Number(cantidad);
          retornan = true;
        }
      });
      return retornan;
    },
  },
  mounted() {},
};
</script>
<style >
.cortar {
  font-weight: 700;
  /* display: -webkit-box; */
  /* height: 30px; */
  /* margin: 0; */
  /* text-align: left; */
  /* cursor: pointer; */
  font-size: 13px;
  line-height: 18px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  /* text-overflow: ellipsis; */
  text-overflow: -o-ellipsis-lastline;
  white-space: normal;
  padding-top: 10px;
  color: #2c354f;
  max-width: 191px;
  white-space: nowrap;
  /* overflow: hidden; */
  text-overflow: ellipsis;
}

.project-image-wrapper {
  position: relative;
  background: #ebebeb;
}

.project-image {
  max-width: 183px;
  border: 4px solid transparent;
  display: block;
  margin: auto;
  height: 150px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  object-fit: contain;
}

</style>