<template>
  <div>
    <div v-if="loading" class="text-center">
      <br /><br />
      <b-spinner style="width: 7rem; height: 7rem" variant="warning" label="Text Centered">
      </b-spinner>
    </div>
    <div v-else class="body">
      <b-row class="pb-2">
        <b-col cols="2" class="text-center d-none d-sm-none d-md-block">
          <br />
          <div class="filtro">
            <ul class="breadcrumbs">
              <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                <a itemprop="item">
                  <span itemprop="name">{{ productos[0]?.padre }}</span>
                </a>
                <meta itemprop="position" content="1" />
              </li>
            </ul>
            <h4 class="productos">{{ producto }}</h4>
          </div>

          <h6 class="productos"><strong>Resultados: {{ this.cantidadProductos() }}</strong></h6>
          <br />
          <div>
            <ul class="left_menu">
              <li class="odd" button v-for="item in categorias" :key="item.id" @click="buscarPorCategoria(item.id)">
                <a class="buscador" @click="buscarPorCategoria(item.id)">
                  <img :src="item.imagen" alt="Icono" class="icono-categoria">
                  {{ item.nombre }}
                </a>
              </li>
            </ul>
          </div><br>
          <div class="filtroSelect">
            <div class="select-wrapper">
              <div class="productos">Buscar por servicios</div>
              <div class="left-select">
                <b-form-select v-model="selectedServicio" @change="buscarPorServicio(selectedServicio)" class="productos">
                  <option value="0" disabled selected>Selecciona una categoria..</option>
                  <option v-for="item in servicios" :key="item.id" :value="item">{{ item.nombre }}</option>
                </b-form-select>
              </div>
            </div>
          </div>
          <div class="filtroSelect">
            <div class="select-wrapper">
              <div class="productos">Busca por emprendimiento</div>
              <div class="left-select">
                <b-form-select v-model="selectedEmprendimiento" @change="buscarPorEmprendimiento(selectedEmprendimiento)"
                  class="productos">
                  <option value="0" disabled selected>Selecciona una categoria..</option>
                  <option v-for="item in emprendimientos" :key="item.id" :value="item">{{ item.nombre }}</option>
                </b-form-select>
              </div>
            </div>
          </div>
        </b-col>

        <b-col>
          <section class="py-7">
            <div class="container-cards px-4 px-lg-5 mt-5">
              <div class="row gx-5 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-left">
                <div class="col mb-5" v-for="(producto, index) in productos" :key="index">
                  <div class="card h-100 card-custom">
                    <!-- Product image-->
                    <div class="square-image">
                      <img :src="`data:image/png;base64, ${producto.imagen}`" alt="..." class="card-img-top" />
                    </div>
                    <!-- Product details-->
                    <div class="card-body">
                      <div class="text-center">
                        <!-- Product name-->
                        <h5 class="fw-bolder">
                          <strong style="white-space: pre-wrap">{{ producto.titulo }} </strong><span
                            v-if="producto.destacado" class="badge badge-primary" id="valorDestacado">
                            Destacado</span>
                        </h5>
                        <!-- Product price-->
                        <strong class="parrafor">{{ producto.padre }}</strong>
                        <p class="mb-0" v-if="producto.precio">{{ getImporte(producto.precio) }}</p>
                      </div>
                    </div>
                    <!-- Product actions-->
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                      <div class="text-center">
                        <b-btn @click="verProducto(producto)" block class="btn btn btn--block card__btn btn-block">Ver
                          detalle</b-btn>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </b-col>
      </b-row>


    </div>
  </div>
</template>

<script>
import PublicacionService from "@/services/PublicacionService";
import CategoriasService from "@/services/CategoriasService";
import EmprendimientoService from "@/services/EmprendimientoService";
import ServiciosService from "@/services/ServiciosService";
import { mapGetters } from "vuex";

