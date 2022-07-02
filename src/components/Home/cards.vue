<template>
  <div class="results">
    <div
      :style="[darkMode ? $store.state.dark : { color: 'black' }]"
      class="card-1"
    >
      <b-row>
        <b-col>
          <div class="today">
            <h3>{{ daily.name }}</h3>
            <h5>{{ hoy }}</h5>

            <img
              :src="
                require(`@/assets/weater_elements/${
                  weathers[daily.weather[0].main]
                }.svg`)
              "
              width="90px"
              alt
            />
            <h3 class="textoTemp">
              <b>{{ parseInt(daily.main.temp) }}°</b>
            </h3>
            <h3>{{ traducirTiempo(daily.weather[0].main) }}</h3>
          </div>
        </b-col>
        <b-col>
          <h4>
            <b-col>
              <h5>
                Sensación termica {{ Math.round(daily.main.feels_like) }}°
              </h5>
            </b-col>
            <b-row>
              <b-col>
                <img width="64" src="@/assets/weater_elements/humity.png" alt />
                {{ daily.main.humidity }}%
              </b-col>
              <b-col>
                <img src="@/assets/weater_elements/down.png" alt />
                {{ parseInt(daily.main.temp_min) }}°
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <img src="@/assets/weater_elements/up.png" alt />
                {{ parseInt(daily.main.temp_max) }}°
              </b-col>
              <b-col>
                <img src="@/assets/weater_elements/wind.png" alt />
                {{ daily.wind.speed }} km/h
              </b-col>
            </b-row>
          </h4>
        </b-col>
      </b-row>
    </div>

    <div class="card-2">
      <div class="daysDetail">
        <span
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-left: 10px;
          "
          v-for="data in seven.list"
          :key="data"
        >
          <p>
            {{ data.day }}
          </p>
          <img
            :src="
              require(`@/assets/weater_elements/${
                weathers[data.weather[0].main]
              }.svg`)
            "
            width="100px"
            alt
          />
          <p>{{ traducirTiempo(data.weather[0].main) }}</p>
          <p>
            {{ parseInt(data.temp.day) }}° / {{ parseInt(data.temp.night) }}°
          </p>
        </span>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Cards",
  props: ["daily", "seven"],
  data() {
    return {
      darkMode: false,
      showCard: false,
      hoy: null,
      weathers: {
        Snow: "snowy",
        Clouds: "cloudy",
        Rain: "rainy",
        Clear: "sunny",
        Thunderstorm: "thunder",
      },
      days: [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ],
      daysIndex: [],
    };
  },
  mounted() {
    var fecha = new Date();
    var options = { year: "numeric", month: "long", day: "numeric" };
    this.hoy = fecha.toLocaleDateString("es-ES", options);
    var currentDate = new Date();
    var nextWeek = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    var days = [];
    while (currentDate <= nextWeek) {
      days.push(new Date(currentDate).getDay());
      currentDate.setDate(currentDate.getDate() + 1);
    }
    this.daysIndex = days.slice(1);
    this.sevenDays();
  },
  watch: {
    seven: function () {
      for (let i = 0; i < this.daysIndex.length; i++) {
        this.seven.list[i].day = this.days[this.daysIndex[i]];
      }
    },
  },
  methods: {
    traducirTiempo(palabra) {
      if (palabra == "Clouds") return "Nublado";
      if (palabra == "Rain") return "Lluvioso";
      if (palabra == "Clear") return "Despejado";
      if (palabra == "Snow") return "Nieve";
      return palabra;
    },
    sevenDays() {
      for (let i = 0; i < this.daysIndex.length; i++) {
        this.seven.list[i].day = this.days[this.daysIndex[i]];
      }
    },
  },
};
</script>


<style scoped>
@media only screen and (max-width: 1300px) {
  .results {
    width: 50vw !important;
  }
}
.results {
  display: flex;
  flex-direction: column;
  width: 90% !important;
}

.cards {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
.card-1 {
  width: 100%;
  background-color: white;
  border-radius: 10px;
  margin-top: 20px;
  padding: 20px;
}

.today {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.todayDetails {
  display: flex;

  margin-top: 15px;
  flex-direction: column;
  align-items: flex-start;
}
.daily {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 70px;
}
.card-2 {
  /* width: 100%; */
  /* height: 300px; */
  background-color: white;
  border-radius: 10px;
  /* margin-top: 20px; */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  overflow: auto;
}
.days {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.daysDetail {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.textoTemp {
  font-size: 50px;
}

@media (max-width: 1300px) {
  .card-2 {
    align-items: baseline;
  }
  .results {
    width: 90vw !important;
  }
}
@media (max-width: 600px) {
  .results {
    width: 100% !important;
  }
}
</style>
 