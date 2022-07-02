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
    <b-row>
      <b-row>
        <ul class="cards">
          <li
            class="cards__item"
            v-for="(utilidad, index) in utilidades"
            :key="index"
          >
            <b-col>
              <div class="card__image">
                <b-img
                  alt="Responsive image"
                  :src="utilidad.imagen"
                  class="imgUtilidades"
                  height="500"
                ></b-img>
              </div>
            </b-col>
          </li>
        </ul>
        <b-col>
          <ul class="cards">
            <li
              class="cards__item"
              v-for="(dolar, index) in dolares"
              :key="index"
            >
              <div class="card">
                <div class="card__content">
                  <div class="card__titleDolar">
                    Dolar: {{ dolar.casa.nombre }}
                  </div>
                  <br />
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
            </li>
          </ul>
        </b-col>
      </b-row>
    </b-row>
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
  </div>
</template>

<script>
import Cards from "@/components/Home/cards.vue";
/* import Search from "@/components/Home/search.vue";
 */ import axios from "axios";
import PublicacionService from "@/services/PublicacionService";

export default {
  name: "Home",
  components: { Cards /* Search */ },
  data() {
    return {
      sevenData: [],
      dailyData: [],
      darkMode: false,
      showCard: true,
      loading: true,
      dolares: [],
      utilidades: [],
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

    async getGeolocation(data) {
      this.loading = true;
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
        this.loading = true;

        const apiUSD = "https://www.dolarsi.com/api/api.php?type=dolar";
        const cotizacionDolar = await fetch(apiUSD);
        const cotizacionJSON = await cotizacionDolar.json();
        this.dolares = cotizacionJSON;
        console.log(this.dolares);
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async getUtilidades() {
      try {
        const response = await PublicacionService.getUtilidades();
        console.log(response);
        this.utilidades = response.data.data;
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
<style scoped>
@media only screen and (max-width: 1300px) {
  .imgUtilidades {
    width: 100%;
    height: 100%;
        max-width: 90%;
  }
}
.cardsBody {
  font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  padding: 1rem;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.cards {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  /* padding: 0; */
  /* list-style-type: none; */
  /* display: flex; */
  /* justify-content: center;*/
}
.cards__item {
  display: flex;
  padding: 1rem;
}
.card__content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 1rem;
}
.card__subtitle {
  color: #000000;
  font-weight: 300;
}
.card {
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
  font-size: 1.25rem;
  font-weight: 300;
  text-transform: uppercase;
  background-color: #ffce4e;
}
.imgCard {
  width: auto;
  /* max-height: 100%; */
  display: block;
  margin: 0px auto;
  height: 556px;
  object-fit: contain;
}

.card__image {
  object-fit: contain;
}
.imgUtilidades {
  width: auto;
  display: block;
  margin: 0px auto;
  object-fit: contain;
  max-height: 500px;
}
</style>
 