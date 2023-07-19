<template>
  <div>
    <div v-if="loading" class="text-center">
      <br /><br />
      <b-spinner
        style="width: 5rem; height: 5rem"
        variant="warning"
        label="Text Centered"
      >
      </b-spinner>
    </div>
    <div v-else>
      <br />
      <div class="col-sm-12 col-lg-12 col-xl-11 mx-auto position-static">
        <div>
          <div class="card position-static form-group rounded-4">
            <div class="card-body px-3 pb-0">
              <div class="card-title" style="line-height: 2">
                <div class="text-center mt-2">
                  <h2 class="card-title text-primary"></h2>
                </div>
                <br />
                <b-row>
                  <b-col cols="4" md="2">
                    <img
                      src="@/assets/ubicacion_publicidades.png"
                      class="img-fluid"
                      alt="Responsive image"
                    />
                  </b-col>
                  <b-col cols="14" md="10">
                    <div class="text-center mt-2">
                      <h2 class="card-title">
                        Administrar Publicidades de la Página de Inicio
                      </h2>
                      <p>
                        Controla las publicidades de los 5 niveles de ubicación
                        en la página de inicio
                      </p>
                    </div>
                    <ValidationObserver ref="crearPublicidad">
                      <b-col lg="4" md="6">
                        <p>Nivel:</p>
                        <b-form-select
                          v-model="publicidadSeleccionada"
                          responsive="sm"
                          required
                          :options="optionsPublicidad"
                        ></b-form-select> </b-col
                      ><br />
                      <div v-if="publicidadSeleccionada == 1">
                        <ListadoPorPublicidad
                          :publicidad="publicidad1"
                          :ubicacion="1"
                        ></ListadoPorPublicidad>
                        <br />
                        <h5>
                          <b>
                            Para una correcta visualizacion deberán cargarse
                            imagenes de 250x100
                          </b>
                        </h5>
                      </div>
                      <div v-if="publicidadSeleccionada == 2">
                        <ListadoPorPublicidad
                          :publicidad="publicidad2"
                          :ubicacion="2"
                        ></ListadoPorPublicidad>
                        <!-- TODO: En la imagen de referencia son la ubicacion 4 -->
                        <h5>
                          <b>
                            Para una correcta visualizacion deberán cargarse
                            imagenes de 1600x380
                          </b>
                        </h5>
                      </div>
                      <div v-if="publicidadSeleccionada == 3">                       
                        <crear-novedad></crear-novedad>
                      </div>
                      <div v-if="publicidadSeleccionada == 4">
                        <ListadoPorPublicidad
                          :publicidad="publicidad4"
                          :ubicacion="4"
                        ></ListadoPorPublicidad>
                        <h5>
                          <br />
                          <b>
                            Para una correcta visualizacion deberán cargarse
                            imagenes de 150x200
                          </b>
                        </h5>
                      </div>
                      <div v-if="publicidadSeleccionada == 5">
                        <ListadoPorPublicidad
                          :publicidad="publicidad5"
                          :ubicacion="5"
                        ></ListadoPorPublicidad>
                        <br />
                        <h5>
                          <b>
                            Para una correcta visualizacion deberán cargarse
                            imagenes de 350x250
                          </b>
                        </h5>
                      </div>
                    </ValidationObserver>
                    <b-row v-if="publicidadSeleccionada != 3">
                      <b-col lg="8" md="6">
                        <b-form-group
                          id="URL-label"
                          label="Url de la imagen:"
                          label-for="URL"
                          description="Direccion de la imagen que almaceno en cloudinary"
                        >
                          <ValidationProvider
                            :name="'URL '"
                            :rules="'required'"
                            v-slot="{ errors, valid }"
                          >
                            <b-form-input
                              size="sm"
                              v-model="nuevaPublicidad.imagen"
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
                      <b-col lg="8" md="6">
                        <b-form-group
                          id="URL-label"
                          label="Al hacer click acceder a  :"
                          description="Al hacer click en la imagen, lo llevara al link que ingrese"
                          label-for="Nombre"
                        >
                          <ValidationProvider
                            :name="'Nombre '"
                            v-slot="{ errors, valid }"
                          >
                            <b-form-input
                              size="sm"
                              v-model="nuevaPublicidad.url"
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
                    <b-row v-if="publicidadSeleccionada != 3">
                      <b-col class="text-center">
                        <br />
                        <b-button
                          @click="crearPublicidad()"
                          type="primary"
                          style="width: 274px"
                          variant="primary"
                          >Agregar
                        </b-button>
                      </b-col>
                    </b-row></b-col
                  >
                </b-row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PublicidadService from "@/services/PublicidadService";
import ListadoPorPublicidad from "../publicidad/ListadoPorPublicidad.vue";
import swal from "sweetalert";
import CrearNovedad from '../novedades/crearNovedad.vue';

export default {
  components: { ListadoPorPublicidad, CrearNovedad },
  props: {},
  data() {
    return {
      loading: true,
      publicidad1: [],
      publicidad2: [],
      publicidad3: [],
      publicidad4: [],
      publicidad5: [],
      nuevaPublicidad: [],

      publicidadSeleccionada: "1",
      optionsPublicidad: [
        { value: "1", text: "Publicidad 1" },
        { value: "2", text: "Publicidad 2" },
        { value: "3", text: "Publicidad 3" },
        { value: "4", text: "Publicidad 4" },
        { value: "5", text: "Publicidad 5" },
      ],
    };
  },
  methods: {
    async getPublicidades() {
      try {
        const response = await PublicidadService.getPublicidades();
        if (response.data.error == false) {
          this.publicidades = response.data.data;
          this.asignarPublicidades(this.publicidades);
          console.log(this.publicidades);
        }
      } catch (err) {
        console.log(err);
        this.publicidades = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
      }
    },
    asignarPublicidades(publicidades) {
      publicidades.forEach((publicidad) => {
        if (publicidad.ubicacion == 1) {  
          this.publicidad1.push(publicidad);
        }
        if (publicidad.ubicacion == 2) {
          this.publicidad2.push(publicidad);
        }
        if (publicidad.ubicacion == 3) {
          this.publicidad3.push(publicidad);
        }
        if (publicidad.ubicacion == 4) {
          this.publicidad4.push(publicidad);
        }
        if (publicidad.ubicacion == 5) {
          this.publicidad5.push(publicidad);
        }
      });
    },
    attachmentInput(attachment, index) {
      this.$set(this.attachments, index, attachment);
    },
    recargarCampos() {
      this.publicidad1 = [];
      this.publicidad2 = [];
      this.publicidad3 = [];
      this.publicidad4 = [];
      this.publicidad5 = [];
      this.nuevaPublicidad = [];
      this.getPublicidades();
    },

    async crearPublicidad() {
      try {
        const response = await PublicidadService.addNuevaPublicidad({
          imagen: this.nuevaPublicidad.imagen,
          url: this.nuevaPublicidad.url,
          ubicacion: this.publicidadSeleccionada,
        });
        if (response.data.error == false) {
          swal(
            "Se creo con exito la publicidad!",
            "Publicidad Creada!",
            "success"
          ).then(() => {
            this.recargarCampos();
          });
        }
      } catch (error) {
        console.log(error);
        this.$bvToast.toast(`verificar el campo de la url de la imagen`, {
          title: "No se pudo crear la publicacion",
          toaster: "b-toaster-top-center",
          solid: true,
          variant: "danger",
        });
      }
    },
  },
  mounted() {
    axios
      .all([this.getPublicidades()])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>