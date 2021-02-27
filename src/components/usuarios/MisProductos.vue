<template>
  <div v-if="loading" class="text-center">
    <br />
    <br />
    <span class="text-danger">
      <b>Cargando</b>
    </span>
    <b-spinner variant="primary" label="Text Centered"></b-spinner>
  </div>
  <div v-else class="body">
    <b-row class="pb-3">
      <b-col lg="2" sm="4" class="text-center"></b-col>
      <b-col md="8" sm="6" class="text-left pt-3">
        <div>
          <p class="h1 text-center">Mis Productos</p>
        </div>
      </b-col>
    </b-row>
    
    <b-container fluid class="bv-example-row">      
      <b-row align-h="start">
        <b-col md="4"></b-col>
          <div v-if="publicaciones.length == 0">
            <br /><br /><br /><br /><br />
            <b-alert show variant="success">
              <h4 class="alert-heading">
                <b-icon scale="1.5" icon="exclamation" variant="info"></b-icon>Usted no posee publicaciones
              </h4>
              <p>
                <br />
               -Para realizar alguna publicacion acceda en el menu a la seccion Publicar.<br />
               <br />        
              </p>
            </b-alert>
          </div>
        <b-col>
          <transition
            v-for="producto in publicaciones"
            v-bind:key="producto.id"
            :per-page="perPage"
            :current-page="currentPage"
          >
            <div>
              <b-card no-body class="overflow-hidden" style="max-width: 956px">
                <br />
                <b-row no-gutters>
                  <b-col md="6">
                    <b-card-img
                      :src="`data:image/png;base64, ${producto.imagen}`"
                      alt="Image"
                      class="rounded-0"
                    ></b-card-img>
                  </b-col>
                  <b-col md="6">
                    <b-card-body>
                      <h3>
                        <strong>{{ producto.titulo }} </strong
                        ><span
                          v-if="producto.destacado"
                          class="badge badge-primary"
                        >
                          Destacado</span
                        >
                      </h3>
                      <h4 v-if="producto.precio > 0">
                        Precio $: {{ producto.precio }}
                      </h4>
                      <h5>
                        Fecha de publicacion: {{ producto.fecha | formatDate }}
                      </h5>
                      <p>{{ producto.padre }}</p>

                      <b-button variant="danger" @click="eliminar(producto)"
                        ><b-icon icon="x"></b-icon
                      ></b-button>
                    </b-card-body>
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </transition>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import PublicacionService from "@/services/PublicacionService";

export default {
  components: {},

  name: "ListadoRendiciones",
  data() {
    return {
      verImagen: false,
      descripcion: null,
      perPage: 2,
      currentPage: 1,
      publicaciones: [],
      loading: true,
      categorias: [],
      emprendimientos: [],
      servicios: [],
      idPublicacionImagen: null,
    };
  },
  computed: {
    ...mapGetters("storeUser", ["getUserId", "getGrupos"]),
  },
  mounted() {
    this.misPublicaciones().then(() => {
      this.loading = false;
    });
  },
  methods: {
    async misPublicaciones() {
      try {
        const response = await PublicacionService.getPublicacionesUsuarios({
          idUsuario: this.getUserId,
        });       
        this.publicaciones = response.data.data;
      } catch (err) {
        this.$bvToast.toast(
          `No se pudo obtener el listado de publicaciones, actualiza la pagina o vuelva a intentarlo`,
          {
            title: err.response.data,
            toaster: "b-toaster-top-center",
            solid: true,
            variant: "danger",
          }
        );
      }
    },
    eliminar(publicacion) {
      var opcion = confirm("Esta seguro que desea borrar la publicacion?");
      if (opcion) {
        this.eliminarPublicacion(publicacion);
      }
    },
    async eliminarPublicacion(publicacion){
        this.loading=true
        try {
        const response = await PublicacionService.eliminarPublicacion({
          idPublicacion: publicacion.id,
          tipo:publicacion.tipo
        });
        if ( response.data.error == false){
           this.misPublicaciones()
          this.$root.$bvToast.toast(
                   response.data.data,
              {
                title: "Atencion!",
                toaster: "b-toaster-top-center succes",
                solid: true,
                variant: "success",
              }
            );
          this.loading = response.data.error;  
        }    
       } catch (err) {
        this.$bvToast.toast(
          `No se pudo eliminar la publicacion,por favor intente en un momento`,
          {
            title: err.response.data,
            toaster: "b-toaster-top-center",
            solid: true,
            variant: "danger",
          }
        );
      }
    }
  },
};
</script>

<style>
</style>
       