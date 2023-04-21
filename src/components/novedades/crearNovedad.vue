<template>
  <div>
      <ValidationObserver ref="crearPublicidad">
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
        <b-card
          class="mb-3"
          header="Novedades de la semana"
          border-variant="success"
          header-border-variant="success"
          header-bg-variant="transparent"
        >
          <div>
            <b-row>
              <b-col lg="5" md="6">
                <b-form-group
                  id="Nombre-label"
                  label="Nombre (aparecera en el encabezado):"
                  label-for="Nombre"
                >
                  <ValidationProvider
                    :name="'Nombre '"
                    :rules="'required'"
                    v-slot="{ errors, valid }"
                  >
                    <b-form-input
                      size="sm"
                      v-model="empresaNueva.nombre"
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
              <b-col md="8">
                <b-form-group
                  id="Guia-label"
                  label="Guia comercial :"
                  label-for="Guia"
                >
                  <ValidationProvider v-slot="{ errors, valid }">
                    <v-select
                      placeholder="--Seleccione si ya esta en la guia comercial--"
                      :options="foptionsguia"
                      :value="guiaSelected"
                      v-model="guiaSelected"
                      responsive="sm"
                      size="sm"
                      :searchable="true"
                      language="en-US"
                      :state="errors[0] ? false : valid ? true : null"
                    ></v-select>
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
          </div>

          <b-row>
            <b-col lg="8" md="6">
              <b-form-group
                id="URL-label"
                label="URL de la imagen (tamaño 350x250):"
                label-for="URL"
              >
                <ValidationProvider
                  :name="'URL '"
                  :rules="'required'"
                  v-slot="{ errors, valid }"
                >
                  <b-form-input
                    size="sm"
                    v-model="empresaNueva.url"
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
          </b-row>

          <b-row>
            <b-col cols="12">
              <b-form-group
                class="mb-0"
                id="observaciones-label"
                label="Descripción"
                label-for="observaciones"
              >
                <ValidationProvider
                  :name="'Descripción '"
                  v-slot="{ errors, valid }"
                  :rules="'required'"
                >
                  <b-form-textarea
                    id="observaciones"
                    :state="errors[0] ? false : valid ? true : null"
                    size="sm"
                    rows="8"
                    v-model="empresaNueva.observaciones"
                    placeholder="Descripcion, debe ser una descripcion breve de no mas de 15 palabras "
                  ></b-form-textarea>
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
            <b-col class="text-center">
              <br />
              <b-button
                @click="crearPublicidad()"
                type="primary"
                style="width: 274px"
                variant="success"
                >Agregar Novedad
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </ValidationObserver>
  
      <b-card
        class="mb-3"
        header="Eliminar novedad"
        border-variant="danger"
        header-border-variant="danger"
        header-bg-variant="transparent"
      >
        <b-row>
          <b-col lg="8" md="6">
            <b-form-group
              id="Nombrecomercio"
              label="Nombre de novedad:"
              label-for="Nombrecomercio"
            >
              <ValidationProvider
                :name="'Nombrecomercio '"
                v-slot="{ errors, valid }"
              >
                <v-select
                  placeholder="--Seleccione la novedad a borrar--"
                  :options="foptionsnovedades"
                  :value="nombrenovedad"
                  v-model="nombrenovedad"
                  responsive="sm"
                  size="sm"
                  :required="!nombrenovedad"
                  :searchable="true"
                  language="en-US"
                  :state="errors[0] ? false : valid ? true : null"
                ></v-select>
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
          <b-col class="text-center">
            <br />
            <b-button
              @click="EliminarGuia()"
              type="primary"
              style="width: 274px"
              variant="danger"
              >Eliminar
            </b-button>
          </b-col>
        </b-row>
      </b-card>
    </div>
</template>


<script>
import PublicidadService from "@/services/PublicidadService";
import swal from "sweetalert";

import "vue-select/dist/vue-select.css";
import axios from "axios";
export default {
  props: {},
  data() {
    return {
      empresaNueva: [],
      guiaComercial: [],
      novedades: [],
      guiaSelected: null,
      nombrenovedad: null,
      alerts: [],
      loading: false,
    };
  },
  methods: {
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
    limpiarCampos() {
      this.empresaNueva.nombre = "";
      this.empresaNueva.url = "";
      this.empresaNueva.observaciones = "";
      this.guiaSelected = null;
    },
    async getGuiaComercial() {
      this.loading = true;
      try {
        const response = await PublicidadService.getGuiaComercial();
        this.guiaComercial = response.data.data;
        this.guiaComercial = this.ordenarDatos(this.guiaComercial);
      } catch (err) {
        this.guiaComercial = "ATENCION NO SE PUDIERON OBTENER LOS RUBROS";
      } finally {
        this.loading = false;
      }
    },
    async crearPublicidad() {
      let result = await this.$refs.crearPublicidad.validate();
      if (result) {
        try {
          const response = await PublicidadService.addNovedad({
            nombre: this.empresaNueva.nombre,
            imagen: this.empresaNueva.url,
            observaciones: this.empresaNueva.observaciones,
            idGuia: this.guiaSelected == null ? null : this.guiaSelected.id,
          });
          if (response.data.error == false) {
            swal(
            "¡Tu novedad ha sido creada con éxito!",
            "Novedad Creada!",
            "success"
          ).then(() => {
            this.limpiarCampos();
          });         
          }
        } catch (error) {
          this.$bvToast.toast(`No se pudo crear la publicacion`, {
            title: error.response.data,
            toaster: "b-toaster-top-center",
            solid: true,
            variant: "danger",
          });
        }
      }
    },
    async getNovedad() {
      this.loading = true;
      try {
        const response = await PublicidadService.getNovedad();
        this.novedades = response.data.data;
        this.novedades = this.ordenarDatos(this.novedades);
      } catch (err) {
        this.guia = "ATENCION NO SE PUDIERON OBTENER LAS GUIAS";
        this.loading = true;
      } finally {
        this.loading = false;
      }
    },
    async EliminarGuia() {
      if (this.nombrenovedad != null) {
        try {
          const response = await PublicidadService.eliminarNovedad({
            id: this.nombrenovedad.id,
          });
          if (response.data.error == false) {
            swal(
            "¡La novedad ha sido eliminada con éxito!",
            "Novedad Eliminada!",
            "success"
          ).then(() => {
            location.reload()
          });
          }
        } catch (error) {
          this.$bvToast.toast(`No se pudo eliminar novedad`, {
            title: error.response.data,
            toaster: "b-toaster-top-center",
            solid: true,
            variant: "danger",
          });
        }
      }
    },
  },
  computed: {
    foptionsnovedades() {
      let mc = this.novedades.map((e) => ({
        id: e.id,
        label: e.nombre,
      }));
      return mc;
    },
    foptionsguia() {
      let mc = this.guiaComercial.map((e) => ({
        id: e.id,
        label: e.nombre,
      }));
      return mc;
    },
  },

  mounted() {
    axios
      .all([this.getGuiaComercial(), this.getNovedad()])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

