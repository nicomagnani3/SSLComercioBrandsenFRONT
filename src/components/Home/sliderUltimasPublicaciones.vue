<template>
  <div>
    <b-row class="text-left">
      <b-col cols="1"></b-col>
      <b-col cols="8">
        <div class="h4 font-britannic text widget-title destacados">
          <strong class="parraforTitProd"> Últimos Ingresos </strong>
          <!-- <a v-if="!loading" @click="verDestacados()" class="verMasServi"
            >ver mas</a
          > -->
        </div>
      </b-col>
    </b-row>
    <br />
    <div v-if="loading" class="text-center">
      <b-spinner
        style="width: 4rem; height: 4rem"
        variant="warning"
        label="Text Centered"
      >
      </b-spinner>
    </div>
    <div v-else class="animated fadeIn">
      <b-container fluid="sm">
        <b-row class="text-center" cols="2" cols-sm="8" cols-md="8" cols-lg="5">
          <b-col
            v-for="(producto, index) in currentPageClubs"
            :key="index"
            class="mb-2"
          >
            <b-card
              class="ItemProd"
              style="max-width: 250px"
              :img-src="`data:image/png;base64, ${producto.imagen}`"
              img-height="250px; max-height:100%;"
              alt="Responsive image"
            >
              <div class="cortar" @click="verProducto(producto)">
                <strong> {{ tituloAjustar(producto.titulo) }}</strong>
              </div>
              <div v-if="Number(producto.precio) > Number(0)">
                <p class="card-text">
                  {{ getImporte(producto.precio) }}
                </p>
              </div>
              <div v-else>
                <br />
              </div>
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
          </b-col>
        </b-row>
      </b-container>
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
props: {
    productos:{ 
      type: Array,
    },
     nuevaPublicacion:{ 
      type: Boolean,
      default:false
    },
},
  data() {
    return {
      paginatedClubs: [],
      nbPages: 0,
      ubicaicon: 0,
      nbRowPerPage: 10,
      currentPageIndex: 0,
      indice: 1,
      loading: true,
    };
  },
  components: {},
  created (){
    console.log(this.nuevaPublicacion)
    if (this.nuevaPublicacion){
      this.getPorductos()
    }
  },
  computed: {
    ...mapGetters("storeUser", ["getUserId"]),
    currentPageClubs() {
      this.createPages();

      return this.paginatedClubs[this.currentPageIndex];
    },
  },

  methods: {
    verDestacados() {
      this.$router.push({
        name: "verDestacados",
        query: {
          q: this.searchQuery,
          t: new Date().getTime(),
        },
        params: {
          productos: this.productos,
        },
      });
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
    createPages() {
      let lengthAll = Object.keys(this.productos).length;
      this.nbPages = 0;

      for (let i = 0; i < lengthAll; i = i + this.nbRowPerPage) {
        this.paginatedClubs[this.nbPages] = this.productos.slice(
          i,
          i + this.nbRowPerPage
        );
        this.nbPages++;
      }
    },

    async getPorductos() {
      try {
        const response = await ProductosService.getUltimasPublicaciones();

        if (response.data.error == false) {
          this.productos = response.data.data;
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
      .all([/* this.getPorductos() */])
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
  height: 46px;
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
  font-size: 14px;
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
</style>



