<template>
  <div>
    <br />
    <div class="col-sm-10 col-lg-12 col-xl-8 mx-auto position-static">
      <div>
        <div class="card position-static form-group rounded-4">
          <div class="card-body px-3 pb-0">
            <div class="card-title" style="line-height: 2">
              <div class="text-center mt-2">
                <h2 class="card-title">Administar Guia comercial</h2>  
                <p>Controla las publicidades y rubros de la guía comercial</p>              
              </div>
            </div>

            <br />
            <!--     <b-row class="pb-2">
      <b-col class="text-center pt-3">
        <p class="h3 text-center">
          <strong class="parrafoCategorias">
            Crear publicidad para Guia comercial</strong
          >
        </p>
      </b-col>
    </b-row> -->
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
                  header="En esta sección se puede agregar una nueva publicidad en la guia comercial"
                  border-variant="success"
                  header-border-variant="success"
                  header-bg-variant="transparent"
                >
                  <b-row>
                    <b-col md="8">
                      <b-form-group
                        id="TipoPublicacion-label"
                        label="Tipo de publicidad :"
                        label-for="TipoPublicacion"
                      >
                        <ValidationProvider
                          :name="'TipoPublicacion '"
                          :rules="'required'"
                          v-slot="{ errors, valid }"
                        >
                          <b-form-select
                            v-model="tipoSeleccionado"
                            responsive="sm"
                            size="sm"
                            required
                            :options="options"
                            :state="errors[0] ? false : valid ? true : null"
                          ></b-form-select>
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
                  <div v-if="tipoSeleccionado == 1">
                    <b-row>
                      <b-col lg="5" md="6">
                        <b-form-group
                          id="Nombre-label"
                          label="Nombre desciptivo de  empresa - comercio :"
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
                          id="rubro-label"
                          label="Rubro :"
                          label-for="rubro"
                        >
                          <ValidationProvider
                            :rules="'required'"
                            v-slot="{ errors, valid }"
                          >
                            <v-select
                              placeholder="--Seleccione el rubro al que pertence--"
                              :options="foptionsRubro"
                              :value="rubroSelected"
                              v-model="rubroSelected"
                              @input="cambiarSeleccionRubro"
                              responsive="sm"
                              size="sm"
                              :required="!rubroSelected"
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
                            <p
                              style="color: red; font-size: 10px"
                              v-if="mostrarAlertrubro"
                            >
                              Se debe seleccionar un rubro
                            </p>
                          </ValidationProvider>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </div>
                  <div v-else>
                    <b-row>
                      <b-col md="8">
                        <b-form-group
                          id="empresa-label"
                          label="Empresa - comercio :"
                          label-for="empresa"
                        >
                          <ValidationProvider
                            :rules="'required'"
                            v-slot="{ errors, valid }"
                          >
                            <v-select
                              placeholder="--Seleccione una empresa o comercio--"
                              :options="foptionsEmpresas"
                              :value="empresaSelected"
                              v-model="empresaSelected"
                              @input="cambiarSeleccion"
                              responsive="sm"
                              size="sm"
                              :required="!empresaSelected"
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
                            <p
                              style="color: red; font-size: 10px"
                              v-if="mostrarAlertEmpresa"
                            >
                              Se debe seleccionar una empresa
                            </p>
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
                            placeholder="Se recomienda un texto identado y no muy largo para una mejor apreciacion de los datos "
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
                        :required="!empresaSelected"
                        >Agregar a la guia
                      </b-button>
                    </b-col>
                  </b-row>
                </b-card>
              </b-container>
            </ValidationObserver>
            <b-container class="pb-3">
              <b-card
                class="mb-3"
                header="En esta sección se puede agregar un nuevo rubro en la guia, servira para que en la guia se pueda filtrar y ademas a las publicidades se les pueda asignar"
                border-variant="success"
                header-border-variant="success"
                header-bg-variant="transparent"
              >
                <b-row>
                  <b-col lg="8" md="6">
                    <b-form-group
                      id="NombreRubro"
                      label="Nombre del rubro:"
                      label-for="NombreRubro"
                    >
                      <ValidationProvider
                        :name="'NombreRubro '"
                        v-slot="{ errors, valid }"
                      >
                        <b-form-input
                          size="sm"
                          v-model="nombreRubro"
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
                      @click="crearRubro()"
                      type="primary"
                      style="width: 274px"
                      variant="success"
                      :required="!nombreRubro"
                      >Agregar Rubro
                    </b-button>
                  </b-col>
                </b-row>
              </b-card>
            </b-container>
            <b-container class="pb-3">
              <b-card
                class="mb-3"
                header="En esta sección se puede eliminar una publicidad de la guia comercial"
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
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import AuthenticationService from "@/services/AuthenticationService";
import PublicidadService from "@/services/PublicidadService";
import RubroService from "@/services/RubroService";

