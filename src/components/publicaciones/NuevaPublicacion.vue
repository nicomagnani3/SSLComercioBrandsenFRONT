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
      title="Mercado Local te simplifica las cosas"
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
          :imagenes="imagenes"
          :imgPrimera="imgPrimera"
        >
        </ImagenesCarga>
      </tab-content>
           <tab-content title="Pagar la publicacion" :before-change="validarPago">
        <PagarEmprendimiento
          ref="validarPago"
          :destacada="this.publicacion.destacada"
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

import DetallePublicacion from "@/components/publicaciones/DetallePublicacion.vue";
export default {
  name: "nuevaPublicacion",
  components: {
    ListarCategorias,
    ListarCategoriasHijas,
    ImagenesCarga,
    DetallePublicacion,
    PagarEmprendimiento
  },
  data() {
    return {
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
      imgPrimera: [],
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
       async validarPago() {
      let result = await this.$refs.validarPago.validate();
      console.log(result)
      if (result == false){
        alert("Debe efectuar el pago para poder finalizar la publicacion en Malambo")
        return false;
      }
      return result;
    },
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
      if (this.getUserId == null) {
        this.$router.push({
          name: "login",
          params: {
            autentificacion: false,
          },
        });
      } else {
        this.creando = true;
        try {
          const response = await PublicacionService.addPublicacion({
            titulo: this.publicacion.titulo,
            importe: this.publicacion.precio,
            fecha: this.publicacion.fecha,
            observaciones: this.publicacion.observaciones,
            imagenes: this.imagenes,
            imgPrimera: this.imgPrimera.base64,
            categoria: this.categoriaSeleccionada,
            categoriasHija: this.categoriaHijaSeleccionada,
            usuarioID: this.getUserId,
            destacada:this.publicacion.destacada
          });

          this.$root.$bvToast.toast(`Usted a creado una publicacion`, {
            title: response.data.data,
            toaster: "b-toaster-top-center succes",
            solid: true,
            variant: "success",
          });
          this.$router.push("/");
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
      }
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
