<template>
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
 <br>
    <VueSlickCarousel :arrows="true" :dots="true" v-bind="settings">
      <div
        class="cardutilidades"
        v-for="(dolar, index) in dolares"
        :key="index"
      >
        <div class="card__content">
          <div class="card__titleDolar">Dólar: {{ dolar.casa.nombre }}</div>
          <b-row>
            <b-col>
              <div class="card__subtitle">
                Compra: <b>${{ dolar.casa.compra }}</b>
              </div>
            </b-col>
            <b-col>
              <div class="card__subtitle">
                Venta: <b>${{ dolar.casa.venta }}</b>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
    </VueSlickCarousel>
    <ul class="cards">
      <li
        class="cards__itemUtilidad"
        v-for="(utilidad, index) in utilidades"
        :key="index"
      >
        <div class="cardMicros">
          <div class="card__imageUtilidad">
            <img :src="utilidad.imagenprincipal" class="imgCard" />
          </div>
          <div class="card__contentMicros">
            <!--  <div class="card__titleUtilidad">{{ utilidad.nombre }}</div> -->
            <p class="card__textUtilidad">
              {{ utilidad.descripcion }}
            </p>
            <b-btn
              class="btn btn btn--block card__btn btn-block"
              @click="masInformacion(utilidad)"
              v-if="utilidad.nombre != 'telefonos'"
            >
              Horarios
            </b-btn>
            <b-btn
              class="btn btn btn--block card__btn btn-block"
              @click="masInformacion(utilidad)"
              v-if="utilidad.nombre == 'telefonos'"
            >
              Telefonos
            </b-btn>
          </div>
        </div>
      </li>
    </ul>
    <b-container>
      <b-row class="text-center">
        <b-col class="text-center">
          <!--    <Search
          @showCards="showCard = true"
          @daily="getDaily"
          @seven="getSeven"
        /> -->
          <Cards :daily="dailyData" :seven="sevenData" />
        </b-col>
      </b-row>
    </b-container>
    <div class="modalImgUtilidad">
      <b-modal
        ref="modalDetalleUtilidad"
        class="modalDetalleUtilidad"
        hide-footer
        size="lg"
        style="color: #ffce4e"
      >
        <b-carousel
          id="carousel-1"
          v-model="slide"
          controls
          indicators
          background="#ababab"
          img-width="500"
          :interval="9000000"
        >
          <div v-for="item in this.utilidadesDetalle" :key="item.id">
            <b-carousel-slide
              :img-src="item.imagen"
              class="item"
              alt="image responsive"
            ></b-carousel-slide>
          </div>
        </b-carousel>
      </b-modal>
    </div>
    
  </div>
</template>

<script>
import Cards from "@/components/Home/cards.vue";
/* import Search from "@/components/Home/search.vue";
 */ import axios from "axios";
import PublicacionService from "@/services/PublicacionService";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  name: "Home",
  components: { Cards, VueSlickCarousel /* Search */ },
  props: {
    desdeMenu: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      sevenData: [],
      slide: 0,
      utilidadNombre: null,
      dailyData: [],
      darkMode: false,
      showCard: true,
      loading: true,
      dolares: [],
      utilidades: [],
      utilidadesCompleto: [],
      utilidadesDetalle: [],
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 6000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
          {
            breakpoint: 1600,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 2,
              infinite: true,
              speed: 60000,
              autoplaySpeed: 2000,
              dots: true,
            },
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
              infinite: true,
              speed: 60000,
              autoplaySpeed: 2000,
              dots: true,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              speed: 60000,
              autoplaySpeed: 2000,
              dots: true,
            },
          },

          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
    };
  },
  created() {},
  methods: {
    getDaily(data) {
      this.dailyData = data;
    },

    getSeven(data) {
      this.sevenData = data;
    },
    masInformacion(utilidad) {
      this.utilidadNombre = utilidad.nombre;
      this.utilidadesDetalle = this.utilidadesCompleto.filter(
        (c) => c.nombre == utilidad.nombre && c.imagen != null
      );
      this.$refs["modalDetalleUtilidad"].show();
    },
    async getGeolocation(data) {
      try {
        await axios(
          `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${data.coords.latitude}&lon=${data.coords.longitude}&units=metric&appid=20571ab45c74dc2a1897b60c5b8047a1`
        ).then((res) => {
          this.$emit("seven", res.data);
          this.sevenData = res.data;
        });

        await axios(
          `https://api.openweathermap.org/data/2.5/weather?lat=${data.coords.latitude}&lon=${data.coords.longitude}&units=metric&appid=20571ab45c74dc2a1897b60c5b8047a1`
        ).then((res) => {
          this.$emit("daily", res.data);
          this.dailyData = res.data;
        });
        this.$emit("showCards");
      } catch (error) {
        console.log(error);
      }
    },
    async dolarHoy() {
      try {
     
       const apiUSD = "https://www.dolarsi.com/api/api.php?type=dolar";
        const cotizacionDolar = await fetch(apiUSD);
        const cotizacionJSON = await cotizacionDolar.json();
        console.log(cotizacionJSON)
        this.dolares = cotizacionJSON;
      } catch (error) {
        console.log(error);
      }
    },
    async getUtilidades() {
      try {
        const response = await PublicacionService.getUtilidades();
        this.utilidadesCompleto = response.data.data;
        this.utilidades = response.data.data.filter(
          (c) => c.imagenprincipal != null
        );

        //this.utilidades = response.data.data;
      } catch (err) {
        this.$bvToast.toast(err.response.data.message, {
          title: "Atencion!",
          toaster: "b-toaster-top-center",
          solid: true,
          variant: "danger",
        });
      }
    },
    async situarBrandsen() {
      try {
        let data = {
          coords: {},
        };
        data.coords.latitude = -35.766434;
        data.coords.longitude = -58.497615;
        this.getGeolocation(data);
        this.$emit("showCards");
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    axios
      .all([
        this.getUtilidades(),
        this.dolarHoy(),
        this.situarBrandsen(),
        navigator.geolocation.getCurrentPosition((data) => {
          this.getGeolocation(data);
          this.$emit("showCards");
        }),
      ])
      .then(() => {
        this.loading = false;
        if (this.desdeMenu == true) {
          window.scrollTo(0, 578);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>