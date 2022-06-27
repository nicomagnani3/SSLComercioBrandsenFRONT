<template>
  <div>
    <div class="body">
      <div fluid class="categoria">
        <b-row class="pb-3">
          <p style="font-size: 17px">
            Publicar
            <a @click="publicarAlquiler()">
              <img class="icono" src="@/assets/wsp.png" alt="" />
            </a>
          </p>
          <b-col class="text-center pt-3">
            <p class="h1 font-britannic text">
              <strong class="parrafoCategorias"> Alquileres disponibles</strong>
            </p>
          </b-col>
        </b-row>
      </div>
    </div>
    <br />
    <div v-if="loading" class="text-center">
      <b-spinner
        style="width: 4rem; height: 4rem"
        variant="warning"
        label="Text Centered"
      >
      </b-spinner>
      <!--  :img-src="`data:image/png;base64, ${producto.imagen}`" -->
    </div>
    <div v-else class="cardsBody">
      <ul class="cards"  >
        <li
          class="cards__item"     
          v-for="(producto, index) in productos"
          :key="index"    
        >
          <div class="card">
            <div class="card__image">
              <img :src="`data:image/png;base64, ${producto.imagen}`"  class="imgCard" />
            </div>
            <div class="card__content">
              <div class="card__title">{{producto.propiedad}}</div>
               <div class="card__subtitle">{{producto.operacion}}</div>
              <p class="card__text">
               {{producto.observaciones}}
              </p>
              <button class="btn btn--block card__btn" @click="masInformacion(producto)">Mas información</button>
            </div>
          </div>
        </li>
      </ul>
            <br />
      <div class="d-flex justify-content-center">
        <b-pagination
          pills
          v-model="currentPagePaginate"
          :per-page="perPage"
          :total-rows="totalRows"
          @change="nextPage"
        ></b-pagination>
      </div>
    </div>

    <br />

  </div>
</template>


<script>
import axios from "axios";
import ProductosService from "@/services/PublicacionService";
import { mapGetters } from "vuex";

export default {
  name: "NuevoSlide",
  props: {},
  data() {
    return {
      totalRows: 0,
      paginatedClubs: [],
      nbPages: 0,
      ubicaicon: 0,
      nbRowPerPage: 20,
      currentPageIndex: 0,
      indice: 1,
      loading: true,
      currentPagePaginate: 1,
      perPage: 20,
    };
  },
  components: {},
  created() {},
  computed: {
    ...mapGetters("storeUser", ["getUserId"]),
  },

  methods: {
    publicarAlquiler() {
      this.$router.push({
        name: "nuevoAlquiler",
        query: {
          q: this.searchQuery,
          t: new Date().getTime(),
        },
      });
    },
    masInformacion(propiedad){
      console.log(propiedad)
        this.$router.push({
          name: "RentAction",
          params: {
            idPublicacion: propiedad.id,
            tipo:'ALQUILER',
            publicacion:propiedad
          },
        });
    },
    async nextPage(page) {
      try {
        window.scrollTo(0, 200);
        this.loading = true;
        const response = await ProductosService.getUltimosProductos(page);

        if (response.data.error == false) {
          this.productos = response.data.data;
          this.currentPagePaginate = page;
          this.loading = false;
          //this.getImporte(this.productos);
        }
      } catch (err) {
        this.loading = true;
        this.getPorductos();
        this.productos = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
      }
    },

    async getAlquileres() {
      try {
        const response = await ProductosService.getAlquileres(1);
        console.log(response);
        if (response.data.error == false) {
          this.productos = response.data.data;
          this.totalRows = response.data.cantidad;
          //this.getImporte(this.productos);
        }
      } catch (err) {
        this.loading = true;
        this.getPorductos();
        this.productos = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
      }
    },
    getImporte(precio) {
      if (precio == null || precio <= 1) {
        return;
      }
      const options2 = { style: "currency", currency: "USD" };
      const numberFormat2 = new Intl.NumberFormat("en-US", options2);
      return numberFormat2.format(precio);
    },
    tituloAjustar(titulo) {
      return this.primerMayuscula(titulo);
    },
    primerMayuscula(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    verProducto(producto) {
      if (producto != null) {
        const path = `/buscarProductos/${producto.titulo}`;
        if (this.$route.path !== path)
          this.$router.push({
            name: "buscarProductos",
            params: {
              producto: producto.titulo,
            },
          });
      }
    },
  },
  mounted() {
    axios
      .all([this.getAlquileres()])
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

.vueperslide__title {
  font-size: 7em;
  opacity: 0.7;
}

.ItemProd img {
  object-fit: contain;
}
.icono {
  width: 35px;
  margin: 5px;
}
.item {
  box-shadow: 3px 3px 5px 3px rgba(0, 0, 0, 0.2);
}




.cardsBody{    
  font-family: 'Roboto','Helvetica Neue', Helvetica, Arial, sans-serif;
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
   list-style-type:none;
  display:flex;
  justify-content: center;

}
.cards__item {
  display: flex;
  padding: 1rem;
}

.card {
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-width: 300px;
}

.card__content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 1rem;
}
.card__title {
  color: #000000;
  font-size: 1.25rem;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.card__subtitle {
  color: #000000;
  font-weight: 300;
}
.card__text {
  flex: 1 1 auto;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1.25rem;
  display: -webkit-box;
    height: 139px;   
    cursor: pointer;
    line-height: 18px;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    text-overflow: -o-ellipsis-lastline;
    white-space: normal;
    padding-top: 10px;
    color: #2c354f;
}
.btn {
  background-color: white;
  border: 1px solid #cccccc;
  color: #696969;
  padding: 0.5rem;

}

.btn--block {
  display: block;
  width: 100%;
}
.card__image {
  object-fit: contain;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  filter: contrast(70%);
  overflow: hidden;
  position: relative;
  transition: filter 0.5s cubic-bezier(0.43, 0.41, 0.22, 0.91);

}
.card__image::before {
  display: block;
  padding-top: 56.25%;
}
@media (min-width: 40rem) {
  .card__image::before {
    padding-top: 66.6%;
  }
}
.imgCard {
    width: auto;
    max-height: 100%;
    display: block;
    margin: 0px auto;
    height:300px;
  object-fit: contain;
}

</style>



