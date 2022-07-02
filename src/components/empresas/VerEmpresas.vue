<template>
  <div>
    <div class="body">
      <div fluid class="categoria">
        <b-row class="pb-3">
          <p style="font-size: 17px">
            ¡¡¡¡Sumate aca!
            <a
              :href="
                'https://api.whatsapp.com/send?text=Hola!%20,me%20quiero%20sumar%20a%20la%20guia%20Comercial%20😃' +
                '&phone=+542223431948'
              "
              target="_black"
            >
              <img class="icono" src="@/assets/wsp.png" alt="" />
            </a>
          </p>
          <b-col class="text-center pt-3">
            <p class="h1 font-britannic text">
              <strong class="parrafoCategorias"> ¡Guia Comercial!</strong>
            </p>
          </b-col>
        </b-row>
      </div>
    </div>
    <br />
    <div v-if="loading" class="text-center">
      <br /><br />
      <b-spinner
        style="width: 7rem; height: 7rem"
        variant="warning"
        label="Text Centered"
      >
      </b-spinner>
    </div>
    <div v-else class="cardsBody">
      <b-row>
        <b-col>
          <ul class="cards">
            <li
              class="cards__item"
              v-for="producto in paginatedCards"
              :key="producto.id"
            >
              <div class="card">
                <div class="card__image">
                  <img :src="producto.imagen" class="imgCard" />
                </div>
                <div class="card__content">
                  <div class="card__title">{{ producto.nombre }}</div>
                  <div class="btnInfo">
                    <button
                      class="btn btn--block card__btn"
                      id="btnInfo"
                      @click="verdetalles(producto)"
                    >
                      Más información
                    </button>
                  </div>
                  
                </div>
              </div>
            </li>
          </ul>
          <div class="d-flex justify-content-center">
            <b-pagination
              pills
              v-model="currentPage"
              :per-page="perPage"
              :total-rows="empresas.length"
            ></b-pagination>
          </div>
        </b-col>
        <b-col class="col-md-2">
          <strong style="font-weight: 700; font-size: 20px">
            Filtrar Por:
          </strong>
          <b-form-group>
            <b-form-checkbox
              v-for="item in rubros"
              :key="item.id"
              v-model="selected"
              :value="item.nombre"
              name="flavour-3a"
              class="buscador"
              @change="buscarPorCategoria(item.id)"
              :indeterminate="indeterminate"
            >
              {{ item.nombre }}
            </b-form-checkbox>
          </b-form-group>
        </b-col>
      </b-row>
    </div>

    <!-- 

      <div id="careersVue">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-9">
              <b-card-group columns>
                <b-card
                  style="max-width: 283px;    "
                  v-for="producto in paginatedCards"
                  :key="producto.id"
                  :img-src="producto.imagen"
                  img-alt="Responsive image"
                  img-top
                 class="cardGuia"
                  alt="Responsive image"
                >
                  <div class="cortar" @click="verProducto(producto)">
                    <strong> {{ producto.nombre }}</strong>
                  </div>
                  <div slot="footer" class="d-flex justify-content-center">
                    <a
                      variant="white"
                      v-if="producto.empresa != null"
                      @click="verEmpresa(producto)"
                      style="cursor: pointer"
                    >
                      <img
                        src="@/assets/carrito.png"
                        alt=""
                        height="auto"
                        class="imagnesIcon"
                      />&nbsp;&nbsp;
                    </a>
                    <a
                      variant="white"
                      v-if="producto.descripcion != null"
                      @click="verdetalles(producto)"
                      style="cursor: pointer"
                    >
                      <img
                        src="@/assets/descripcion.png"
                        alt=""
                        height="auto"
                        class="imagnesIcon"
                      />&nbsp;&nbsp;
                    </a>
                  </div>
                </b-card>
              </b-card-group>
              <div class="d-flex justify-content-center">
                <b-pagination
                 pills 
                  v-model="currentPage"
                  :per-page="perPage"
                  :total-rows="empresas.length"
                ></b-pagination>
              </div>
            </div>
            <div class="col-md-3">
              <strong style="font-weight: 700; font-size: 20px">
                Filtrar Por:
              </strong>
              <b-form-group>
                <b-form-checkbox
                  v-for="item in rubros"
                  :key="item.id"
                  v-model="selected"
                  :value="item.nombre"
                  name="flavour-3a"
                  class="buscador"
                  @change="buscarPorCategoria(item.id)"
                  :indeterminate="indeterminate"
                >
                  {{ item.nombre }}
                </b-form-checkbox>
              </b-form-group>
            </div>
          </div>
        </div>
      </div> -->
    <b-modal
      id="modal-center"
      ok-only
      ref="modalDetalle"
      centered
      :title="productoSeleccionado.nombre"
    >
      <p style="white-space: pre-wrap" class="my-4">
        {{ productoSeleccionado.descripcion }}
      </p>
    </b-modal>
  </div>
