<template>
  <div v-if="loading" class="text-center">
    <b-spinner
      style="width: 7rem; height: 7rem"
      variant="warning"
      label="Text Centered"
    >
    </b-spinner>
  </div>

  <div v-else>
    <br />
    <b-container class="bv-example-row" style="background-color: white">
      <b-row>
        <b-col>
          <div class="text-center">
            <b-img
              fluid
              alt="Responsive image"
              style="max-height: 450px; max-width: 500px"
              class="rounded-0"
              :src="`data:image/png;base64,${this.imgSlider()}`"
            ></b-img>
          </div>
          <ul class="cards">
            <li
              class="cards__item"
              v-for="(producto, index) in imagenes"
              :key="index"
            >
              <div class="card">
                <img
                  :src="`data:image/png;base64, ${producto.imagen}`"
                  class="imgCard"
                  @click="verImagen(producto.imagen)"
                />
              </div>
            </li>
          </ul>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-center pt-3">
          <div class="card__title">{{ publicacion.propiedad }}</div>
          <div class="card__subtitle">{{ publicacion.operacion }}</div>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-center pt-3">
          <p class="card__text">
            {{ publicacion.observaciones }}
          </p>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-center pt-3">
          <div>
            <a
              variant="primary"
              class="mb-2"
              v-if="publicacion.telefono != null"
              :href="
                'https://api.whatsapp.com/send?text=Hola!%20,desde%20'+$t('footer.nombre_plataforma')+'%20observe%20la%20propiedad%20' +
                publicacion.propiedad +
                ',queria%20obtener%20mas%20detalles' +
                '&?url='+$t('footer.url')+
                '&phone=+54'+acomodarCelular(publicacion.telefono)
              "
              target="_black"
            >
              <img
                v-if="publicacion.telefono != null"
                src="@/assets/wsp.png"
                alt=""
                height="auto"
                style="width: 40px; margin: 4px"
              />&nbsp;&nbsp;
            </a>
            <a
              :href="
                'https://mail.google.com/mail/?view=cm&fs=1&to=' +
                publicacion.email +
                '&body=Hola!%20,desde%20'+$t('footer.nombre_plataforma')+'%20observe%20la%20publicacion%20' +
                publicacion.propiedad +
                ',queria%20obtener%20mas%20detalles' +
                '&su='+$t('footer.nombre_plataforma')+' consulta por ' +
                publicacion.operacion
              "
              target="_black"
              >&nbsp;&nbsp;
              <img
                v-if="publicacion.email != null"
                src="@/assets/mail.png"
                alt=""
                height="auto"
                style="width: 40px; margin: 4px"
              />
            </a>
          </div>
        </b-col>
      </b-row>
      <br />
      <b-row v-if="this.cordenadas.length > 1">
        <b-col lg="12" md="8">
          <l-map style="height: 50vh" :zoom="zoom" :center="this.cordenadas">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <l-marker :lat-lng="this.cordenadas">
              <l-icon
                icon-url="https://res.cloudinary.com/malambo/image/upload/v1657681219/location-pin_n8bqao.png"
            /></l-marker>
          </l-map>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import PublicacionService from "@/services/PublicacionService";
import { LMap, LMarker, LTileLayer } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import { LIcon } from "vue2-leaflet";
export default {
  name: "imagenesDeUnaPublicacion",
  components: { LMap, LTileLayer, LMarker, LIcon },
  props: {
    idPublicacion: {
      type: Number,
    },
    tipo: {
      type: String,
    },
    publicacion: {
      type: Object,
    },
  },
  data() {
    return {
      loading: true,
      nbPages: 0,
      ubicaicon: 0,
      currentPageIndex: 0,
      imagenseleccionada: null,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [-35.169137, -58.231642],
      cordenadas: [],
      metaInfo: {
        title: "Default App Title",
        titleTemplate: "%s | vue-meta Example App",
        htmlAttrs: {
          lang: "en-US",
        },
        meta: [
          { charset: "utf-8" },
          {
            name: "description",
            content: "An example Vue application with vue-meta.",
          },
          { name: "viewport", content: "width=device-width, initial-scale=1" },
        ],
      },
    };
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      },
    },
  },
  created() {
    console.log(this.publicacion);
    if (this.publicacion.coordenadas != "") {
      let coordinate_str = this.publicacion.coordenadas
        .replace("[", "")
        .replace("]", "");
      coordinate_str = coordinate_str.split(",");
      this.cordenadas = [
        parseFloat(coordinate_str[0]),
        parseFloat(coordinate_str[1]),
      ];
      console.log(this.cordenadas);
    }
  },

  methods: {
    imgSlider() {
      return this.imagenseleccionada;
    },
    verImagen(imagen) {
      this.imagenseleccionada = imagen;
    },
    nexPage() {
      this.currentPageIndex = this.ubicaicon + 1;
      this.indice = this.ubicaicon + 1;
      if (++this.indice <= this.nbPages) {
        this.ubicaicon++;
      } else {
        this.currentPageIndex = 0;
        this.ubicaicon = 0;
      }
    },
    backPage() {
      if (this.ubicaicon == 0) {
        this.currentPageIndex = this.nbPages - 1;
        this.ubicaicon = this.nbPages - 1;
      } else {
        this.currentPageIndex = this.ubicaicon - 1;
        this.ubicaicon = this.ubicaicon - 1;
      }
    },
    pagina() {
      return this.ubicaicon - 1 === this.currentPageIndex;
    },
    goto(i) {
      this.currentPageIndex = i - 1;
    },
    currentPage(i) {
      this.ubicaicon = this.currentPageIndex;
      return i - 1 === this.currentPageIndex;
    },

    acomodarCelular(telefono) {
      if (telefono[0] == 0) {
        return telefono.substr(1);
      }
      return telefono;
    },
    async getImagenesPublicacion() {
      try {
        const response = await PublicacionService.getImagenesPublicacion({
          idPublicacion: this.idPublicacion,
          tipo: this.tipo,
        });
        if (response.data.error == false) {
          this.imagenes = response.data.data;
          this.imagenseleccionada = this.imagenes[0].imagen;
        }
      } catch (err) {
        this.imagenes = "ATENCION NO SE PUDIERON OBTENER LAS IMAGENES";
      }
    },
  },
  mounted() {
    axios
      .all([this.getImagenesPublicacion()])
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
@media only screen and (max-width: 480px) {
  .imgCard {
    max-height: 50px !important;
    width: auto;
    display: block;
    margin: 0px auto;

    object-fit: contain;
  }
}
.card__title {
  color: #000000;
  font-size: 1.25rem;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
}
.card__subtitle {
  color: #000000;
  font-weight: 300;
}
.ItemProd img {
  object-fit: contain;
}
.cardGuia img {
  max-height: 209px;
  max-width: 280px;
}
.cards__item {
  display: flex;
  padding: 1rem;
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
  padding: 0;
  list-style-type: none;
  display: flex;
  justify-content: center;
}
.imgCard {
  width: auto;
  max-height: 144px;
  display: block;
  margin: 0px auto;

  object-fit: contain;
}
.card__text {
  overflow: hidden;
  white-space: pre-wrap;
  color: #666;
}
</style>

