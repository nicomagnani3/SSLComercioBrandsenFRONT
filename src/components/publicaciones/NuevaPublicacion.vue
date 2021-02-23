<template>
  <div v-if="loading" class="text-center">
    <span class="text-danger">
      <b>Cargando</b>
    </span>
    <b-spinner variant="primary" label="Text Centered"></b-spinner>
  </div>
  <div v-else>
    <form-wizard
      @on-complete="onComplete"
      title="Malambo te simplifica las cosas"
      subtitle="Elegi lo que quieras publicar en unos simples pasos"
      back-button-text="Volver!"
      next-button-text="Siguiente!"
      finish-button-text="Finalizar"
      color="#FFCE4E"
    >
      <b-col v-if="creando" class="text-center">
        <div>
          <b-spinner
            style="width: 5rem; height: 5rem"
            variant="warning"
            label="Text Centered"
            type="grow"
          ></b-spinner>
          <span style="font-size: 24px" class="text-warning">
            <b>Creando publicacion,aguarde un instante....</b>
          </span>
          <b-spinner
            style="width: 3rem; height: 3rem"
            variant="warning"
            label="Text Centered"
          ></b-spinner>
          <b-spinner
            style="width: 3rem; height: 3rem"
            variant="warning"
            label="Text Centered"
            type="variant"
          ></b-spinner>
        </div>
      </b-col>
      <tab-content
        title="¿Que tipo de categoria es el producto que necesitas publicar?"
      >
        <ListarCategorias
          :categorias="this.categorias"
          @update-categoria="update"
        ></ListarCategorias>
      </tab-content>
      <tab-content
        title="¿Qué necesitas publicar?"
        :before-change="validarCategoriaHija"
      >
        <ListarCategoriasHijas
          :categoriasHijas="this.categoriaHijaElegida"
          @update-categoria="updateCategoriaHija"
        ></ListarCategoriasHijas>
      </tab-content>
      <tab-content
        title="Detalles del producto"
        :before-change="validarDetalleProducto"
      >
        <DetallePublicacion
          ref="detallePublicacion"
          :publicacion="this.publicacion"
        ></DetallePublicacion>
      </tab-content>
      <tab-content title="Imagenes" :before-change="validarImagenes">
        <ImagenesCarga
          ref="altaImagenes"
          :imagenes="this.imagenes"
          :imgPrimera="this.imgPrimera"
        >
        </ImagenesCarga>
      </tab-content>
      <tab-content title="Pagar la publicacion" >
        <PagarEmprendimiento         
          :publicacion="this.publicacion"
          :destacada="this.publicacion.destacada"
          :imagen="this.imgPrimera"
          :finalizo="this.presionoFinalizar"
        >
        </PagarEmprendimiento>
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import PublicacionService from "@/services/PublicacionService";
import { mapGetters } from "vuex";
import axios from "axios";
import CategoriasService from "@/services/CategoriasService";
import ListarCategorias from "@/components/categorias/ListarCategorias.vue";
import ListarCategoriasHijas from "@/components/categorias/ListarCategoriasHijas.vue";
import ImagenesCarga from "@/components/imagenes/ImagenesCarga.vue";
import PagarEmprendimiento from "@/components/emprendimientos/PagarEmprendimiento.vue";
import MercadoPago from "@/services/MercadoPago";