//import axios from "axios";
export default {
  name: "productos",

  props: {
    producto: {
      type: String,
      required: false,
    },
    rubro: {
      type: Number,
      required: false,
      default: 0,
    },
    categoria: {
      type: Number,
      required: false,
    },
    empresa: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      mostrarNoHayPublicaciones: false,
      tipoPublicacion: "",

      verImagen: false,
      productoSeleccionado: [],
      perPage: 2,
      currentPage: 1,
      productos: [],
      loading: true,
      categorias: [],
      emprendimientos: [],
      servicios: [],
      idPublicacionImagen: "",
      selectedServicio: 0,
      selectedEmprendimiento: 0
    };
  },
  created() {

    this.getcategorias();
    this.getEmprendimientos();
    this.getServicios();
    if (Number(this.rubro) > Number(0)) {
      this.buscarPorRubro(this.rubro);
    } else {
      if (Number(this.empresa > Number(0))) {
        this.buscarPorEmpresa(this.empresa);
      } else {
        if (this.categoria > Number(0)) {
          this.buscarPorCategoria(this.categoria)
        } else {
          this.getPublicacionesPorNombre();

        }
      }
    }
  },
  computed: {
    ...mapGetters("storeUser", ["getUserId"]),
  },
  watch: {
    producto() {
      this.getcategorias();
      this.getEmprendimientos();
      this.getServicios();
      if (Number(this.rubro) > Number(0)) {
        this.buscarPorRubro(this.rubro);

      } else {
        if (Number(this.empresa > Number(0))) {
          this.buscarPorEmpresa(this.empresa);

        } else {
          if (this.categoria > Number(0)) {
            this.buscarPorCategoria(this.categoria)
          } else {
            this.getPublicacionesPorNombre();

          }

        }
      }
    },
  },
  methods: {
    verProducto(producto) {
      this.$router.push({
        name: "verProducto",
        params: {
          tipo: producto.tipo.toLowerCase(),
          id: producto.id,
          nombre: producto.titulo
        },
      });
    },
    mostrarCartelSinPublicaicones() {
      if (this.productos.length == 0) {
        this.mostrarNoHayPublicaciones = true;
      } else this.mostrarNoHayPublicaciones = false;
    },
    acomodarCelular(telefono) {
      if (telefono[0] == 0) {
        return telefono.substr(1);
      }
      return telefono;
    },
    async getPublicacionesPorNombre() {
      this.loading = true;
      try {
        const response = await PublicacionService.getPublicacionesPorNombre({
          titulo: this.producto,
        });
        if (response.data.error == false) {
          this.productos = response.data.data;
          this.mostrarCartelSinPublicaicones();
          this.loading = false;
        }
      } catch (err) {
        this.productos = "ATENCION NO SE PUDIERON OBTENER LAS NOVEDADES";
        this.loading = true;
      }
    },

    async getcategorias() {
      this.loading = true;
      try {
        const response = await CategoriasService.getCategorias();
        if (response.data.error == false) {
          this.categorias = response.data.data;
          this.categorias = this.ordenarDatos(this.categorias);
          this.loading = false;
        }
      } catch (err) {
        this.loading = true;
        this.categorias = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
      }
    },
    async getEmprendimientos() {
      this.loading = true;
      try {
        const response = await EmprendimientoService.getEmprendimientos();
        if (response.data.error == false) {
          this.emprendimientos = response.data.data;
          this.emprendimientos = this.ordenarDatos(this.emprendimientos);
          this.loading = false;
        }
      } catch (err) {
        this.emprendimientos =
          "ATENCION NO SE PUDIERON OBTENER LOS emprendimientos";
        this.loading = true;
      }
    },
    async getServicios() {
      this.loading = true;
      try {
        const response = await ServiciosService.getServicios();
        if (response.data.error == false) {
          this.servicios = response.data.data;
          this.servicios = this.ordenarDatos(this.servicios);
          this.loading = false;
        }
      } catch (err) {
        this.servicios = "ATENCION NO SE PUDIERON OBTENER LOS servicios";
        this.loading = true;
      }
    },
    getImporte(precio) {
      const options2 = { style: "currency", currency: "USD" };
      const numberFormat2 = new Intl.NumberFormat("en-US", options2);
      return numberFormat2.format(precio);
    },
    cantidadProductos() {
      return this.productos.length;
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
    async buscarPorCategoria(item) {
      this.loading = true;
      try {
        const response = await PublicacionService.getPublicacionesPorCategoria({
          idCategoria: item,
        });
        if (response.data.error == false) {
          this.productos = response.data.data;
          this.mostrarCartelSinPublicaicones();
          this.loading = false;
        }
        //this.getImporte(this.productos);
      } catch (err) {
        this.productos = "ATENCION NO SE PUDIERON OBTENER LAS NOVEDADES";
        this.loading = true;
      }
    },
    anchorHashCheck() {
      window.scrollTo(0, 0);
    },
    async buscarPorEmprendimiento(item) {
      this.selectedServicio = 0
      this.loading = true;
      try {
        const response = await EmprendimientoService.searchPublicacionesPorEmprendimiento(
          {
            idEmprendimiento: item.id,
          }
        );
        if (response.data.error == false) {
          this.productos = response.data.data;
          this.mostrarCartelSinPublicaicones();
          this.loading = false;
        }

        //this.getImporte(this.productos);
      } catch (err) {
        this.productos = "ATENCION NO SE PUDIERON OBTENER LAS NOVEDADES";
        this.loading = true;
      } finally {
        this.anchorHashCheck();
      }
    },
    async buscarPorServicio(item) {
      this.selectedEmprendimiento = 0
      this.loading = true;
      try {
        const response = await ServiciosService.searchPublicacionesPorServicio({
          id: item.id,
        });
        if (response.data.error == false) {
          this.productos = response.data.data;
          this.mostrarCartelSinPublicaicones();
          this.loading = false;
        }

        //this.getImporte(this.productos);
      } catch (err) {
        this.loading = true;
        this.productos = "ATENCION NO SE PUDIERON OBTENER LAS NOVEDADES";
      } finally {
        this.anchorHashCheck();
      }
    },
    async buscarPorRubro(rubroId) {
      this.loading = true;
      try {
        const response = await PublicacionService.getProductosRubro({
          id: rubroId,
        });
        if (response.data.error == false) {
          this.productos = response.data.data;
          this.mostrarCartelSinPublicaicones();
          this.loading = false;
        }
      } catch (err) {
        this.productos = "ATENCION NO SE PUDIERON OBTENER LAS NOVEDADES";
        this.loading = true;
      }
    },
    async buscarPorEmpresa(userEmpresaID) {
      this.loading = true;
      try {
        const response = await PublicacionService.getPublicacionEmpresa({
          id: userEmpresaID,
        });
        if (response.data.error == false) {
          this.productos = response.data.data;
          this.mostrarCartelSinPublicaicones();
          this.loading = false;
        }
      } catch (err) {
        this.productos = "ATENCION NO SE PUDIERON OBTENER LAS NOVEDADES";
        this.loading = true;
      }
    },

  },
  mounted() { },
};
</script>
<style scoped >
.ItemProd img {
  object-fit: contain;
}

