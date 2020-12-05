<template>
  <b-container class="listarProducto">
    <div v-if="loading" class="text-center">
      <span class="text-danger"> <b> Cargando</b></span>
    </div>
    <div v-else>
        <b-row class="pb-2">
      <b-col class="text-center pt-3">
        <p class="h3 text-center">
          Ultimos detalles de tu publicacion
        </p>
      </b-col>
    </b-row>
      <ValidationObserver ref="nuevaPublicacion">
        <b-container class="pb-3">
          <b-form-group>
            <b-alert
              v-for="alert in alerts"
              dismissible
              v-bind:key="alert.key"
              show
              :variant="alert.variant"
              >{{ alert.message }}</b-alert
            >
          </b-form-group>
          <b-card class="mb-3" header="Publicacion">
            <b-row>
              <b-col lg="5" md="6">
                <b-form-group
                  id="titulo-label"
                  label="Titulo :"
                  label-for="titulo"
                >
                  <ValidationProvider
                    :name="'titulo '"
                    :rules="'required'"
                    v-slot="{ errors, valid }"
                  >
                    <b-form-input
                      size="sm"
                      v-model="publicacion.titulo"
                      :state="errors[0] ? false : valid ? true : null"
                    ></b-form-input>
                    <b-form-invalid-feedback
                      v-for="error in errors"
                      :key="error.key"
                    >
                      {{ error }}
                    </b-form-invalid-feedback>
                  </ValidationProvider>
                </b-form-group>
              </b-col>
              <b-col lg="5" md="6">
                <b-form-group
                  id="precio-label"
                  label="Precio:"
                  label-for="precio"
                >
                  <ValidationProvider
                    :name="'precio '"
                    :rules="'required'"
                    v-slot="{ errors, valid }"
                  >
                    <vue-numeric
                      style="text-align: right"
                      v-model="publicacion.precio"
                      separator="."
                      :min="0"
                      :precision="2"
                      v-on:input="actualizarMontoEntrega"
                      :state="errors[0] ? false : valid ? true : null"
                    ></vue-numeric>
                    <p
                      v-if="montoEntregaInvalido"
                      style="color: red; font-size: 10px"
                    >
                      el monto debe ser mayor
                    </p>
                  </ValidationProvider>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="5" md="6">
                <b-form-group
                  id="fecha-label"
                  label="Fecha  "
                  label-for="fecha"
                >
                  <ValidationProvider
                    name="fecha "
                    :rules="'required'"
                    v-slot="{ errors, valid }"
                  >
                    <b-form-input
                      v-model="publicacion.fecha"
                      :state="errors[0] ? false : valid ? true : null"
                      size="sm"
                      type="date"
                    >
                    </b-form-input>
                    <b-form-invalid-feedback
                      v-for="error in errors"
                      :key="error.key"
                    >
                      {{ error }}
                    </b-form-invalid-feedback>
                  </ValidationProvider>
                </b-form-group>
              </b-col>
            </b-row>         
            <b-row>
              <b-col cols="12">
                <b-form-group
                  class="mb-0"
                  id="observaciones-label"
                  label="Observaciones"
                  label-for="observaciones"
                >
                  <b-form-textarea
                    id="observaciones"
                    size="sm"
                    rows="1"
                    v-model="publicacion.observaciones"
                    placeholder="Observaciones"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
            </b-row>
          </b-card>
          <b-card class="mb-3" header="Imagenes">
            <ImagenesCarga :imagenes="imagenes"> </ImagenesCarga>
          </b-card>
        </b-container>
      </ValidationObserver>
      <!--      <b-row>
        <b-col class="text-left">
          <b-button @click="volver()" variant="outline-secondary">
            <b-icon icon="arrow-left-short"></b-icon> Volver
          </b-button>
        </b-col>
        <b-col class="text-right">
          <div v-if="!creando">
            <b-button
              type="button"
              @click="setPublicacion()"
              :disabled="creando"
              variant="primary"
            >
              Publicar
            </b-button>
          </div>
          <div v-else>
            <b-spinner variant="primary" label="Text Centered"></b-spinner>
          </div>
        </b-col>
      </b-row> -->
    </div>
  </b-container>
</template>


<script>
import PublicacionService from "@/services/PublicacionService";
//import CategoriasService from "@/services/CategoriasService";
import ImagenesCarga from "@/components/imagenes/ImagenesCarga.vue";
import { mapGetters } from "vuex";
export default {
  name: "nuevaPublicacion",
  components: {
    ImagenesCarga,
  },
  props: {
    publicacion: {
      titulo: null,
      precio: 0,
      fecha: new Date().toISOString().slice(0, 10),
      observaciones: null,
    },
  },
  data() {
    return {
      imagenes: [],
      categorias: [],
      categoriasSeleccionadas: [],
      alerts: [],
      loading: false,
      creando: false,
      montoEntregaInvalido: false,
    };
  },
  created() {},
  computed: {
    ...mapGetters("storeUser", ["getUserId"]), 
  },
  mounted() {

  },
  methods: {
    actualizarMontoEntrega() {
      this.montoEntregaInvalido = false;
    },  
    async setPublicacion() {
      const valid = await this.validate();
      console.log(this.imagenes);
      if (valid) {
        this.creando = true;
        try {
          const response = await PublicacionService.addPublicacion({
            titulo: this.publicacion.titulo,
            importe: this.publicacion.precio,
            fecha: this.publicacion.fecha,
            observaciones: this.publicacion.observaciones,
            imagenes: this.imagenes,
            categorias: this.categoriasSeleccionadas,
            usuarioID: this.getUserId,
          });

          this.$root.$bvToast.toast(`Publicacion creada `, {
            title: response.data.data,
            toaster: "b-toaster-top-center succes",
            solid: true,
            variant: "success",
          });
          this.creando = response.data.error;
          this.$router.push({ name: "listar" });
        } catch (error) {
          error.response.data.data.forEach((data) => {
            this.$bvToast.toast(`No se pudo crear la publicacion`, {
              title: data,
              toaster: "b-toaster-top-center",
              solid: true,
              variant: "danger",
            });
          });
        }
      }
    },
    validarDatos(){
        console.log("valido")
    },
    async validate() {
      if (this.loading) {
        return false;
      } else {
        let result = await this.$refs.nuevaPublicacion.validate();
        if (result == true) {
          if (Number(this.publicacion.precio) <= 10) {
            this.montoEntregaInvalido = true;
            return false;
          }
        }
        return result;
      }
    },
  },
};
</script>

