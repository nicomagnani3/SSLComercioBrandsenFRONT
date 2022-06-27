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
              <img :src="`data:image/png;base64, ${producto.imagen}`"  />
            </div>
            <div class="card__content">
              <div class="card__title">{{producto.propiedad}}</div>
               <div class="card__subtitle">{{producto.operacion}}</div>
              <p class="card__text">
               {{producto.observaciones}}
              </p>
              <button class="btn btn--block card__btn">Button</button>
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
     <b-card-group deck>
            <b-card
              v-for="(producto, index) in productos"
              :key="index"
              img-height="250px; max-height:100%;"
              alt="Responsive image"
              class="ItemProd"
              style="max-width: 250px"
              :img-src="`data:image/png;base64, ${producto.imagen}`"
            >
              <div class="cortar" @click="verProducto(producto)">
                <strong> {{ tituloAjustar(producto.propiedad) }}</strong>
              </div>
              
              <small>{{ producto.operacion }}</small>

              <div slot="footer">
                <b-btn
                  @click="verProducto(producto)"
                  variant="warning"
                  block
                  class="btnMas"
                  >Ver mas</b-btn
                >
              </div>
            </b-card>
          </b-card-group>
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
.cortar {
  font-weight: 700;
  display: -webkit-box;

  margin: 0;
  /* text-align: left; */
  cursor: pointer;
  font-size: 13px;
  line-height: 18px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-overflow: -o-ellipsis-lastline;
  white-space: normal;
  padding-top: 10px;
  color: #2c354f;
  max-width: 191px;
}
.texto {
  color: rgb(226, 205, 199);
  font-family: "Poppins", sans-serif;
}
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
.card-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.page-index {
  margin-left: 10px;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  background: #7d7d7d;
}
.active {
  width: 20px;
  height: 20px;
  border-radius: 20px;
}
.verMasServi {
  margin-left: 12px;
  color: #676767;
  cursor: pointer;
  font-size: 20px;
  text-decoration: underline #676767;
  white-space: nowrap;
}
.btnMas {
  white-space: normal;
  background: #ffce4e;
  background: -moz-linear-gradient(
    45deg,
    #00ddf5 0%,
    #00d9d7 32%,
    #00d6ba 100%
  );
  background: -webkit-linear-gradient(
    45deg #00ddf5 0%,
    #00d9d7 32%,
    #ffce4e 100%
  );
  background: linear-gradient(45deg #00ddf5 0%, #00d9d7 32%, #ffce4e 100%);
  -moz-border-radius: 20px;
  -webkit-border-radius: 20px;
  border-radius: 20px;
  margin: -3px 0 0 0;
  padding: 9px 7px 16px 8px;
  width: 88%;
  text-transform: none;
  font-size: 14px;
  line-height: 11px;
  color: #fff;
}
#iconright {
  height: 29rem;
  width: 30px;
  cursor: pointer;
}
.destacados {
  color: rgb(109, 108, 108);
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
}
.cards__item {
  display: flex;
  padding: 1rem;
  @media (min-width: 40rem) {
    width: 50%;
  }
  @media (min-width: 56rem) {
    width: 33.3333%;
  }
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
}
.btn {
  background-color: white;
  border: 1px solid #cccccc;

  color: #696969;
  padding: 0.5rem;
  text-transform: lowercase;
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

      height: 200px;
    width: 200px;
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
img {

  vertical-align: middle;
   max-width: 100%;
 max-height: 100%;
}

</style>



