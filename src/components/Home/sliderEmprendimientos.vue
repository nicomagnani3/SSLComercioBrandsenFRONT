<template>
  <div>
    <b-row class="text-left">
      <b-col cols="1"></b-col>
      <b-col cols="8">
        <div class="h3 font-britannic text widget-title destacados">
          <strong class="parrafor"> Emprendimientos destacados
          <a v-if="!loading" @click="verDestacados()" class="verMas"
            >+ ver mas</a
          ></strong>
        </div>
      </b-col>
    </b-row>
    <br />
    <div v-if="loading" class="text-center">
      <b-spinner
        style="width:6rem; height: 6rem"
        variant="warning"
        label="Text Centered"
      >
      </b-spinner>
    </div>
    <div v-else>
      <b-row class="text-center">
        <b-col>
          <div class="d-none d-sm-none d-md-block">
            <b-icon
              @click="backPage()"
              :class="{ active: pagina() }"
              icon="arrow-left-circle-fill"
              id="iconright"
            >
            </b-icon>
          </div>
        </b-col>
        <b-col cols="10">
          <b-card-group autoplay deck>
            <b-card
              thumbnail
              v-for="(producto, index) in currentPageClubs"
              :key="index"
              class="ItemProd"
              style="max-width: 350px"
              :img-src="`data:image/png;base64, ${producto.imagen}`"
              img-height="300px; max-height:100%;"
              alt="Responsive image"
              @click="verProducto(producto)"
            >
              <strong>
                <B
                  ><I>
                    <strong>{{ tituloAjustar(producto.titulo) }}</strong>
                  </I></B
                >
              </strong>
              <p class="card-text">
                {{ getImporte(producto.precio) }}
              </p>

              <small>{{ producto.padre }}</small>

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

          <div class="card-pagination">
            <div
              class="page-index"
              v-for="i in nbPages"
              :key="i"
              @click="goto(i)"
              :class="{ active: currentPage(i) }"
            ></div>
          </div>
        </b-col>
        <b-col>
          <div class="d-none d-sm-none d-md-block">
            <b-icon
              @click="nexPage()"
              :class="{ active: pagina() }"
              icon="arrow-right-circle-fill"
              id="iconright"
            >
            </b-icon>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import EmprendimientoService from "@/services/EmprendimientoService";
import { mapGetters } from "vuex";

export default {
  name: "SlideEmprendimietnos",
  data() {
    return {
      paginatedClubs: [],
      nbPages: 0,
      ubicaicon: 0,
      nbRowPerPage: 5,
      currentPageIndex: 0,
      indice: 1,
      productos: [],
      loading: true,
    };
  },
  components: {},
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
        const response = await EmprendimientoService.getPublicacionEmprendimientos();
        if (response.data.error == false) {
          this.productos = response.data.data;
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
      if (this.getUserId == null) {
        this.$router.push({
          name: "login",
          params: {
            autentificacion: false,
          },
        });
      } else {
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
      }
    },
  },
  mounted() {
    axios
      .all([this.getPorductos()])
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
  cursor: pointer
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
.verMas {
  margin-left: 12px;
  color: #676767;
  cursor: pointer;
  font-size: 15px;
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



