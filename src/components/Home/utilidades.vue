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
    <br />
    <VueSlickCarousel :arrows="true" :dots="true" v-bind="settings">
      <div
        class="cardutilidades"
        v-for="(dolar, index) in dolares"
        :key="index"
      >
        <div class="card__content">
          <div class="card__titleDolar">Dolar: {{ dolar.casa.nombre }}</div>
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
            <button
              class="btnUtiles btn--blockUtilidad card__btn"
              @click="masInformacion(utilidad)"
              v-if="utilidad.nombre != 'telefonos'"
            >
              Horarios
            </button>
            <button
              class="btnUtiles btn--block card__btn"
              @click="masInformacion(utilidad)"
              v-if="utilidad.nombre == 'telefonos'"
            >
              Telefonos
            </button>
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
      console.log("getDaily");
      console.log(data);
      this.dailyData = data;
    },

    getSeven(data) {
      console.log("getSeven");
      console.log(data);
      this.sevenData = data;
    },
    masInformacion(utilidad) {
      console.log(utilidad);
      this.utilidadNombre = utilidad.nombre;
      this.utilidadesDetalle = this.utilidadesCompleto.filter(
        (c) => c.nombre == utilidad.nombre && c.imagen != null
      );
      console.log(this.utilidadesDetalle);
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
        this.dolares = cotizacionJSON;
      } catch (error) {
        console.log(error);
      }
    },
    async getUtilidades() {
      try {
        const response = await PublicacionService.getUtilidades();
        console.log(response);
        this.utilidadesCompleto = response.data.data;
        this.utilidades = response.data.data.filter(
          (c) => c.imagenprincipal != null
        );

        //this.utilidades = response.data.data;
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
  },
  mounted() {
    axios
      .all([
        this.getUtilidades(),
        this.dolarHoy(),
        navigator.geolocation.getCurrentPosition((data) => {
          this.getGeolocation(data);
          this.$emit("showCards");
        }),
      ])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style >
body.modal-open {
  height: 100vh;
  overflow-y: hidden;
}
.cardutilidades {
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-width: 300px;
  min-width: 300px !important;
}
.card__titleDolar {
  color: #000000;
  font-size: 1rem;
  font-weight: 400;
  text-transform: uppercase;
  background-color: #ffce4e;
  text-indent: 10%;
}
.imgCard {
  width: auto;
  max-height: 100%;
  display: block;
  margin: 0px auto;
  /*   height: 250px; */
  object-fit: contain;
}
.cards {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  justify-content: center;
}
.cards__itemUtilidad {
  display: flex;
  padding: 1rem;
}
.cardMicros {
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-width: 250px;
  min-width: 250px;
}
.card__imageUtilidad {
  object-fit: contain;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  filter: contrast(90%);
  overflow: hidden;
  position: relative;
  transition: filter 0.5s cubic-bezier(0.43, 0.41, 0.22, 0.91);
}
.card__titleUtilidad {
  color: #000000;
  font-size: 1.25rem;
  font-weight: 300;
  letter-spacing: 0px;
  text-transform: uppercase;
  text-align: center;
}

.btnUtiles {
  background-color: white;
  border: 1px solid #cccccc;
  color: #696969;
  padding: 0.5rem;
}
.card__subtitle {
  color: #000000;
  font-weight: 400;
}
.btnUtiles--blockUtilidad {
  display: block;
  width: 100%;
}
.btnUtiles:hover {
  color: #ffc107;
}
.btnPublicar:hover {
  color: #ffc107;
}
.card__contentMicros {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 1rem;
}
.card__textUtilidad {
  flex: 1 1 auto;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1.25rem;
  display: -webkit-box;
  /* height: 139px; */
  /* cursor: pointer; */
  line-height: 18px;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-overflow: -o-ellipsis-lastline;
  white-space: normal;
  padding-top: 10px;
  white-space: pre-wrap;

  color: #2c354f;
}
.carousel-control-prev-icon,
.carousel-control-next-icon {
  height: 30px !important;
  width: 30px !important;
}
.carousel-control-prev-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23ff0000' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E") !important;
}

.carousel-control-next-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23ff0000' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E") !important;
}
.slick-slide slick-active slick-current{
  text-align: center !important;
}
</style>
 