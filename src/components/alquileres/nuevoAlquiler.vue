<template>
  <div>
    <div class="body">
      <div fluid class="categoria">
        <b-row class="pb-3">
          <b-col class="text-center pt-3">
            <p class="h1 font-britannic text">
              <strong class="parrafoCategorias">Publicar propiedad</strong>
            </p>
          </b-col>
        </b-row>
      </div>
    </div>
    <div class="col-sm-10 col-lg-12 col-xl-12 mx-auto position-static">
      <div>
        <div class="card position-static form-group rounded-4">
          <div class="card-body px-3 pb-0">
            <div class="card-title" style="line-height: 2">
              <div class="text-left mt-2"></div>
              <b-row>
                <b-col>
                  <ValidationObserver ref="detallePublicacion">
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
                        header="Datos de la propiedad"
                        border-variant="success"
                        header-border-variant="success"
                        header-bg-variant="transparent"
                      >
                        <b-row>
                          <b-col md="6">
                            <b-form-group
                              id="propiedad-label"
                              label="Tipo de propiedad:"
                              label-for="Propiedad"
                            >
                              <ValidationProvider
                                :name="'Propiedad '"
                                :rules="'required'"
                                v-slot="{ errors, valid }"
                              >
                                <b-form-select
                                  v-model="Propiedadseleccionada"
                                  responsive="sm"
                                  size="sm"
                                  required
                                  :options="optionPropiedad"
                                  :state="
                                    errors[0] ? false : valid ? true : null
                                  "
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
                          <b-col md="6">
                            <b-form-group
                              id="operacio-label"
                              label="Operación:"
                              label-for="operacio"
                            >
                              <ValidationProvider
                                :name="'operacio '"
                                :rules="'required'"
                                v-slot="{ errors, valid }"
                              >
                                <b-form-select
                                  v-model="operacionSeleccionada"
                                  responsive="sm"
                                  size="sm"
                                  required
                                  :options="optionOperacion"
                                  :state="
                                    errors[0] ? false : valid ? true : null
                                  "
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
                        <b-row>
                          <b-col lg="12" md="8">
                            <b-form-group
                              id="ubicacion-label"
                              label="Ubicacion (seleccione en el mapa):"
                              label-for="Ubicacion"
                            ></b-form-group>
                            <l-map
                              style="height: 50vh"
                              :zoom="zoom"
                              :center="center"
                              @click="addMarker"
                            >
                              <l-tile-layer
                                :url="url"
                                :attribution="attribution"
                              ></l-tile-layer>
                              <l-marker :lat-lng="coordinates">
                                <l-icon
                                  icon-url="https://res.cloudinary.com/malambo/image/upload/v1657681219/location-pin_n8bqao.png"
                              /></l-marker>
                            </l-map>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col cols="12">
                            <br />
                            <b-form-group
                              class="mb-0"
                              id="observaciones-label"
                              label="Descripción(podes ingresar todo los datos que necesites mostrar)"
                              label-for="observaciones"
                            >
                              <ValidationProvider
                                :name="'TipoPublicacion '"
                                v-slot="{ errors, valid }"
                              >
                                <b-form-textarea
                                  id="observaciones"
                                  :state="
                                    errors[0] ? false : valid ? true : null
                                  "
                                  size="sm"
                                  rows="8"
                                  v-model="observaciones"
                                  placeholder="Descripcion de la propiedad que vas a publicar,se recomienda en forma de listado y no todo junto para una mejor visualizacion"
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
                      </b-card>
                    </b-container>
                  </ValidationObserver>
                </b-col>
                <b-col>
                  <ImagenesCarga
                    ref="altaImagenes"
                    :imagenes="this.imagenes"
                    :imgPrimera="this.imgPrimera"
                  >
                  </ImagenesCarga>
                </b-col>
              </b-row>
              <b-container class="bv-example-row">
                <b-col>
                  <b-alert show variant="danger" v-if="imgvacia"
                    >La imagen principal es obligatoria</b-alert
                  >
                  <b-form-group class="text-center">
                    <b-button
                      @click="publicarPropiedad"
                      variant="success"
                      v-if="!presionoCrear"
                      >Publicar propiedad
                    </b-button>
                    <div class="text-center" v-if="presionoCrear">
                      <b-spinner
                        variant="warning"
                        label="Text Centered"
                      ></b-spinner>
                    </div> </b-form-group
                ></b-col>
              </b-container>
              <div class="modalLogin">
                <b-modal ref="modalLogin" hide-footer>
                  <Login
                    :desdePublicacion="true"
                    @okLoginPublicacion="okLoginPublicacion()"
                  ></Login>
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
import ImagenesCarga from "@/components/imagenes/ImagenesCarga.vue";
import { LMap, LMarker, LTileLayer } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import { LIcon } from "vue2-leaflet";
import { mapGetters } from "vuex";
import Login from "@/components/Inicio/Login.vue";
import PublicacionService from "@/services/PublicacionService";
import swal from "sweetalert";

