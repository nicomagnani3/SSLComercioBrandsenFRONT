<template>
  <b-container>
    <div>
      <b-row class="pb-2">
        <b-col class="text-center pt-3">
          <p class="h3 text-center">Elige las Imagenes del producto</p>
        </b-col>
      </b-row>
      <ValidationObserver ref="altaImagenes">
        <transition
          v-for="(value, index) in this.imagenes"
          :key="index"
          name="fade"
        >
          <b-card no-body class="mb-3 p-0">
            <b-row no-gutters>
              <b-col cols="12" sm="6" md="4" lg="2">
                <div v-if="value.loadingImg" class="py-5 text-center"></div>
                <b-card-img
                  :src="
                    value.url == null
                      ? 'https://picsum.photos/400/400/?image=20'
                      : value.url
                  "
                  v-else
                  class="rounded-0"
                ></b-card-img>
              </b-col>
              <b-col cols="12" sm="6" md="8" lg="10">
                <b-card-body class="p-3">
                  <b-card-text>
                    <b-button
                      class="cancel-button"
                      size="sm"
                      @click="quitarImagen(value)"
                      variant="outline-secondary"
                      v-if="!value.obligatorio"
                    >
                      <b-icon icon="x-square" aria-hidden="true"></b-icon>
                    </b-button>
                    <b-row>
                      <b-col md="8" class="mt-2 mt-md-0">
                        <b-form-group
                          id="archivo-label"
                          label="Imagen"
                          label-for="documento"
                        >
                          <ValidationProvider
                            :name="'archivo' + index"
                            :rules="'required'"
                            v-slot="{ errors, valid }"
                          >
                            <b-form-file
                              v-model="value.file"
                              size="sm"
                              accept="image/jpeg"
                              :state="
                                errors[0]
                                  ? valid && value.file && value.url
                                    ? true
                                    : false
                                  : null
                              "
                              placeholder="Seleccione una imagen..."
                              browse-text="Examinar"
                              @change="upAws($event, value)"
                            ></b-form-file>
                            <b-form-invalid-feedback
                              v-for="error in errors"
                              :key="error.key"
                              >{{ error }}</b-form-invalid-feedback
                            >
                          </ValidationProvider>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </transition>
      </ValidationObserver>
      <b-col class="text-center">
        <b-button
          pill
          left
          v-if="this.cantImagenesAsubir <= 3"
          @click="agregarImagen"
          variant="primary"
          >Nueva
        </b-button>
      </b-col>
      <b-row>
        <b-col class="text-right">
          <b-button
            size="sm"
            v-if="edicion"
            @click="addAllImagnes()"
            variant="outline-success"
          >
            Guardar
          </b-button>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>
<script>
export default {
  name: "ImagenesCarga",
  props: {
    imagenes: {
      type: Array,
      default: () => ({
        id: 0,
        url: "https://picsum.photos/400/400/?image=20",
        file: null,
        tipo:null,
        loadingImg: false,
        estado: 1,
        key: 0,
        obligatorio: true,
        base64:''
      }),
    },
    edicion: {
      type: Boolean,
      default: false,
    },  
  },
  data() {
    return {
      url: null,
      loading: false,
      loadingImg: false,
      cantImagenesAsubir: 0,
    };
  },
  computed: {
    tiposSelect() {
      let t = this.tipoImagen.map((e) => ({
        value: e.clave,
        text: e.descripcion,
      }));
      t.push({ value: null, text: "-- Seleccione un Tipo --", disabled: true });
      return t;
    },
  },
  created() {},

  methods: {
    upAws(event, img) {  
      const file = event.target.files[0];
      img.url = URL.createObjectURL(file);
      this.createBase64Image(file,img);
    },
    createBase64Image(file,img) {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.base64=e.target.result       
      };
      reader.readAsDataURL(file);
    },
    close() {
      this.$emit("cancelar", false);
    },
    agregarImagen() {
      this.cantImagenesAsubir++;
      this.imagenes.push({
        borrado: 0,
        id: 0,
        estado: 1,
        loadingImg: false,
        url: null,
        file: null,
        obligatorio: false,
      });
    },
    addAllImagnes() {
      this.addimagenes().then(() => {});
    },

    async addimagenes() {
      let valid = await this.validate();

      if (valid) {
        this.imagenes.forEach((i) => {
          this.addImagen(i);
        });
        this.$emit("cancelar", false);
      }
    },

    async validate() {
      if (!this.loadingImg && !this.loading) {
        let result = await this.$refs.altaImagenes.validate();
        return result;
      } else {
        return false;
      }
    },

    async addImagen(imagen) {
      /*  try {
        await ProfesionalesService.setFArchivosProfesionales(imagen);
      } catch (err) {
        this.$parent.addToast({
          title: "Error " + err.response.data.error.code,
          message: err.response.data.error.message || "Error",
          variant: "danger"
        });
      } */
      console.log(imagen);
    },

    existeId(value) {
      if (value.id == 0) {
        return "required";
      }
      return "";
    },

    quitarImagen(imagen) {
      let confirmacion = confirm(
        "¿Esta seguro que desea eliminar esta imagen?"
      );
      if (confirmacion) {
        let index = this.imagenes.indexOf(imagen);
        if (index > -1) {
          this.imagenes.splice(index, 1);
          this.cantImagenesAsubir--;
        }
      } else if (confirmacion) {
        imagen.estado = 0;
      }
    },

    loadimg(event, data) {
      //var reader = new FileReader();
      data.url = event.target.files[0];
      //reader.onload = e => {
      //  data.url = e.target.result;
      //};
      //reader.readAsDataURL(file);
    },
  },
};
</script>

<style>
.profesional {
  border-radius: 15px 15px 15px 15px;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.75);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>