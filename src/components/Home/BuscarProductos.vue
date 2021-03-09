<template>
  <div v-if="loading" class="text-center">
    <br /><br />
    <b-spinner
      style="width: 11rem; height: 11rem"
      variant="warning"
      label="Text Centered"
    >
    </b-spinner>
  </div>
  <div v-else class="body">
    <b-container fluid class="bv-example-row">
      <b-row class="text-center">
        <b-col cols="3" class="d-none d-sm-none d-md-block">
          <br />
          <H1>{{ producto }}</H1>
          <strong>Resultados: {{ this.cantidadProductos() }}</strong>
          <br />
          <br />

          <h4>Productos</h4>
          <ul class="list-group">
            <li
              class="list-group-item"
              v-for="item in categorias"
              :key="item.id"
            >
              <a class="buscador" @click="buscarPorCategoria(item.id)">{{
                item.nombre
              }}</a>
            </li>
          </ul>

          <br />
          <h4>Servicios</h4>
          <div>
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="item in servicios"
                :key="item.id"
              >
                <a class="buscador" @click="buscarPorServicio(item)">{{
                  item.nombre
                }}</a>
              </li>
            </ul>
          </div>
        </b-col>

        <b-col>
          <br />
          <transition
            v-for="producto in productos"
            v-bind:key="producto.id"
            :per-page="perPage"
            :current-page="currentPage"
          >
            <b-card
              no-body
              class="overflow-hidden"
              style="max-width: auto; max-height: auto"
            >
              <br />
              <b-row>
                <b-col md="6">
                  <b-card-img
                    thumbnail
                    fluid
                    alt="Responsive image"
                    style="max-height: 450px"
                    :src="`data:image/png;base64, ${producto.imagen}`"
                    class="rounded-0"
                  ></b-card-img>
                </b-col>
                <b-col md="4">
                  <b-card-body>
                    <h3>
                      <strong>{{ producto.titulo }} </strong
                      ><span
                        v-if="producto.destacado"
                        class="badge badge-primary"
                      >
                        Destacado</span
                      >
                    </h3>
                    <strong>{{ producto.padre }}</strong>
                    <hr />
                    <h5 v-if="Number(producto.precio) > Number(0)">
                      Precio: {{ getImporte(producto.precio) }}
                    </h5>
                    <h5>Fecha: {{ producto.fecha | formatDate }}</h5>
                    <a target="_black" :href="producto.web">{{
                      producto.web
                    }}</a>
                    <p v-if="producto.telefono != null && logeado">
                      Telefono: {{ producto.telefono }}
                    </p>
                    <p v-if="producto.email != null && logeado">
                      {{ producto.email }}
                    </p>
                    <div>
                      <a
                        :href="
                          'https://api.whatsapp.com/send?text=Hola!%20,desde%20Malambo%20observe%20la%20publicacion%20' +
                          producto.titulo +
                          ',queria%20obtener%20mas%20detalles' +
                          '&phone=+54' +
                          acomodarCelular(producto.telefono)
                        "
                        target="_black"
                      >
                        <img
                          v-if="logeado"
                          src="@/assets/wsp.png"
                          alt=""
                          height="auto"
                          style="width: 45px; margin: 7px"
                        />&nbsp;&nbsp;
                      </a>
                      <a
                        :href="
                          'https://mail.google.com/mail/?view=cm&fs=1&to=' +
                          producto.email +
                          '&body=Hola!%20,desde%20Malambo%20observe%20la%20publicacion%20' +
                          producto.titulo +
                          ',queria%20obtener%20mas%20detalles' +
                          '&su=Malambo consulta por ' +
                          producto.titulo
                        "
                        target="_black"
                        >&nbsp;&nbsp;
                        <img
                          v-if="logeado"
                          src="@/assets/mail.png"
                          alt=""
                          height="auto"
                          style="width: 45px; margin: 7px"
                        />
                      </a>
                    </div>

                    <b-col v-if="!logeado" class="text-center">
                      Para contactarte registrate
                      <router-link to="/login">ACA!</router-link>
                    </b-col>
                    <div>
                      <b-col>
                        <b-button variant="white" @click="verImagenes(producto)"
                          ><b-icon
                            style="width: 3rem; height: 5rem"
                            icon="images"
                          ></b-icon
                        ></b-button>
                        <b-button
                          variant="white"
                          v-if="producto.descripcion != 'SN'"
                          @click="verdetalles(producto)"
                          ><b-icon
                            style="width: 3rem; height: 5rem"
                            icon="layout-text-sidebar"
                          ></b-icon
                        ></b-button>
                      </b-col>
                    </div>
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
          </transition>
          <div v-if="this.productos.length == 0 && this.loading == false">
            <br /><br />
            <b-alert show variant="success">
              <h4 class="alert-heading">
                <b-icon scale="1.5" icon="search" variant="info"></b-icon> No
                hay publicaciones que coincidan con tu búsqueda.!
              </h4>
              <p>
                *Revisá la ortografía de la palabra.<br />
                *Utilizá palabras más genéricas o menos palabras.<br />
                *Navegá por las categorías para encontrar un producto similar<br />
                *Busca en otra categoria o rubro
              </p>
            </b-alert>
          </div>
        </b-col>
        <b-col cols="3" class="d-none d-sm-none d-md-block">
          <br />
          <h4>Emprendimientos</h4>
          <div>
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="item in emprendimientos"
                :key="item.id"
              >
                <a class="buscador" @click="buscarPorEmprendimiento(item)">{{
                  item.nombre
                }}</a>
              </li>
            </ul>
          </div>
        </b-col>
      </b-row>

      <div>
        <b-modal
          title="Imagenes de la publicacion"
          centered
          id="modal-xl"
          size="xl"
          ref="modalVerImagenes"
          hide-footer
        >
          <ImagenesDeUnaPublicacion
            @okImagenesPublicacion="okImagenesPublicacion"
            :idPublicacion="this.idPublicacionImagen"
            :tipo="this.tipoPublicacion"
          ></ImagenesDeUnaPublicacion>
        </b-modal>
      </div>
      <div>
        <b-modal
          title="Descripcion del producto"
          id="modal-xl"
          centered
          ref="modalVerProductos"
          hide-footer
        >
          <p>{{ descripcion }}</p>
        </b-modal>
      </div>
    </b-container>
  </div>
