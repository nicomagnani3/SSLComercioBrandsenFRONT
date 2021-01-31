<template>
  <div v-if="loading" class="text-center">
    <br />
    <br />
    <span class="text-danger">
      <b>Cargando</b>
    </span>
    <b-spinner variant="primary" label="Text Centered"></b-spinner>
  </div>
  <div v-else class="body">
    <b-container fluid class="bv-example-row">
      <b-row align-h="start">
        <b-col md="4">
          <br />
          <H1>{{ producto }}</H1>
          <strong>Resultados: {{ this.cantidadProductos() }}</strong>
          <br />
          <br />
          <b-col col lg="5">
            <h4>Productos</h4>
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="item in categorias"
                :key="item.id"
              >
                <a class="buscador" @click="buscarPorCategoria(item)">{{
                  item.nombre
                }}</a>
              </li>
            </ul>
          </b-col>
          <b-col col lg="5">
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
        </b-col>

        <b-col>
          <div v-if="productos.length == 0">
            <br /><br /><br /><br /><br />
            <b-alert show variant="success">
              <h4 class="alert-heading">
                <b-icon scale="1.5" icon="search" variant="info"></b-icon> No
                hay publicaciones que coincidan con tu búsqueda.!
              </h4>
              <p>
                *Revisá la ortografía de la palabra.<br />
                *Utilizá palabras más genéricas o menos palabras.<br />
                *Navegá por las categorías para encontrar un producto similar
              </p>
            </b-alert>
          </div>
          <br />
          <transition
            v-for="producto in productos"
            v-bind:key="producto.id"
            :per-page="perPage"
            :current-page="currentPage"
          >
            <div>
              <b-card no-body class="overflow-hidden" style="max-width: 956px">
                <br />
                <b-row no-gutters>
                  <b-col md="6">
                    <b-card-img
                      :src="`data:image/png;base64, ${producto.imagen}`"
                      alt="Image"
                      class="rounded-0"
                    ></b-card-img>
                  </b-col>
                  <b-col md="6">
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
                      <h4 v-if="producto.precio > 0">
                        Precio: {{ producto.precio }}
                      </h4>
                      <h5>
                        Fecha de publicacion: {{ producto.fecha | formatDate }}
                      </h5>
                      <p>{{ producto.padre }}</p>
                      <a
                        :href="
                          'https://api.whatsapp.com/send?text=Hola!%20,desde%20MercadoLocal%20observe%20la%20publicacion%20' +
                          producto.titulo +
                          ',queria%20obtener%20mas%20detalles' +
                          '&phone=+54' +
                          acomodarCelular(producto.telefono)
                        "
                        target="_black"
                      >
                        <img
                          src="@/assets/wsp.png"
                          alt=""
                          height="auto"
                          style="width: 65px"
                        />
                      </a>

                      <b-button
                        variant="outline-primary"
                        @click="verImagenes(producto)"
                        ><b-icon icon="images"></b-icon
                      ></b-button>
                      <b-button
                      v-if="producto.descripcion != 'SN'"
                        style="margin: 11px"
                        variant="outline-primary"
                        @click="verdetalles(producto)"
                        ><b-icon icon="layout-text-sidebar"></b-icon
                      ></b-button>
                    </b-card-body>
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </transition>
        </b-col>
        <b-col col lg="2">
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
          centered
          id="modal-xl"
          size="xl"
          ref="modalVerImagenes"
          hide-footer
        >
          <ImagenesDeUnaPublicacion
            @okImagenesPublicacion="okImagenesPublicacion"
            :idPublicacion="this.idPublicacionImagen"
          ></ImagenesDeUnaPublicacion>
        </b-modal>
      </div>
      <div>
           
        <b-modal
        title="Descripcion del producto"          
         id="modal-xl" size="xl"
          ref="modalVerProductos"
          hide-footer
        >   
        <p>{{descripcion}}</p>
                      
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

//import axios from "axios";
export default {
  name: "BuscarProductos",
  components: {
    ImagenesDeUnaPublicacion,
  },
  props: {
    producto: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      verImagen: false,
      descripcion:null,
      perPage: 2,
      currentPage: 1,
      productos: [],
      loading: true,
      categorias: [],
      emprendimientos: [],
      servicios: [],
      idPublicacionImagen: null,
    };
  },
  created() {
    this.getPublicacionesPorNombre();
    this.getcategorias();
    this.getEmprendimientos();
    this.getServicios();
  },
  computed: {
    rows() {
      return this.productos.length;
    },
  },
  watch: {
    producto() {
      this.getPublicacionesPorNombre();
      this.getcategorias();
      this.getEmprendimientos();
      this.getServicios();
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
        this.productos = response.data.data;
        console.log(this.productos);
        this.getImporte(this.productos);
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
        this.categorias = response.data.data;
        this.categorias = this.ordenarDatos(this.categorias);
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
        this.emprendimientos = response.data.data;
        this.emprendimientos = this.ordenarDatos(this.emprendimientos);
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
        this.servicios = response.data.data;
        this.servicios = this.ordenarDatos(this.servicios);
      } catch (err) {
        this.servicios = "ATENCION NO SE PUDIERON OBTENER LOS servicios";
      } finally {
        this.loading = false;
      }
    },
    getImporte(productos) {
      productos.forEach((producto) => {
        const options2 = { style: "currency", currency: "USD" };
        const numberFormat2 = new Intl.NumberFormat("en-US", options2);
        producto.precio = numberFormat2.format(producto.precio);
      });
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
          idCategoria: item.id,
        });
        this.productos = response.data.data;
        this.loading = response.data.error;
        this.getImporte(this.productos);
      } catch (err) {
        this.productos = "ATENCION NO SE PUDIERON OBTENER LAS NOVEDADES";
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
        this.productos = response.data.data;
        this.loading = response.data.error;
        this.getImporte(this.productos);
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
        this.productos = response.data.data;
        this.loading = response.data.error;
        this.getImporte(this.productos);
      } catch (err) {
        this.productos = "ATENCION NO SE PUDIERON OBTENER LAS NOVEDADES";
      }
    },
    verImagenes(producto) {
      this.verImagen = true;
      this.idPublicacionImagen = producto.id;
      this.$refs["modalVerImagenes"].show();
    },
    verdetalles(producto) {
      console.log(producto);
      this.descripcion=producto.descripcion
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