import "vue-select/dist/vue-select.css";
import PublicacionService from "@/services/PublicacionService";
import axios from "axios";
export default {
  props: {},
  data() {
    return {
      empresaNueva: [],
      rubros: [],
      guia: [],
      rubroSelected: null,
      nombreComercio: null,
      rubroNuevo: [],
      alerts: [],
      loading: false,
      montoEntregaInvalido: false,
      tipoSeleccionado: 1,
      empresaSelected: null,
      guiaSelected: null,
      mostrarAlertEmpresa: false,
      mostrarAlertrubro: false,
      nombreRubro: null,
      result2: "",
      options: [
        { value: null, text: "-- Seleccione tipo publicidad--" },
        { value: 1, text: "Publicidad nueva" },
        { value: 2, text: "Publicidad empresa existente" },
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
    cambiarSeleccion() {
      this.mostrarAlertEmpresa = false;
      this.empresaNueva.nombre = this.empresaSelected.nombre;
    },
    cambiarSeleccionRubro() {
      this.mostrarAlertrubro = false;
      this.rubroNuevo.nombre = this.rubroSelected.nombre;
    },

    limpiarCampos() {
      this.empresaNueva.nombre = "";
      this.empresaNueva.url = "";
      this.empresaNueva.observaciones = "";
      this.empresaNueva.id = "";
      this.empresaSelected = null;
      this.rubroSelected = null;
    },
    async getRubros() {
      this.loading = true;
      try {
        const response = await PublicacionService.getRubros();
        this.rubros = response.data.data;
        this.rubros = this.ordenarDatos(this.rubros);
      } catch (err) {
        this.rubros = "ATENCION NO SE PUDIERON OBTENER LOS RUBROS";
      } finally {
        this.loading = false;
      }
    },
    async crearRubro() {
      if (this.nombreRubro != null) {
        try {
          const response = await RubroService.addRubro({
            nombre: this.nombreRubro,
          });
          if (response.data.error == false) {
            this.$root.$bvToast.toast("Se creo con exito el rubro", {
              title: "Atencion!",
              toaster: "b-toaster-top-center",
              solid: true,
              variant: "success",
            });
            this.getRubros();
          }
        } catch (error) {
          this.$bvToast.toast(`No se pudo crear el rubro`, {
            title: error.response.data,
            toaster: "b-toaster-top-center",
            solid: true,
            variant: "danger",
          });
        }
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
    async getGuiaComercial() {
      this.loading = true;
      try {
        const response = await PublicidadService.getGuiaComercial();
        this.guia = response.data.data;
        this.guia = this.ordenarDatos(this.guia);
      } catch (err) {
        this.empresas = "ATENCION NO SE PUDIERON OBTENER LAS EMPRESAS";
        this.loading = true;
      } finally {
        this.loading = false;
      }
    },
    async EliminarGuia() {
      if (this.nombreComercio != null) {
        try {
          const response = await PublicidadService.eliminarGuia({
            id: this.nombreComercio.id,
          });
          if (response.data.error == false) {
            this.$root.$bvToast.toast(
              "Se elimino con exito de la guia comercial",
              {
                title: "Atencion!",
                toaster: "b-toaster-top-center",
                solid: true,
                variant: "success",
              }
            );
            this.getGuiaComercial();
          }
        } catch (error) {
          this.$bvToast.toast(`No se pudo eliminar de la guia comercial`, {
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
    foptionsEmpresas() {
      let mc = this.empresas.map((e) => ({
        id: e.id,
        label: e.nombre,
      }));
      return mc;
    },
    foptionsguia() {
      let mc = this.guia.map((e) => ({
        id: e.id,
        label: e.nombre,
      }));
      return mc;
    },
    foptionsRubro() {
      let mc = this.rubros.map((e) => ({
        id: e.id,
        label: e.nombre,
      }));
      return mc;
    },
  },

  mounted() {
    axios
      .all([this.getEmpresas(), this.getRubros(), this.getGuiaComercial()])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

