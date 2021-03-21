<template>
  <b-container>
  
    <div  class="animated fadeIn">
      <b-row class="text-center">
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
                      Telefono: <strong>{{ producto.telefono }}</strong>
                    </p>
                    <p
                      style="white-space: nowrap"
                      v-if="producto.email != null && logeado"
                    >
                      <strong>{{ producto.email }}</strong>
                    </p>
                    <div v-if="!logeado" class="text-center">
                      Para contactarte registrate
                      <router-link to="/login">ACA!</router-link>
                    </div>
                    <div v-else>
                          <a
                            v-if="producto.telefono != null && logeado"
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
                              v-if="logeado && producto.telefono != null"
                              src="@/assets/wsp.png"
                              alt=""
                              height="auto"
                              style="width: 45px; margin: 4px"
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
                              style="width: 45px; margin: 4px"
                            />
                          </a>
                      </div>
                          <a
                            variant="white"
                            @click="verImagenes(producto)"
                            style="cursor: pointer;"
                            >
                            <img
                              src="@/assets/galeria.png"
                              alt=""
                              height="auto"
                              style="width: 45px; margin: 4px"
                            />&nbsp;&nbsp;
                          </a>
                          
                          <a
                            variant="white"
                            v-if="producto.descripcion != 'SN'"
                            @click="verdetalles(producto)"
                            style="cursor: pointer;"
                            >
                           <img
                              src="@/assets/descripcion.png"
                              alt=""
                              height="auto"
                              style="width: 45px; margin: 4px"
                            />&nbsp;&nbsp;
                          </a>
                   
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
          </transition>
        
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
          :title="this.productoSeleccionado.titulo"
          id="modal-xl"
          centered
          ref="modalVerProductos"
          ok-only
          size="xl"
        >
         <DetallesDeUnaPublicacion
            @okDetalles="okDetalles"          
            :publicacion="this.productoSeleccionado"
            :logeado="this.logeado"
          ></DetallesDeUnaPublicacion>
        </b-modal>
      </div>
      
    </div>
  </b-container>
</template>

<script>
import ImagenesDeUnaPublicacion from "@/components/imagenes/ImagenesDeUnaPublicacion.vue";
import DetallesDeUnaPublicacion from "@/components/publicaciones/DetallesDeUnaPublicacion.vue";

import { mapGetters } from "vuex";

//import axios from "axios";
export default {
  name: "VerDestacados",
  components: {
    ImagenesDeUnaPublicacion,
    DetallesDeUnaPublicacion
  },
  props: {
    productos: {
      type: Array,
      required: true,
    }, 
  },
  data() {
    return {
      tipoPublicacion: "",
      logeado: false,
      verImagen: false,
      productoSeleccionado: [],
      perPage: 2,
      currentPage: 1,
      idPublicacionImagen: "",
    };
  },
  created() {
      console.log(this.productos)
    if (this.getUserId != null) {
      this.logeado = true;
    }  
  },
  computed: {
    ...mapGetters("storeUser", ["getUserId"]),
  },
  watch: {
   
  },
  methods: {
    acomodarCelular(telefono) {
      if (telefono[0] == 0) {
        return telefono.substr(1);
      }
      return telefono;
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
  
   
    
    verImagenes(producto) {
      this.verImagen = true;
      this.idPublicacionImagen = producto.id;
      this.tipoPublicacion = producto.tipo;
      this.$refs["modalVerImagenes"].show();
    },
    verdetalles(producto) {
      console.log(producto)
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
<style >
.buscador:hover {
  color: rgb(255, 206, 78);
  cursor: pointer;
}
</style>