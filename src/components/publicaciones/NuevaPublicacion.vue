<template>
  <div v-if="loading" class="text-center">
    <span class="text-danger">
      <b>Cargando</b>
    </span>
    <b-spinner variant="primary" label="Text Centered"></b-spinner>
  </div>
  <div v-else>
    <form-wizard
      @on-complete="onComplete"
      title="Mercado Local te simplifica las cosas"
      subtitle="Elegi lo que quieras publicar en unos simples pasos"
      back-button-text="Volver!"
      next-button-text="Siguiente!"
      finish-button-text="Finalizar"
      color="#fff159"
    >
      <b-col  v-if="creando" class="text-center">
        <div>
          <b-spinner
            style="width: 5rem; height: 5rem"
            variant="warning"
            label="Text Centered"
            type="grow"
          ></b-spinner>
          <span style="font-size: 24px" class="text-warning">
            <b>Creando publicacion,aguarde un instante....</b>
          </span>
          <b-spinner
            style="width: 3rem; height: 3rem"
            variant="warning"
            label="Text Centered"
          ></b-spinner>
          <b-spinner
            style="width: 3rem; height: 3rem"
            variant="warning"
            label="Text Centered"
            type="variant"
          ></b-spinner>
        </div>
      </b-col>

      <tab-content title="¡Hola! Antes que nada contanos,¿qué vas a publicar?">
        <ListarCategorias
          :categorias="this.categorias"
          @update-categoria="update"
        ></ListarCategorias>
      </tab-content>
      <tab-content title="¿Qué necesitas publicar?">
        <ListarCategoriasHijas
          :categoriasHijas="this.categoriaHijaElegida"
          @update-categoria="updateCategoriaHija"
        ></ListarCategoriasHijas>
      </tab-content>
      <tab-content title="Imagenes">
        <ImagenesCarga :imagenes="imagenes" :imgPrimera="imgPrimera">
        </ImagenesCarga>
      </tab-content>
      <tab-content title="Ultimos detalles">
        <div>
          <b-row class="pb-2">
            <b-col class="text-center pt-3">
              <p class="h3 text-center">Detalles de tu publicacion</p>
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
              <!--    <b-card class="mb-3" header="Publicacion"> -->
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
              <!--        </b-card> -->
            </b-container>
          </ValidationObserver>
        </div>
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import PublicacionService from "@/services/PublicacionService";
import { mapGetters } from "vuex";
import axios from "axios";
import CategoriasService from "@/services/CategoriasService";
import ListarCategorias from "@/components/categorias/ListarCategorias.vue";
import ListarCategoriasHijas from "@/components/categorias/ListarCategoriasHijas.vue";
//import ListarProductos from "@/components/producto/ListarProducto.vue";
import ImagenesCarga from "@/components/imagenes/ImagenesCarga.vue";

export default {
  name: "nuevaPublicacion",
  components: {
    ListarCategorias,
    ListarCategoriasHijas,
    ImagenesCarga,
    /* ListarProductos, */
  },
  data() {
    return {
      categorias: [],
      categoriaSeleccionada: null,
      categoriasHijas: [],
      categoriaHijaElegida: [],
      categoriaHijaSeleccionada: null,
      loading: true,
      publicacion: {
        titulo: null,
        precio: 0,
        fecha: new Date().toISOString().slice(0, 10),
        observaciones: null,
      },
      alerts: [],
      montoEntregaInvalido: false,
      imagenes: [],
      imgPrimera: [],
      creando: false,
    };
  },
  computed: {
    ...mapGetters("storeUser", ["getUserId"]),
  },
  methods: {
    async onComplete() {
      const valid = await this.validate();
      if (valid) {
        this.creando = true;
        try {
          const response = await PublicacionService.addPublicacion({
            titulo: this.publicacion.titulo,
            importe: this.publicacion.precio,
            fecha: this.publicacion.fecha,
            observaciones: this.publicacion.observaciones,
            imagenes: this.imagenes,
            imgPrimera: this.imgPrimera.base64,
            categoria: this.categoriaSeleccionada,
            categoriasHija: this.categoriaHijaSeleccionada,
            usuarioID: this.getUserId,
          });

          this.$root.$bvToast.toast(`Usted a creado una publicacion`, {
            title: response.data.data,
            toaster: "b-toaster-top-center succes",
            solid: true,
            variant: "success",
          });
          this.$router.push({ name: "/Home" });
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
    updateCategoriaHija(categoriaHija) {
      this.categoriaHijaSeleccionada = categoriaHija[0].id;
    },
    update(categoria) {
      this.categoriaSeleccionada = categoria[0].id;
      this.categoriaHijaElegida = this.categoriasHijas.filter(
        (c) => c.idPadre == categoria[0].id
      );
      this.categoriaHijaElegida = this.ordenarDatos(this.categoriaHijaElegida);
    },
    ordenarDatos(categoria) {
      return categoria.sort(function (a, b) {
        if (a.nombre > b.nombre) {
          return 1;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        return 0;
      });
    },
    async getcategorias() {
      try {
        const response = await CategoriasService.getCategorias();
        this.categorias = response.data.data;
        this.categorias = this.ordenarDatos(this.categorias);
      } catch (err) {
        this.categorias = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
      }
    },
    async getcategoriasHijas() {
      try {
        const response = await CategoriasService.getcategoriasHijas();
        this.categoriasHijas = response.data.data;
      } catch (err) {
        this.categorias = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
      }
    },
    async validate() {
      let result = await this.$refs.nuevaPublicacion.validate();
      if (result == true) {
        if (Number(this.publicacion.precio) <= 10) {
          this.montoEntregaInvalido = true;
          return false;
        }
      }
      return result;
    },
    actualizarMontoEntrega() {
      this.montoEntregaInvalido = false;
    },
  },
  mounted() {
    axios
      .all([this.getcategorias(), this.getcategoriasHijas()])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
