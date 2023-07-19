<template>
  <div v-if="loading" class="text-center">
    <br /><br />
    <b-spinner
      style="width: 7rem; height: 7rem"
      variant="warning"
      label="Text Centered"
    >
    </b-spinner>
  </div>
  <div v-else class="body">
    <div fluid class="categoria">
      <b-row class="pb-2">
        <b-col class="text-center pt-3">
          <br />
          <p class="h1 font-britannic text">
            <strong class="parrafoCategorias">Mis publicaciones</strong>
          </p>
        </b-col>
      </b-row>
    </div>
    <b-container fluid class="bv-example-row">
      <br />
      <b-row align-h="start">
        <b-col md="4"></b-col>
        <div v-if="publicaciones.length == 0">
          <br />
          <b-alert show variant="success">
            <h4 class="alert-heading">
              <b-icon scale="1.5" icon="exclamation" variant="info"></b-icon
              >Usted no posee publicaciones
            </h4>
            <p>
              <br />
              -Para realizar alguna publicacion acceda en el menu a la seccion
              Publicar.<br />
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
                      thumbnail
                      fluid
                      alt="Responsive image"
                      style="max-height: 196px; object-fit: contain"
                      :src="`data:image/png;base64, ${producto.imagen}`"
                      class="imagenCard"
                    ></b-card-img>
                  </b-col>
                  <b-col md="6">
                    <b-card-body>
                      <b-button variant="danger" @click="eliminar(producto)"
                        >Eliminar publicacion</b-button
                      >
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
                      <p>{{ producto.tipo }}</p>
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
import PublicacionService from "@/services/PublicacionService";
import { mapGetters, mapState } from "vuex";
import swal from "sweetalert";
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
    ...mapState("storeUser", ["grupos"]),
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
      swal({
        title: "¿Esta seguro?",
        text: "Se eliminara la publicacion del sistema!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.eliminarPublicacion(publicacion);
        }
      });
      /*  var opcion = confirm("Esta seguro que desea borrar la publicacion?");
      if (opcion) {
        this.eliminarPublicacion(publicacion);
      } */
    },
    async eliminarPublicacion(publicacion) {
      this.loading = true;
      try {
        const response = await PublicacionService.eliminarPublicacion({
          grupo: this.grupos,
          idUsuario: this.getUserId,
          idPublicacion: publicacion.id,
          tipo: publicacion.tipo,
          destacada: publicacion.destacado,
        });
        if (response.data.error == false) {
          this.misPublicaciones();
          swal("¡Publicación eliminada!", response.data.data, "success");
          this.loading = response.data.error;
        }
      } catch (err) {
        swal("¡Atencion!", "No se pudo eliminar la publicacion", "error");
      }
    },
  },
};
</script>