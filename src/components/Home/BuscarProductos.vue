<template>
  <div v-if="loading" class="text-center">
    <br />
    <br />
    <span class="text-danger">
      <b>Cargando</b>
    </span>
    <b-spinner variant="primary" label="Text Centered"></b-spinner>
  </div>
  <div v-else>
    <b-container fluid class="bv-example-row">
      <b-row align-h="start">
        <b-col md="4">
          <br />
          <br />
          <H1>{{ producto }}</H1>
          <p>Resultados: {{ this.cantidadProductos() }}</p>
          <br />
          <br />
          <h3>Categorias:</h3>
          <ul id="example-2">
            <li v-for="item in categorias" :key="item.id">
              <br />
               <a style="text-decoration: underline;"  @click="buscarPorCategoria(item)">{{ item.nombre }}</a>
            
            </li>
          </ul>
        </b-col>

        <b-col cols="5">          
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
            name="fade"
            v-for="producto in productos"
            v-bind:key="producto.id"
          >
            <div class="col-md-8 col- col-sm-12 col-lg-6 col-xl-6">
              <div class="card" style="width: 28rem">
                <div class="card-header">
                  <h2 class="text-center">{{ producto.titulo }}</h2>
                </div>

                <div class="card-body">
                  <img
                    class="card-img-top"
                    :src="`data:image/png;base64, ${producto.imagen}`"
                    alt="Card image cap"
                  />
                  <hr />
                  <h3>Precio: {{ producto.precio }}</h3>

                  <h5>
                    Fecha de publicacion: {{ producto.fecha | formatDate }}
                  </h5>

                  <b-button variant="outline-primary" @click="verImagenes(producto)"
                    ><b-icon icon="images"></b-icon
                  ></b-button>
                </div>
              </div>
              <br> <br>
            </div>            
          </transition>
        </b-col>
      </b-row>
        <div id="modalVerImagenes">
      <b-modal size="xl" ref="modalVerImagenes" title="Listado de imagenes" hide-footer>
        <ImagenesDeUnaPublicacion @okImagenesPublicacion="okImagenesPublicacion" :idPublicacion="this.idPublicacionImagen"></ImagenesDeUnaPublicacion>
      </b-modal>
    </div>
    </b-container>
  </div>
</template>

<script>
import ImagenesDeUnaPublicacion from "@/components/imagenes/ImagenesDeUnaPublicacion.vue";
import PublicacionService from "@/services/PublicacionService";
import CategoriasService from "@/services/CategoriasService";
import axios from "axios";
export default {
  name: "BuscarProductos",
  components: {
    ImagenesDeUnaPublicacion
  },
  data() {
    return {
      producto: "",
      loading: true,
      categorias: [],
      idPublicacionImagen:null
    };
  },
  created() {
    this.producto = this.$route.params.producto;
  },
  methods: {
    async getPublicacionesPorNombre() {
      try {
        const response = await PublicacionService.getPublicacionesPorNombre({
          titulo: this.producto,
        });
        this.productos = response.data.data;
        this.getImporte(this.productos);        
      } catch (err) {
        this.productos = "ATENCION NO SE PUDIERON OBTENER LAS NOVEDADES";
      }
    },
    async getcategorias() {
      try {
        const response = await CategoriasService.getCategorias();
        this.categorias = response.data.data;
        this.categorias = this.ordenarDatos(this.categorias);
      } catch (err) {
        this.categorias = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
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
    async buscarPorCategoria(item){
   
      this.loading=true
       try {
        const response = await PublicacionService.getPublicacionesPorCategoria({
          idCategoria: item.id,
        });
        this.productos = response.data.data;
         this.loading=response.data.error
        this.getImporte(this.productos); 
        console.log(response.data.data)       
      } catch (err) {
        this.productos = "ATENCION NO SE PUDIERON OBTENER LAS NOVEDADES";
      }
    },
    verImagenes(producto){
      this.idPublicacionImagen=producto.id
      this.$refs["modalVerImagenes"].show();      
    },
    okImagenesPublicacion(){
       this.$refs["modalVerImagenes"].hide();   
    }
  },
  mounted() {
    axios
      .all([this.getcategorias(), this.getPublicacionesPorNombre()])
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

</style>