<template>
  <div>
    <b-row class="pb-2">
      <b-col class="text-center pt-3">
        <p class="h3 text-center">
          <strong class="parrafoCategorias"> Crear Publicidad</strong>
        </p>
      </b-col>
    </b-row>
    <ValidationObserver ref="crearPublicidad">
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
        <b-card
          class="mb-3"
          header="Crear una nueva publicidad al banner "
          border-variant="success"
          header-border-variant="success"
          header-bg-variant="transparent"
        >
          <b-row>
            <b-col lg="8" md="6">
              <b-form-group
                id="URL-label"
                label="URL de la imagen:"
                label-for="URL"
              >
                <ValidationProvider
                  :name="'URL '"
                  :rules="'required'"
                  v-slot="{ errors, valid }"
                >
                  <b-form-input
                    size="sm"
                    v-model="publicidad.url"
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
            <b-col lg="5" md="6">
              <b-form-group
                id="URL-label"
                label="Al hacer click acceder a  :"
                label-for="Nombre"
              >
                <ValidationProvider
                  :name="'Nombre '"
                  v-slot="{ errors, valid }"
                >
                  <b-form-input
                    size="sm"
                    v-model="publicidad.link"
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
            <b-col class="text-center">
              <br />
              <b-button
                @click="crearPublicidad()"
                type="primary"
                style="width: 274px"
                variant="success"
                >Crear
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-container>
    </ValidationObserver>
    <b-row class="pb-2">
      <b-col class="text-center pt-3">
        <p class="h3 text-center">
          <strong class="parrafoCategorias">
            Utilidades(farmacias de turno y micros)</strong
          >
        </p>
      </b-col>
    </b-row>
    <b-container class="pb-3">
      <b-card
        class="mb-3"
        header="Listado de utilidades "
        border-variant="success"
        header-border-variant="success"
        header-bg-variant="transparent"
      >
        <b-table
          class="flip-list-move"
          small
          responsive
          :items="utilidades"
          :fields="fields"
          show-empty
          empty-text="NO HAY DATOS"
        >
          <!-- @row-selected="onRowSelected" -->
          <div slot="table-busy" class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Cargando...</strong>
          </div>
          <template v-slot:cell(imagen)="row">
            <img :src="row.item.imagen" height="200px" />
          </template>
          <template v-slot:cell(accion)="row">
            <b-button
              id="btnConsentimiento"
              variant="outline-primary"
              @click="cambiarImg(row.item.id)"
              title="Cambiar Imagen"
            >
              Cambiar
            </b-button>
          </template>
        </b-table>
      </b-card>
    </b-container>

    <!-- <b-container class="pb-3">
      <b-card
        class="mb-3"
        header="Eliminar de la guia comercial"
        border-variant="danger"
        header-border-variant="danger"
        header-bg-variant="transparent"
      >
        <b-row>
          <b-col lg="8" md="6">
            <b-form-group
              id="Nombrecomercio"
              label="Nombre del comercio:"
              label-for="Nombrecomercio"
            >
              <ValidationProvider
                :name="'Nombrecomercio '"
                v-slot="{ errors, valid }"
              >
                    <v-select
                      placeholder="--Seleccione la guia a borrar--"
                      :options="foptionsguia"
                      :value="nombreComercio"
                      v-model="nombreComercio"
                      responsive="sm"
                      size="sm"
                      :required="!nombreComercio"
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
    </b-container> -->
    <div class="modalImagen">
      <b-modal
        ref="modalImagen"
        class="modalImagen"
        hide-footer
        style="color: #ffce4e"
        size="400"
        title="Ingrese la url de la imagen"
      >
        <b-col lg="12" md="8">
          <b-form-group
            id="URL-label"
            label="URL de la imagen:"
            label-for="URL"
          >
            <ValidationProvider
              :name="'URL '"
              :rules="'required'"
              v-slot="{ errors, valid }"
            >
              <b-form-input
                size="sm"
                v-model="urlImagenUtilidad"
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-input>
              <b-form-invalid-feedback v-for="error in errors" :key="error.key">
                {{ error }}
              </b-form-invalid-feedback>
            </ValidationProvider>
          </b-form-group>
        </b-col>
        <b-row>
          <b-col class="text-center">
            <br />
            <b-button
              @click="cambiarImagen()"
              type="primary"
              style="width: 274px"
              variant="success"
              >Guardar
            </b-button>
          </b-col>
        </b-row>
      </b-modal>
    </div>
  </div>