.custom-select-yellow {
  background-color: yellow;
}

.custom-select-yellow option {
  background-color: white;
  padding: 8px 12px;
}

@media screen and (min-width: 768px) {
  .custom-collapse {
    display: block;
  }
}

ul.left_menu {
  width: 196px;
  padding: 0;
  margin: 0;
  list-style: none;
}

ul.left_menu li {
  margin-bottom: 10px;
  /* Ajusta el valor para separar más los elementos */
}

.buscador {
  width: 366px;
  /* height: 25px; */
  display: flex;
  align-items: center;
  /* background-color: #e1e1e1; */
  /* border-bottom: 6px; */
  text-decoration: none;
  color: #000000;
  padding-left: 20px;
  line-height: 25px;
}

.icono-categoria {
  width: 20px;
  /* Ajusta el tamaño del icono según tus necesidades */
  height: 20px;
  margin-right: 10px;
  /* Ajusta el espacio entre el icono y el texto según tus preferencias */
}

.productos {
  text-align: left;
  padding-left: 20px;
  color: #333;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.25;
  margin-bottom: 10px;
}

.breadcrumbs {
  margin-bottom: 20px;
  list-style: none;
  padding: 0;
  text-align: left;
  padding-left: 20px;
}

.breadcrumbs li {
  display: inline;
  margin-right: 10px;
}

.breadcrumbs li::after {
  content: "/";
  margin-left: 10px;
  color: #999;
}

.breadcrumbs li:last-child::after {
  content: "";
}

.breadcrumbs a {
  text-decoration: none;
  color: #007bff;
}

.breadcrumbs a:hover {
  text-decoration: underline;
}

.select-wrapper {
  display: inline-block;
  margin-right: 20px;
  /* Ajusta el margen derecho según tus necesidades */
}

.filtroSelect {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.left-select {
  text-align: left;
  padding-left: 20px;
}
</style>