</template>
<script>
import PublicidadService from "@/services/PublicidadService";
import PublicacionService from "@/services/PublicacionService";

import axios from "axios";
export default {
  name: "VerEmpresas",
  components: {},
  data() {
    return {
      loading: false,
      empresas: [],
      empresasCompleta: [],
      rubros: [],
      noFiltro: false,
      indeterminate: false,
      selected: null,
      currentPage: 1,
      perPage: 15,
      productoSeleccionado: [],
    };
  },
  created() {},
  watch: {
    selected(newValue) {
      this.noFiltro = newValue;
      if (newValue == false) {
        this.empresas = this.empresasCompleta;
      }
    },
  },
  computed: {
    paginatedCards() {
      const { currentPage, perPage } = this;
      const start = (currentPage - 1) * perPage;
      const end = currentPage * perPage;
      window.scrollTo(0, 200);
      return this.empresas.slice(start, end);
    },
  },
  methods: {
    buscarProducto(producto) {
      const path = `/buscarProductos/${producto}`;
      if (this.$route.path !== path)
        this.$router.push({
          name: "buscarProductos",
          params: {
            producto: producto,
          },
        });
    },
    async getGuiaComercial() {
      this.loading = true;
      try {
        const response = await PublicidadService.getGuiaComercial();
        this.empresas = response.data.data;
        this.empresasCompleta = this.empresas;
        this.empresas = this.ordenarDatos(this.empresas);
        this.seleccionarRubros(this.empresas);
      } catch (err) {
        this.empresas = "ATENCION NO SE PUDIERON OBTENER LAS EMPRESAS";
        this.loading = true;
      } finally {
        this.loading = false;
      }
    },
    seleccionarRubros(empresas) {
      let mc = empresas.map((e) => ({
        id: e.rubroId,
        nombre: e.rubroNombre,
      }));
      this.rubros = Array.from(new Set(mc.map(JSON.stringify))).map(JSON.parse);
      this.ordenarRubros(this.rubros);
    },
    ordenarRubros(categoria) {
      return categoria.sort(function (a, b) {
        if (a.nombre > b.nombre) {
          return 1;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        return 0;
      });
    },

    ordenarDatos(categoria) {
      /* return categoria.sort((a, b) => b.id - a.id) */
      return categoria.sort(function (a, b) {
        if (a.id < b.id) {
          return 1;
        }
        if (a.id > b.id) {
          return -1;
        }
        return 0;
      });
    },
    verEmpresa(empresa) {
      const path = `/buscarProductos/${empresa.nombre}`;
      if (this.$route.path !== path)
        this.$router.push({
          name: "buscarProductos",
          query: {
            q: this.searchQuery,
            t: new Date().getTime(),
          },
          params: {
            producto: empresa.nombre,
            empresa: empresa.usuario,
          },
        });
    },
    async getRubros() {
      this.loading = true;
      try {
        const response = await PublicacionService.getRubros();
        this.rubros = response.data.data;
        this.rubros = this.ordenarDatos(this.rubros);
      } catch (err) {
        this.rubros = "ATENCION NO SE PUDIERON OBTENER LOS RUBROS";
      } finally {
        this.loading = false;
      }
    },
    buscarPorCategoria(rubrosId) {
      window.scrollTo(0, 200);

      if (this.noFiltro != false) {
        this.empresas = this.empresasCompleta;
        this.empresas = this.empresasCompleta.filter(
          (c) => c.rubroId == rubrosId
        );
      }
    },
    tituloAjustar(titulo) {
      return this.primerMayuscula(titulo);
    },
    primerMayuscula(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    verdetalles(producto) {
      this.productoSeleccionado = producto;
      this.$refs["modalDetalle"].show();
    },
    okDetalles() {
      this.$refs["modalDetalle"].hide();
    },
  },
  mounted() {
    axios
      .all([this.getGuiaComercial() /* , this.getRubros() */])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style  scoped>
@media only screen and (max-width: 480px) {
  .imagnesIcon {
    width: 23px !important;
    margin: 5px !important;
  }

}

.buscador:hover {
  color: rgb(255, 206, 78);
  cursor: pointer;
}
.buscador {
  width: 366px;
}

.icono {
  width: 35px;
  margin: 5px;
}


.cardsBody {
  font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
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
  min-width: 300px;
    max-height: 330px;
  min-height: 330px;

}

.card__content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 1rem;
}
.card__title {
  color: #000000;
  font-size: 1.0rem;
  font-weight: 300;
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
  filter: contrast(90%);
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
  object-fit: contain;
  max-width: 301px;
}
.btn:hover{
color: #ffc107;
}
.btnPublicar:hover{
color: #ffc107;
}
#btnInfo{
     position: absolute;
    bottom: 0;
width: 90%;}
</style>



