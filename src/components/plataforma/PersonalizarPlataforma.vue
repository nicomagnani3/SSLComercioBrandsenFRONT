<template>
  <div class="col-sm-10 col-lg-12 col-xl-12 mx-auto position-static">
    <br />
    <div>
      <div class="card position-static form-group rounded-4">
        <div class="card-body px-3 pb-0">
          <div class="card-title" style="line-height: 2">
            <div class="text-center mt-2">
              <h2>Personaliza los datos de la plataforma</h2>
              <p>Actualiza el logo,color y nombre de la plataforma</p>
            </div>
          </div>

          <ValidationObserver ref="validator">
            <b-row>
              <b-col cols="14" md="4">
                <b-form-group label="Logo:" label-for="logoInput">
                  <ValidationProvider rules="required">
                    <b-form-file
                      v-model="logo.file"
                      size="sm"
                      accept="image/png"
                      placeholder="Seleccione una imagen..."
                      browse-text="Examinar"
                      @change="upAws($event)"
                    ></b-form-file>
                  </ValidationProvider>
                  <b-form-invalid-feedback>
                    Por favor, selecciona un archivo de imagen para el logo.
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Color principal:" label-for="colorInput">
                  <ValidationProvider rules="required">
                    <input
                      v-model="traduccionesEditadas.footer.color"
                      type="color"
                      id="colorInput"
                      @change="changeColor()"
                    />
                  </ValidationProvider>
                  <b-form-invalid-feedback>
                    Por favor, selecciona un color para el fondo principal.
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
          </ValidationObserver>
          <br />
          <b-col>
            <div class="row">
              <Menu
                :daily="dailyData"
                :seven="sevenData"
                :color="traduccionesEditadas.footer.color"
                :logoPrueba="this.logo.url"
                :showPrueba="showPrueba"
                :showPruebaColor="showPruebaColor"
              />
            </div>
            <div class="row mt-3">
              <Footer
                :color="traduccionesEditadas.footer.color"
                :logoPrueba="this.logo.url"
                :showPrueba="showPrueba"
                :showPruebaColor="showPruebaColor"
              />
            </div>
          </b-col>
          <br />
          <b-col>
            <div class="text-center mt-4">
              <b-button variant="primary" @click="submitForm"
                >Guardar cambios</b-button
              >
            </div>
          </b-col>
        </div>
        <div class="card-body px-3 pb-0">
          <div class="card-title" style="line-height: 2">
            <div class="text-center mt-2">
              <h2>Actualiza los textos de la plataforma</h2>
              <p></p>
            </div>

            <b-row>
              <b-col>
                <div
                  v-for="(traduccion, index) in traducciones.footer"
                  :key="index"
                  name="fade"
                >
                  <div class="form-group row" v-if="index != 'color'">
                    <label class="col-sm-2 col-form-label">{{ index }} :</label>
                    <div class="col-sm-6">
                      <input
                        class="form-control"
                        v-model="traduccionesEditadas.footer[index]"
                        id="Nombre"
                      />
                    </div>
                  </div>
                </div>
              </b-col>
              <b-col>
                <div
                  v-for="(traduccion, index) in traducciones.publicaciones"
                  :key="index"
                  name="fade"
                >
                  <div class="form-group row" v-if="index != 'color'">
                    <label class="col-sm-2 col-form-label">{{ index }} :</label>
                    <div class="col-sm-6">
                      <input
                        class="form-control"
                        v-model="traduccionesEditadas.publicaciones[index]"
                        id="Nombre"
                      />
                    </div>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-col>
              <div class="text-center mt-4">
                <b-button variant="primary" @click="submitTextos"
                  >Guardar Textos</b-button
                >
              </div>
            </b-col>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import Menu from "../menu/Menu.vue";