</template>

<script>
import ImagenesDeUnaPublicacion from "@/components/imagenes/ImagenesDeUnaPublicacion.vue";
import PublicacionService from "@/services/PublicacionService";
import CategoriasService from "@/services/CategoriasService";
import EmprendimientoService from "@/services/EmprendimientoService";
import ServiciosService from "@/services/ServiciosService";
import { mapGetters } from "vuex";

//import axios from "axios";
export default {
  name: "BuscarProductos",
  components: {
    ImagenesDeUnaPublicacion,
  },
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
  },
  data() {
    return {
      tipoPublicacion: "",
      logeado: false,
      verImagen: false,
      descripcion: "",
      perPage: 2,
      currentPage: 1,
      productos: [],
      loading: true,
      categorias: [],
      emprendimientos: [],
      servicios: [],
      idPublicacionImagen: "",
    };
  },
  created() {
    if (this.getUserId != null) {
      this.logeado = true;
    }
    this.getcategorias();
    this.getEmprendimientos();
    this.getServicios();
    console.log(this.rubro);
    if (Number(this.rubro) > Number(0)) {
      this.buscarPorRubro(this.rubro);
    } else {
      this.getPublicacionesPorNombre();
    }
  },
  computed: {
    ...mapGetters("storeUser", ["getUserId"]),
  },
  watch: {
    producto() {
      //this.getPublicacionesPorNombre();
      this.getcategorias();
      this.getEmprendimientos();
      this.getServicios();
      if (Number(this.rubro) > Number(0)) {
        this.buscarPorRubro(this.rubro);
      } else {
        this.getPublicacionesPorNombre();
      }
    },
  },
  methods: {
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
        }

        //this.getImporte(this.productos);
      } catch (err) {
        this.productos = "ATENCION NO SE PUDIERON OBTENER LAS NOVEDADES";
      } finally {
        this.loading = false;
      }
    },

    async getcategorias() {
      this.loading = true;
      try {
        const response = await CategoriasService.getCategorias();
        if (response.data.error == false) {
          this.categorias = response.data.data;
          this.categorias = this.ordenarDatos(this.categorias);
        }
      } catch (err) {
        this.categorias = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
      } finally {
        this.loading = false;
      }
    },
    async getEmprendimientos() {
      this.loading = true;
      try {
        const response = await EmprendimientoService.getEmprendimientos();
        if (response.data.error == false) {
          this.emprendimientos = response.data.data;
          this.emprendimientos = this.ordenarDatos(this.emprendimientos);
        }
      } catch (err) {
        this.emprendimientos =
          "ATENCION NO SE PUDIERON OBTENER LOS emprendimientos";
      } finally {
        this.loading = false;
      }
    },
    async getServicios() {
      this.loading = true;
      try {
        const response = await ServiciosService.getServicios();
        if (response.data.error == false) {
          this.servicios = response.data.data;
          this.servicios = this.ordenarDatos(this.servicios);
        }
      } catch (err) {
        this.servicios = "ATENCION NO SE PUDIERON OBTENER LOS servicios";
      } finally {
        this.loading = false;
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
        }

        //this.getImporte(this.productos);
      } catch (err) {
        this.productos = "ATENCION NO SE PUDIERON OBTENER LAS NOVEDADES";
      } finally {
        this.loading = false;
      }
    },
    async buscarPorEmprendimiento(item) {
      this.loading = true;
      try {
        const response = await EmprendimientoService.searchPublicacionesPorEmprendimiento(
          {
            idEmprendimiento: item.id,
          }
        );
        if (response.data.error == false) {
          this.productos = response.data.data;
          this.loading = response.data.error;
        }

        //this.getImporte(this.productos);
      } catch (err) {
        this.productos = "ATENCION NO SE PUDIERON OBTENER LAS NOVEDADES";
      }
    },
    async buscarPorServicio(item) {
      this.loading = true;
      try {
        const response = await ServiciosService.searchPublicacionesPorServicio({
          id: item.id,
        });
        if (response.data.error == false) {
          this.productos = response.data.data;
          this.loading = response.data.error;
        }

        //this.getImporte(this.productos);
      } catch (err) {
        this.productos = "ATENCION NO SE PUDIERON OBTENER LAS NOVEDADES";
      }
    },
    async buscarPorRubro(rubroId) {
      this.loading = true;
      try {
        const response = await PublicacionService.getProductosRubro({
          id: rubroId,
        });
        console.log("entro");
        if (response.data.error == false) {
          this.productos = response.data.data;
          this.loading = response.data.error;
        }

        //this.getImporte(this.productos);
      } catch (err) {
        this.productos = "ATENCION NO SE PUDIERON OBTENER LAS NOVEDADES";
      }
    },
    verImagenes(producto) {
      this.verImagen = true;
      this.idPublicacionImagen = producto.id;
      this.tipoPublicacion = producto.tipo;
      this.$refs["modalVerImagenes"].show();
    },
    verdetalles(producto) {
      this.descripcion = producto.descripcion;
      this.$refs["modalVerProductos"].show();
    },
    okImagenesPublicacion() {
      this.$refs["modalVerImagenes"].hide();
    },
  },
  mounted() {},
};
</script>
<style >
.buscador:hover {
  color: rgb(255, 206, 78);
  cursor: pointer;
}
</style>