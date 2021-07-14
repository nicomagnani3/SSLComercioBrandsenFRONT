<template>
  <div>
    <div v-if="loading" class="text-center">
      <br /><br />
      <b-spinner
        style="width: 7rem; height: 7rem"
        variant="warning"
        label="Text Centered"
      >
      </b-spinner>
    </div>
    <div v-else class="body">
      <b-row class="pb-2">
        <b-col cols="3" class="text-center d-none d-sm-none d-md-block">
          <br />
          <h4>{{ producto }}</h4>
          <strong>Resultados: {{ this.cantidadProductos() }}</strong>
          <br />
          <br />

          <h4>Productos</h4>
          <b-list-group>
            <b-list-group-item
              button
              v-for="item in categorias"
              :key="item.id"
              @click="buscarPorCategoria(item.id)"
            >
              <br />
              <a class="buscador" @click="buscarPorCategoria(item.id)">{{
                item.nombre
              }}</a>
            </b-list-group-item>
          </b-list-group>

          <br />
          <h4>Servicios</h4>
          <b-list-group>
            <b-list-group-item
              button
              v-for="item in servicios"
              :key="item.id"
              @click="buscarPorServicio(item)"
            >
              <br />
              <a class="buscador" @click="buscarPorServicio(item)">{{
                item.nombre
              }}</a>
            </b-list-group-item>
          </b-list-group>
        </b-col>

        <b-col>
          <br />
          <transition
            v-for="producto in productos"
            v-bind:key="producto.id"
            :per-page="perPage"
            :current-page="currentPage"
          >
            <div>
              <b-card
                no-body
                class="overflow-hidden"
                style="max-width: auto; max-height: auto"
              >
                <b-row>
                  <b-col md="6">
                    <b-card-img
                      img-height="300px; max-height:100%;"
                      class="ItemProd"
                      @click="verImagenes(producto)"
                      thumbnail
                      fluid
                      alt="Responsive image"
                      style="max-height: 350px; cursor: pointer"
                      :src="`data:image/png;base64, ${producto.imagen}`"
                    ></b-card-img>
                  </b-col>
                  <b-col md="6">
                    <b-card-body>
                      <h5>
                        <strong style="white-space: pre-wrap"
                          >{{ producto.titulo }} </strong
                        ><span
                          v-if="producto.destacado"
                          class="badge badge-primary"
                          id="valorDestacado"
                        >
                          Destacado</span
                        >
                      </h5>
                      <strong class="parrafor">{{ producto.padre }}</strong>
                      <hr />
                      <h5 v-if="Number(producto.precio) > Number(0)">
                        {{ getImporte(producto.precio) }}
                      </h5>
                      <!--    <p>Fecha: {{ producto.fecha | formatDate }}</p> -->

                      <!--  <a target="_black" :href="producto.web">{{
                      producto.web
                    }}</a> -->
                      <p v-if="producto.telefono != '' && producto.telefono != null">
                        Telefono: <strong>{{ producto.telefono }}</strong>
                      </p>
                      <p
                        style="white-space: nowrap"
                        v-if="producto.email != null"
                      >
                        <strong>{{ producto.email }}</strong>
                      </p>                     
                      <div>
                        <a
                          v-if="producto.telefono != null "
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
                            v-if=" producto.telefono != null"
                            src="@/assets/wsp.png"
                            alt=""
                            height="auto"
                            style="width: 43px; margin:2px"
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
                          
                            src="@/assets/mail.png"
                            alt=""
                            height="auto"
                            style="width: 45px; margin: 4px"
                          />
                        </a>
                      </div>
                      <!--     <a
                        variant="white"
                        @click="verImagenes(producto)"
                        style="cursor: pointer"
                      >
                        <img
                          src="@/assets/galeria.png"
                          alt=""
                          height="auto"
                          style="width: 45px; margin: 4px"
                        />&nbsp;&nbsp;
                      </a> -->

                      <a
                        variant="white"
                        v-if="producto.descripcion != 'SN'"
                        @click="verdetalles(producto)"
                        style="cursor: pointer"
                      >
                        <img
                          src="@/assets/descripcion.png"
                          alt=""
                          height="auto"
                          style="width: 45px; margin: 4px"
                        />&nbsp;&nbsp;
                      </a>
                      <a
                        variant="white"
                        v-if="producto.web != null"
                        target="_black"
                        :href="producto.web"
                        style="cursor: pointer"
                      >
                        <img
                          src="@/assets/web.png"
                          alt=""
                          height="auto"
                          style="width: 43px; margin: 5px"
                        />&nbsp;&nbsp;
                      </a>
                    </b-card-body>
                  </b-col>
                </b-row>
              </b-card>
              <br />
            </div>
          </transition>
          <div v-if="this.mostrarNoHayPublicaciones">
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
          <b-list-group>
            <b-list-group-item
              button
              v-for="item in emprendimientos"
              :key="item.id"
              @click="buscarPorEmprendimiento(item)"
            >
              <br />
              <a class="buscador" @click="buscarPorEmprendimiento(item)">{{
                item.nombre
              }}</a>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>

      <div>
        <b-modal
          title="Imagenes de la publicacion"
          centered
          id="modal-xl"
         
          ref="modalVerImagenes"
          hide-footer
          ok-only
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
          :title="this.productoSeleccionado.titulo"
          id="modal-xl"
          centered
          ref="modalVerProductos"
          ok-only
         
        >
          <DetallesDeUnaPublicacion
            @okDetalles="okDetalles"
            :publicacion="this.productoSeleccionado"
            
          ></DetallesDeUnaPublicacion>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import ImagenesDeUnaPublicacion from "@/components/imagenes/ImagenesDeUnaPublicacion.vue";
import DetallesDeUnaPublicacion from "@/components/publicaciones/DetallesDeUnaPublicacion.vue";

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
    DetallesDeUnaPublicacion,
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
        }else{
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
        }else{
                    this.getPublicacionesPorNombre();

        }

        }
      }
    },
  },
  methods: {
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
    verImagenes(producto) {
      this.verImagen = true;
      this.idPublicacionImagen = producto.id;
      this.tipoPublicacion = producto.tipo;
      this.$refs["modalVerImagenes"].show();
    },
    verdetalles(producto) {
      this.productoSeleccionado = producto;
      this.$refs["modalVerProductos"].show();
    },
    okImagenesPublicacion() {
      this.$refs["modalVerImagenes"].hide();
    },
    okDetalles() {
      this.$refs["modalVerProductos"].hide();
    },
  },
  mounted() {},
};
</script>
<style scoped >
.buscador:hover {
  color: rgb(255, 206, 78);
  cursor: pointer;
}
.buscador {
  width: 366px;
}

.ItemProd img {
  object-fit: contain;
}
@media screen and (min-width: 768px) {
  .custom-collapse {
    display: block;
  }
}
</style>