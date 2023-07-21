<template>
  <div>
    <br />
    <div class="col-sm-10 col-lg-12 col-xl-8 mx-auto position-static">
      <div>
        <div class="card position-static form-group rounded-4">
          <div class="card-body px-3 pb-0">
            <div class="card-title" style="line-height: 2">
              <div class="text-center mt-2">
                <h2 class="card-title">Administrar Datos Útiles</h2>
              </div>
              <br />

              <b-container class="pb-3">
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
                      Cambiar imagen
                    </b-button>
                  </template>
                </b-table>
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
                        <b-form-invalid-feedback
                          v-for="error in errors"
                          :key="error.key"
                        >
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import PublicacionService from "@/services/PublicacionService";
import swal from "sweetalert";

import "vue-select/dist/vue-select.css";
//import PublicacionService from "@/services/PublicacionService";
import axios from "axios";
export default {
  props: {},
  data() {
    return {
      guia: [],
      loading: true,
      utilidades: [],
      urlImagenUtilidad: null,
      idImagenChange: null,
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
    async getUtilidades() {
      try {
        const response = await PublicacionService.getUtilidades();

        //this.utilidades = response.data.data;
        this.utilidades = response.data.data.filter(
          (c) => c.imagenprincipal == null
        );
        this.totalRows = this.utilidades.length;
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
          swal(
            "Se actualizo la imagen!",
            "se cambio la imagen en el sistema",
            "success"
          );
          this.$refs["modalImagen"].hide();
          this.getUtilidades(),
            (this.urlImagenUtilidad = null),
            (this.idImagenChange = null);
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