import DetallePublicacion from "@/components/publicaciones/DetallePublicacion.vue";
export default {
  name: "nuevaPublicacion",
  components: {
    ListarCategorias,
    ListarCategoriasHijas,
    ImagenesCarga,
    DetallePublicacion,
    PagarEmprendimiento,
  },
  data() {
    return {
      presionoFinalizar: false,
      presionoCrear: false,
      categorias: [],
      categoriaSeleccionada: null,
      categoriasHijas: [],
      categoriaHijaElegida: [],
      categoriaHijaSeleccionada: null,
      loading: true,
      publicacion: [],
      alerts: [],
      montoEntregaInvalido: false,
      imagenes: [],
      imgPrimera: [   {
          id: 0,
        url: "https://picsum.photos/400/400/?image=20",
        file: null,
        tipo: null,
        loadingImg: false,
        estado: 1,
        key: 0,
        obligatorio: true,
        base64: "",
        primera: false,
        }],
      creando: false,
    };
  },
  created() {
    if (this.getUserId == null) {
      this.$router.push({
        name: "login",
        params: {
          autentificacion: false,
        },
      });
    }
  },
  computed: {
    ...mapGetters("storeUser", ["getUserId"]),
  },
  methods: {  
    async validarImagenes() {
      let result = await this.$refs.altaImagenes.validate();
      return result;
    },
    async validarCategoriaHija() {
      if (this.categoriaHijaSeleccionada == null) {
        return false;
      }
      return true;
    },
    async validarDetalleProducto() {
      let result = await this.$refs.detallePublicacion.validate();
      return result;
    },
    async onComplete() {
      this.presionoFinalizar = true;
      if (this.getUserId == null) {
        this.$router.push({
          name: "login",
          params: {
            autentificacion: false,
          },
        });
      } else {
        if (!this.presionoCrear) {
          this.crearPublicacion();
        }
      }
    },
    async crearPublicacion() {
      this.presionoCrear = true;
      try {
        const response = await PublicacionService.addPublicacion({
          titulo: this.publicacion.titulo,
          importe: this.publicacion.precio,
          fecha: this.publicacion.fecha,
          observaciones: this.publicacion.observaciones,
          imagenes: this.imagenes,
          imgPrimera: this.imgPrimera[0].base64,
          categoria: this.categoriaSeleccionada,
          categoriasHija: this.categoriaHijaSeleccionada,
          usuarioID: this.getUserId,
          destacada: this.publicacion.destacada,
        });
        if (response.data.error == false) {
          this.validarPagoMercadoPago(response.data.data);
        }       
      } catch (error) {
        error.response.data.data.forEach((data) => {
          this.$bvToast.toast(`No se pudo crear la publicacion`, {
            title: data,
            toaster: "b-toaster-top-center",
            solid: true,
            variant: "danger",
          });
        });
      }
    },
    async validarPagoMercadoPago(idPublicacion) {
      let precioPublicacion = this.publicacion.destacada ? 700 : 500;
      const response = await MercadoPago.crearPreferencia({
        titulo: this.publicacion.titulo,
        precioPublicacion: precioPublicacion,
        idPublicacion: idPublicacion,
        descripcion: this.publicacion.observaciones,
        tipo:"PUBLICACION"
      });
      this.createCheckoutButton(response.data.id);
    },
    createCheckoutButton(preference) {
      var script = document.createElement("script");
      script.src =
        "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
      script.type = "text/javascript";
      script.dataset.preferenceId = preference;
      document.getElementById("button-checkout").innerHTML = "";
      document.querySelector("#button-checkout").appendChild(script);
    },
    updateCategoriaHija(categoriaHija) {
      this.categoriaHijaSeleccionada = categoriaHija[0].id;
    },
    update(categoria) {
      this.categoriaSeleccionada = categoria[0].id;
      this.categoriaHijaElegida = this.categoriasHijas.filter(
        (c) => c.idPadre == categoria[0].id
      );
      this.categoriaHijaElegida = this.ordenarDatos(this.categoriaHijaElegida);
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
    async getcategorias() {
      try {
        const response = await CategoriasService.getCategorias();
        this.categorias = response.data.data;
        this.categorias = this.ordenarDatos(this.categorias);
      } catch (err) {
        this.categorias = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
      }
    },
    async getcategoriasHijas() {
      try {
        const response = await CategoriasService.getcategoriasHijas();
        this.categoriasHijas = response.data.data;
      } catch (err) {
        this.categorias = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
      }
    },

    async validate() {
      let result = await this.$refs.nuevaPublicacion.validate();
      if (result == true) {
        if (Number(this.publicacion.precio) <= 10) {
          this.montoEntregaInvalido = true;
          return false;
        }
        if (this.getUserId == null) {
          this.$router.push({
            name: "login",
            params: {
              autentificacion: false,
            },
          });
          return false;
        }
      }
      return result;
    },
    actualizarMontoEntrega() {
      this.montoEntregaInvalido = false;
    },
  },
  mounted() {
    axios
      .all([this.getcategorias(), this.getcategoriasHijas()])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
