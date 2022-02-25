<template>
  <div>
    <b-row class="pb-2">
      <b-col class="text-center pt-3">
        <p class="h3 text-center">
          <strong class="parrafoCategorias">
            Crear Publicidad</strong
          >
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
   
    <b-container class="pb-3">
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
    </b-container>
  </div>
</template>


<script>
import AuthenticationService from "@/services/AuthenticationService";
import PublicidadService from "@/services/PublicidadService";
//import RubroService from "@/services/RubroService";

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
      loading: false,   
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
  computed: {

  },

  mounted() {
    axios
      .all([])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

