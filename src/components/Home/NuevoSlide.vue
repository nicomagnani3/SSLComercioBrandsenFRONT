<template>
  <b-container>
    <b-row class="pb-3">
      <b-col lg="2" sm="4" class="text-center"></b-col>
      <b-col md="8" sm="6" class="text-left pt-3">
        <div>
          <p class="h1 text-center">Productos en oferta</p>
        </div>
      </b-col>
    </b-row>
    <div v-if="loading" class="text-center">
      <b-spinner
        style="width: 3rem; height: 3rem"
        variant="warning"
        label="Text Centered"
      >
      </b-spinner>
    </div>
    <div v-else class="animated fadeIn">
      <b-card-group deck>
        <b-card
          v-for="(producto, index) in currentPageClubs"
          :key="index"
          :img-src="`data:image/png;base64, ${producto.imagen}`"
          img-alt="Img"
          img-height="200px; max-height:300px"
          img-top
           @click="verProducto(producto)"
        >
          <h2 class="card-title">
            <strong> {{ tituloAjustar(producto.titulo) }} </strong>
          </h2>
          <p class="card-text">
            {{ getImporte(producto.precio) }}
          </p>
          <div slot="footer">
            <b-btn @click="verProducto(producto)" variant="primary" block
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
    </div>
  </b-container>
</template>
<script>
import axios from "axios";
import ProductosService from "@/services/ProductosService";
// import slider components
import { mapGetters } from "vuex";

export default {
  name: "NuevoSlide",
  data() {
    return {
      paginatedClubs: [],
      nbPages: 0,
      nbRowPerPage: 4,
      currentPageIndex: 0,
      productos: [],
      loading: true,
      options: {
        currentPage: 0,
        thresholdDistance: 100,
        thresholdTime: 500,
        autoplay: 4000,
        loop: true,
        direction: "horizontal",
        loopedSlides: 5,
        slidesToScroll: 1,
        effect: "slide",
      },
    };
  },
  components: {},
  computed: {
    ...mapGetters("storeUser", ["getUserId"]),
    formattedClubs() {
      return this.productos.reduce((c, n, i) => {
        if (i % 4 === 0) c.push([]);
        c[c.length - 1].push(n);
        return c;
      }, []);
    },
    currentPageClubs() {
      this.createPages();

      return this.paginatedClubs[this.currentPageIndex];
    },
  },

  methods: {
    goto(i) {
      this.currentPageIndex = i - 1;
    },
    currentPage(i) {
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
        const response = await ProductosService.getProductosDestacados();
        if (response.data.error == false) {
          this.productos = response.data.data;
          console.log(this.productos);
          //this.getImporte(this.productos);
        }
      } catch (err) {
        this.loading = true;
        this.productos = "ATENCION NO SE PUDIERON OBTENER LAS PUBLICACIONES";
      }
    },
    getImporte(precio) {
      const options2 = { style: "currency", currency: "USD" };
      const numberFormat2 = new Intl.NumberFormat("en-US", options2);
      return numberFormat2.format(precio);
    },
    tituloAjustar(titulo) {
      return this.primerMayuscula(titulo.toLowerCase());
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
  background: #007bff;
}
.active {
  width: 20px;
  height: 20px;
  border-radius: 20px;
}
</style>



