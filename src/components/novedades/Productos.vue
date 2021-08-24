<template>
 <div  class="container-fluid">
    <b-row
      class="projects"
      name="projects"
      cols="4"
      cols-sm="8"
      cols-md="8"
      cols-lg="6"
    >
      <b-col v-for="(item, index) in bestProducts" :key="index" class="columnaCards" >
        <div class="project">
          <card-template
            :item="item"
            :productosSeleccionados="productosSeleccionados"
            @seleccionoProducto="seleccionoProducto"
            :nombreCategoria="item.categorias[0].categoria"
          /><br>
        </div>
      </b-col>
    </b-row>
  </div>
  <!--   <transition-group class="projects" name="projects">
    <div class="project" v-bind:key="item.nombre" v-for="item in bestProducts" >
        <card-template  :item="item" :productosSeleccionados="productosSeleccionados"  @seleccionoProducto="seleccionoProducto" />
      <br />
    </div>
  </transition-group> -->
</template>


<script>
import CardTemplate from "@/components/Productos/CardTemplate";
export default {
  name: "Home",
  props: {
    bestProducts: {
      type: Array,
    },
    productosSeleccionados: {
      type: Array,
    },
  },

  components: { CardTemplate },
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
  },
  methods: {
    seleccionoProducto() {
      this.$emit("seleccionoProducto");
    },
  },
};
</script>


<style>
@media only screen and (max-width: 480px) {
.columnaCards {
   padding-left: 0px !important;
}
}

.best-products {
  margin-bottom: 10px;
}

.imagnesIcon {
  width: 30px;
  margin-left: auto;
  margin-right: auto;
}

.projects {
  
  margin-bottom: 50px;
  margin-top: 25px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.projects-enter {
  transform: scale(0.5) translatey(-70px);
  opacity: 0;
}

.projects-leave-to {
  transform: translatey(20px);
  opacity: 0;
}

.projects-leave-active {
  position: absolute;
  z-index: -1;
   padding-left: 0px;
}

.project {
  transition: all 0.35s ease-in-out;
  margin: 10px;
  box-shadow: 0px 2px 8px lightgrey;
  border-radius: 13px;
  width: 180px;

  flex-direction: column;
  align-items: center;
}


</style>