import Footer from "../menu/Footer.vue";
import AuthenticationService from "@/services/AuthenticationService";
import LenguajeService from "@/services/LenguajeService";
import swal from "sweetalert";
export default {
  components: { Menu, Footer },
  data() {
    return {
      logo: { url: undefined },
      nombre: undefined,
      color: null,
      email: undefined,
      showPrueba: false,
      showPruebaColor: false,
      traducciones: undefined,
      traduccionesEditadas: {
        footer: {},
        publicaciones: {},
      },
      dailyData: {
        coord: { lon: -58.233, lat: -35.1635 },
        weather: [
          { id: 800, main: "Clear", description: "clear sky", icon: "01n" },
        ],
        base: "stations",
        main: {
          temp: 17.58,
          feels_like: 17.74,
          temp_min: 16.01,
          temp_max: 18.39,
          pressure: 1019,
          humidity: 90,
          sea_level: 1019,
          grnd_level: 1017,
        },
        visibility: 10000,
        wind: { speed: 2.2, deg: 42, gust: 2.25 },
        clouds: { all: 4 },
        dt: 1680935835,
        sys: {
          type: 2,
          id: 2043579,
          country: "AR",
          sunrise: 1680948649,
          sunset: 1680989908,
        },
        timezone: -10800,
        id: 3435963,
        name: "Brandsen",
        cod: 200,
      },
      sevenData: {
        city: {
          id: 3435963,
          name: "Brandsen",
          coord: { lon: -58.233, lat: -35.1635 },
          country: "AR",
          population: 0,
          timezone: -10800,
        },
        cod: "200",
        message: 7.2528937,
        cnt: 7,
        list: [
          {
            dt: 1680966000,
            sunrise: 1680948649,
            sunset: 1680989908,
            temp: {
              day: 24.41,
              min: 15.42,
              max: 25.92,
              night: 16.27,
              eve: 22.46,
              morn: 16.3,
            },
            feels_like: { day: 24.06, night: 16.15, eve: 21.88, morn: 16.36 },
            pressure: 1020,
            humidity: 44,
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "sky is clear",
                icon: "01d",
              },
            ],
            speed: 3.49,
            deg: 56,
            gust: 8.92,
            clouds: 1,
            pop: 0,
          },
          {
            dt: 1681052400,
            sunrise: 1681035096,
            sunset: 1681076227,
            temp: {
              day: 25.95,
              min: 15.02,
              max: 27.87,
              night: 18.6,
              eve: 24.64,
              morn: 15.21,
            },
            feels_like: { day: 25.95, night: 18.45, eve: 24.31, morn: 15.08 },
            pressure: 1017,
            humidity: 43,
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "sky is clear",
                icon: "01d",
              },
            ],
            speed: 4.87,
            deg: 347,
            gust: 8.33,
            clouds: 3,
            pop: 0,
          },
          {
            dt: 1681138800,
            sunrise: 1681121543,
            sunset: 1681162547,
            temp: {
              day: 26.3,
              min: 16.38,
              max: 28,
              night: 16.47,
              eve: 22.45,
              morn: 16.8,
            },
            feels_like: { day: 26.3, night: 16.42, eve: 22.27, morn: 16.6 },
            pressure: 1018,
            humidity: 43,
            weather: [
              {
                id: 800,
                main: "Clear",
                description: "sky is clear",
                icon: "01d",
              },
            ],
            speed: 6.13,
            deg: 101,
            gust: 10.47,
            clouds: 7,
            pop: 0,
          },
          {
            dt: 1681225200,
            sunrise: 1681207991,
            sunset: 1681248867,
            temp: {
              day: 27.71,
              min: 15.12,
              max: 29.51,
              night: 17.77,
              eve: 25.52,
              morn: 15.94,
            },
            feels_like: { day: 27.9, night: 18.14, eve: 25.46, morn: 16.12 },
            pressure: 1011,
            humidity: 47,
            weather: [
              {
                id: 501,
                main: "Rain",
                description: "moderate rain",
                icon: "10d",
              },
            ],
            speed: 4.01,
            deg: 189,
            gust: 9.1,
            clouds: 96,
            pop: 0.78,
            rain: 4.56,
          },
          {
            dt: 1681311600,
            sunrise: 1681294438,
            sunset: 1681335188,
            temp: {
              day: 17.95,
              min: 12.33,
              max: 19.59,
              night: 12.33,
              eve: 15.71,
              morn: 14.68,
            },
            feels_like: { day: 17.16, night: 11.19, eve: 14.93, morn: 14.63 },
            pressure: 1020,
            humidity: 52,
            weather: [
              {
                id: 501,
                main: "Rain",
                description: "moderate rain",
                icon: "10d",
              },
            ],
            speed: 7.29,
            deg: 169,
            gust: 10.87,
            clouds: 69,
            pop: 1,
            rain: 6.67,
          },
          {
            dt: 1681398000,
            sunrise: 1681380886,
            sunset: 1681421509,
            temp: {
              day: 16.45,
              min: 8.54,
              max: 18.85,
              night: 11.87,
              eve: 15.25,
              morn: 8.54,
            },
            feels_like: { day: 15.27, night: 10.91, eve: 14.21, morn: 6.6 },
            pressure: 1024,
            humidity: 43,
            weather: [
              {
                id: 802,
                main: "Clouds",
                description: "scattered clouds",
                icon: "03d",
              },
            ],
            speed: 3.75,
            deg: 144,
            gust: 9.52,
            clouds: 35,
            pop: 0,
          },
          {
            dt: 1681484400,
            sunrise: 1681467334,
            sunset: 1681507832,
            temp: {
              day: 19.95,
              min: 10.06,
              max: 21.13,
              night: 13.15,
              eve: 18.04,
              morn: 10.59,
            },
            feels_like: { day: 19.2, night: 12.64, eve: 17.26, morn: 9.95 },
            pressure: 1019,
            humidity: 46,
            weather: [
              {
                id: 803,
                main: "Clouds",
                description: "broken clouds",
                icon: "04d",
              },
            ],
            speed: 4.91,
            deg: 42,
            gust: 9.8,
            clouds: 69,
            pop: 0,
          },
        ],
      },
    };
  },
  created() {
    this.traducciones = this.$root.$options.i18n.messages.es;
    this.traduccionesEditadas.footer = this.traducciones.footer;
    this.traduccionesEditadas.publicaciones = this.traducciones.publicaciones;
  },
  methods: {
    changeColor() {
      this.showPruebaColor = !this.showPruebaColor;
    },
    showModelTraduccion(traduccion) {
      return traduccion;
    },
    upAws(event) {
      this.showPrueba = true;
      const file = event.target.files[0];
      this.logo.url = URL.createObjectURL(file);
      this.createBase64Image(file);
    },
    createBase64Image(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.logo.base64 = e.target.result;
      };

      reader.readAsDataURL(file);
    },
    async submitForm() {
      try {
        if (this.logo.url != undefined && this.logo.file.type == "image/png") {
           await AuthenticationService.personalizaPlataforma({
            logo: this.logo.base64,
          });
        }
        this.submitTextos();
      } catch (error) {
        console.error(error);
      }
    },
    async submitTextos() {
      try {
         await LenguajeService.actualizarLenguaje({
          footer: this.traduccionesEditadas.footer,
          publicaciones: this.traduccionesEditadas.publicaciones,
        });
        swal(
          "¡Se actualizaron los datos!",
          "Usted actualizo los datos de la plataforma ",
          "success"
        ).then(() => {
          location.reload();
        });
        location.reload();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>