export default {
  components: {
    ImagenesCarga,
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    Login,
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [-35.765824, -58.497529],
      coordinates: ["", ""],
      imgvacia: false,
      alerts: [],
      imagenes: [],
      observaciones: "",
      operacionSeleccionada: "Alquiler",
      presionoCrear: false,
      optionOperacion: [
        { value: "Alquiler", text: "Alquiler" },
        { value: "Venta", text: "Venta" },
        { value: "Alquiler Temporario", text: "Alquiler Temporario" },
      ],
      Propiedadseleccionada: "Departamento",
      optionPropiedad: [
        { value: "Departamento", text: "Departamento" },
        { value: "Cabaña", text: "Cabaña" },
        { value: "Campo", text: "Campo" },
        { value: "Casa", text: "Casa" },
        { value: "Casa en Country", text: "Casa en Country" },
        { value: "Casa quinta", text: "Casa quinta" },
        { value: "Chacras", text: "Chacras" },
        { value: "Chalet", text: "Chalet" },
        { value: "Cochera", text: "Cochera" },
        { value: "Deposito", text: "Deposito" },
        { value: "Duplex", text: "Duplex" },
        { value: "Edificio", text: "Edificio" },
        { value: "Fincas", text: "Fincas" },
        { value: "Fondo de Comercio", text: "Fondo de Comercio" },
        { value: "Galpon", text: "Galpon" },
        { value: "Industriales", text: "Industriales" },
        { value: "Local", text: "Local" },
        { value: "Lote", text: "Lote" },
        { value: "Oficina", text: "Oficina" },
        { value: "Otros", text: "Otros" },
        { value: "PH", text: "PH" },
        { value: "Piso", text: "Piso" },
        { value: "Terreno", text: "Terreno" },
        { value: "Tambos", text: "Tambos" },
      ],
      imgPrimera: [
        {
          id: 0,
          url: "https://i.pinimg.com/originals/ad/53/64/ad53643d33b99130bc99e04d19857e39.png",
          file: null,
          tipo: null,
          loadingImg: false,
          estado: 1,
          key: 0,
          obligatorio: true,
          base64: "",
          primera: false,
        },
      ],
    };
  },
  computed: {
    ...mapGetters("storeUser", ["getUserId"]),
  },
  methods: {
    addMarker(event) {
      console.log(event);
      this.coordinates = event.latlng;
    },
    async validate() {
      let result = await this.$refs.detallePublicacion.validate();
      return result;
    },
    async publicarPropiedad() {
      try {
        this.imgvacia = false;
        if (this.getUserId == null) {
          this.$refs["modalLogin"].show();
        } else {
          if (this.imgPrimera[0].base64 == "") {
            this.imgvacia = true;
          } else {
            this.presionoCrear = false;
            if (this.coordinates.length == 2) {
              this.coordinates = "";
            }
            const response = await PublicacionService.addAlquiler({
              propiedad: this.Propiedadseleccionada,
              operacion: this.operacionSeleccionada,
              observaciones: this.observaciones,
              imagenes: this.imagenes,
              imgPrimera: this.imgPrimera[0].base64,
              usuarioID: this.getUserId,
              cordenadas: this.coordinates,
            });
            console.log(response);
            if (response.data.code == 200) {
              swal(
                "¡Propiedad creada!",
                "Se publico con exito la propiedad y se encuentra disponible en la sección de propiedades ",
                "success"
              );
              this.$router.push({
                name: "alquileres",
              });
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    okLoginPublicacion() {
      this.$refs["modalLogin"].hide();
      this.publicarPropiedad();
    },
  },
};
</script>

