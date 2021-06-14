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
    <div v-else class="animated fadeIn">
      <div id="careersVue">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-3">
              <h3>Locations</h3>
              <b-list-group-item
                button
                v-for="item in rubros"
                :key="item.id"
                @click="buscarPorCategoria(item.id)"
              >
                <a class="buscador" @click="buscarPorCategoria(item.id)">{{
                  item.nombre
                }}</a>
              </b-list-group-item>
            </div>
            <div class="col-md-9">
              <b-card-group columns>
                <b-card
                  style="max-width: 283px"
                  v-for="producto in paginatedCards"
                  :key="producto.id"
                  :img-src="producto.imagen"
                  img-alt="Responsive image"
                  img-top
                  class="cardImagen"
                  alt="Responsive image"
                >
                  <div class="cortar" @click="verProducto(producto)">
                    <strong> {{ producto.nombre }}</strong>
                  </div>
                  <div slot="footer">
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
              <br />
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <b-pagination
              v-model="currentPage"
              :per-page="perPage"
              :total-rows="empresas.length"
            ></b-pagination>
          </div>
        </div>
      </div>
    </div>
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
      rubros: [],

      currentPage: 4,
      perPage: 15,
      productoSeleccionado: [],
    };
  },
  created() {},
  computed: {
    paginatedCards() {
      const { currentPage, perPage } = this;
      const start = (currentPage - 1) * perPage;
      const end = currentPage * perPage;

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
        this.empresas = this.ordenarDatos(this.empresas);
      } catch (err) {
        this.empresas = "ATENCION NO SE PUDIERON OBTENER LAS EMPRESAS";
        this.loading = true;
      } finally {
        this.loading = false;
      }
    },
    ordenarDatos(categoria) {
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
      .all([this.getGuiaComercial(), this.getRubros()])
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
  .cortar {
    display: none !important;
  }
}
.imagnesIcon {
  width: 45px;
  margin: 4px;
}
.buscador:hover {
  color: rgb(255, 206, 78);
  cursor: pointer;
}

.grid-item1 {
  background: #ffffff;
  text-align: center;
  border: rgb(165, 165, 165) 1px solid;
  /* width: 100px !important; */
  font-size: 20px;
  cursor: pointer;
  padding-top: 20px;
}
.cortar {
  font-weight: 700;
  /* display: -webkit-box; */
  /* height: 30px; */
  /* margin: 0; */
  /* text-align: left; */
  /* cursor: pointer; */
  font-size: 13px;
  line-height: 18px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  /* text-overflow: ellipsis; */
  text-overflow: -o-ellipsis-lastline;
  white-space: normal;
  padding-top: 10px;
  color: #2c354f;
  max-width: 191px;
  white-space: nowrap;
  /* overflow: hidden; */
  text-overflow: ellipsis;
}
.btnProductos {
  box-shadow: 0px 0px 0px 0px #ffce4e;
  background-color: #ffce4e;
  border-radius: 50rem !important;
  /* border: 1px solid #ffce4e; */
  /* display: inline-block; */
  cursor: pointer;
  color: #ffffff;
  font-family: "Montserrat", sans-serif !important;
  font-size: 13px;
  padding: 11px 24px;
  text-decoration: none;
  text-shadow: 0px 0px 0px #ffce4e;
}
.btnProductos:hover {
  background-color: #d0a537;
}
.btnProductos:active {
  position: relative;
  top: 1px;
}
.btnDetalle {
  box-shadow: 0px 0px 0px 0px #e6e6ff;
  /* background-color: #ffce4e; */
  border-radius: 38rem !important;
  border: 1px solid #212529;
  /* display: inline-block; */
  cursor: pointer;
  color: #212529;
  font-family: "Montserrat", sans-serif !important;
  font-size: 13px;
  padding: 8px 24px;
  text-decoration: none;
  text-shadow: 0px 0px 0px #000000;
}
.btnDetalle:hover {
  background-color: #e6e6e6;
}
.btnDetalle:active {
  position: relative;
  top: 1px;
}
.icono {
  width: 35px;
  margin: 5px;
}
.flip-card-back {
  background-color: #2980b9;
  color: white;
  transform: rotateY(180deg);
}
</style>