</template>


<script>
import AuthenticationService from "@/services/AuthenticationService";
import PublicidadService from "@/services/PublicidadService";
import PublicacionService from "@/services/PublicacionService";

import "vue-select/dist/vue-select.css";
//import PublicacionService from "@/services/PublicacionService";
import axios from "axios";
export default {
  props: {},
  data() {
    return {
      publicidad: [],
      guia: [],
      alerts: [],
      perPage: 20,
      currentPage: 10,
      filter: null,
      loading: true,
      utilidades: [],
      urlImagenUtilidad: null,
      idImagenChange: null,
      currentPagePaginate: 1,
      totalRows: 0,
      fields: [
        { key: "id", label: "ID", class: "text-center p2" },
        { key: "nombre", label: "Nombre", class: "text-left p2" },
        { key: "imagen", label: "Imagen", class: "text-left p2" },

        { key: "accion", label: "Acciones", class: "text-left p2" },
      ],
    };
  },
  methods: {
    async getEmpresas() {
      this.loading = true;
      try {
        const response = await AuthenticationService.getEmpresas();
        this.empresas = response.data.data;
        this.empresas = this.ordenarDatos(this.empresas);
      } catch (err) {
        this.empresas = "ATENCION NO SE PUDIERON OBTENER LAS EMPRESAS";
        this.loading = true;
      } finally {
        this.loading = false;
      }
    },

    limpiarCampos() {
      this.empresaNueva.link = "";
      this.empresaNueva.url = "";
    },
    async getUtilidades() {
      try {
        const response = await PublicacionService.getUtilidades();
        console.log(response);
        this.utilidades = response.data.data;
        this.totalRows = this.utilidades.length;
        console.log(this.utilidades);
      } catch (err) {
        this.$bvToast.toast(err.response.data.message, {
          title: "Atencion!",
          toaster: "b-toaster-top-center",
          solid: true,
          variant: "danger",
        });
      }
    },
    cambiarImg(id) {
      console.log(id);
      this.idImagenChange = id;
      this.$refs["modalImagen"].show();
    },
    async cambiarImagen() {
      try {
        const response = await PublicacionService.cambiarImagenUtilidades({
          id: this.idImagenChange,
          url: this.urlImagenUtilidad,
        });
        if (response.data.error == false) {
          this.$root.$bvToast.toast("Se cambio la imagen con exito", {
            title: "Atencion!",
            toaster: "b-toaster-top-center",
            solid: true,
            variant: "success",
          });
          this.$refs["modalImagen"].hide();
          this.getUtilidades(),
          (this.urlImagenUtilidad = null), (this.idImagenChange = null);
        }
        console.log(response);
      } catch (err) {
        this.$bvToast.toast(err.response.data.message, {
          title: "Atencion!",
          toaster: "b-toaster-top-center",
          solid: true,
          variant: "danger",
        });
      }
    },

    async crearPublicidad() {
      let result = await this.$refs.crearPublicidad.validate();
      if (result) {
        this.mostrarAlertEmpresa = false;
        try {
          const response = await PublicidadService.addGuiaComercial({
            nombre: this.empresaNueva.nombre,
            imagen: this.empresaNueva.url,
            observaciones: this.empresaNueva.observaciones,
            idEmpresa:
              this.empresaSelected == null ? null : this.empresaSelected.id,
            idRubro: this.rubroSelected == null ? null : this.rubroSelected.id,
          });
          if (response.data.error == false) {
            this.$root.$bvToast.toast(
              "Se creo con exito la publicacion en la guia comercial",
              {
                title: "Atencion!",
                toaster: "b-toaster-top-center",
                solid: true,
                variant: "success",
              }
            );
            this.limpiarCampos();
          }
        } catch (error) {
          this.$bvToast.toast(`No se pudo crear la publicacion`, {
            title: error.response.data,
            toaster: "b-toaster-top-center",
            solid: true,
            variant: "danger",
          });
        }
      } else {
        this.mostrarAlertEmpresa = true;
        this.mostrarAlertrubro = true;
      }
    },
  },
  computed: {},

  mounted() {
    axios
      .all([this.getUtilidades()])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

