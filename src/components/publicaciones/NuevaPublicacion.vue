<template>
    <div v-if="loading" class="text-center">
    <br /><br />    <br /><br />
    <b-spinner
      style="width: 11rem; height: 11rem"
      variant="warning"
      label="Text Centered"
    >
    </b-spinner>
  </div>
  <div v-else>
    <form-wizard
      @on-complete="onComplete"
      title="Malambo te simplifica las cosas"
      subtitle="Elegi lo que quieras publicar en unos simples pasos"
      back-button-text="Volver!"
      next-button-text="Siguiente!"
      :finish-button-text="this.valorBotonFinalizar"
      color="#000000"
      step-size="lg"
      error-color="#dc3545"
    >    
      <tab-content
        title="¿Qué tipo de categoría necesitas publicar? "
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
        title="Detalles de la publicacion"
        :before-change="validarDetalleProducto"
      >
        <DetallePublicacion
          ref="detallePublicacion"
          :contrato="this.contrato"
          :publicacion="this.publicacion"
          :preciosPublicacion="this.preciosPublicacion"
          :yapublico="this.yapublico"
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
      <tab-content :title="this.valorUltimoPaso">
        <PagarPublicacion
          :publicacion="this.publicacion"
          :imagen="this.imgPrimera"
          :finalizo="this.presionoFinalizar"
          :contrato="this.contrato"
          :preciosPublicacion="this.preciosPublicacion"
          :esperarBotonMercadoPago="this.esperarBotonMercadoPago"
        >
        </PagarPublicacion>
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import PublicacionService from "@/services/PublicacionService";
import { mapGetters, mapState } from "vuex";
import axios from "axios";
import CategoriasService from "@/services/CategoriasService";
import ListarCategorias from "@/components/categorias/ListarCategorias.vue";
import ListarCategoriasHijas from "@/components/categorias/ListarCategoriasHijas.vue";
import ImagenesCarga from "@/components/imagenes/ImagenesCarga.vue";
import PagarPublicacion from "@/components/publicaciones/PagarPublicacion.vue";
import MercadoPago from "@/services/MercadoPago";
import Contratos from "@/services/ContratosService";

import DetallePublicacion from "@/components/publicaciones/DetallePublicacion.vue";
export default {
  name: "nuevaPublicacion",
  components: {
    ListarCategorias,
    ListarCategoriasHijas,
    ImagenesCarga,
    DetallePublicacion,
    PagarPublicacion,
  },
  data() {
    return {
      yapublico:false,
      esperarBotonMercadoPago:false,
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
      valorBotonFinalizar: "Obtener boton de pago!",
      valorUltimoPaso:"Pagar la publicacion",
      contrato: [],
      montoEntregaInvalido: false,
      imagenes: [],
      preciosPublicacion: [],
      tieneContrato: false,
      imgPrimera: [
        {
          id: 0,
          url:
            "https://i.pinimg.com/originals/ad/53/64/ad53643d33b99130bc99e04d19857e39.png",
          file: null,
          tipo: null,
          loadingImg: false,
          estado: 1,
          key: 0,
          obligatorio: true,
          base64: "",
          primera: false,
        },
      ],
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
    ...mapState("storeUser", ["grupos"]),
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
          if (this.tieneContrato) {
            this.$root.$bvToast.toast(
              "Se creo con exito la publicacion, gracias por confiar en MALAMBO",
              {
                title: "Atencion!",
                toaster: "b-toaster-top-center",
                solid: true,
                variant: "success",
              }
            );
            this.$router.push({
              name: "Home",
            });
          } else {
            this.esperarBotonMercadoPago=true
            this.validarPagoMercadoPago(response.data.data);
          }
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
      let precioPublicacion = this.publicacion.destacada
        ? this.preciosPublicacion[1].precio
        : this.preciosPublicacion[0].precio;
      const response = await MercadoPago.crearPreferencia({
        titulo: this.publicacion.titulo,
        precioPublicacion: precioPublicacion,
        idPublicacion: idPublicacion,
        descripcion: this.publicacion.observaciones,
        tipo: "PUBLICACION",
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
      this.esperarBotonMercadoPago=false
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
    async getContratosUser() {
      if (this.grupos == "COMERCIO" || this.grupos == "EMPRESA") {
        try {
          const response = await Contratos.getContratosUser({
            user: this.getUserId,
          });
          this.contrato = response.data.data;
          if (response.data.error == false && response.data.data.length > 0) {
            this.tieneContrato = true;
            //this.verTipoPublicacion();
            this.valorBotonFinalizar = "Finalizar";
            this.valorUltimoPaso= "Finalizar"
            this.verificarContrato();
          } else {
            this.$root.$bvToast.toast(
              "No tenes ningun contrato disponible para publicar, te recomendamos crear uno o renovar el anterior",
              {
                title: "Atencion!",
                toaster: "b-toaster-top-center",
                solid: true,
                variant: "danger",
              }
            );
            this.$router.push({
              name: "renovarContrato",
            });
          }
        } catch (err) {
          this.$bvToast.toast(err.response.data.message, {
            title: "Atencion!",
            toaster: "b-toaster-top-center",
            solid: true,
            variant: "danger",
          });
        }
      }
    },
    verificarContrato() {
      var fechaHoy = new Date();
      fechaHoy.setHours(0, 0, 0, 0);
      var fechaContrato = new Date(this.contrato[0].hasta);
      fechaContrato.setHours(0, 0, 0, 0);
      if (fechaHoy <= fechaContrato) {
        if (
          this.contrato[0].cantDestacada <= 0 &&
          this.contrato[0].cantnormal <= 0
        ) {
          this.$root.$bvToast.toast(
            "No dispones de publicaciones para publicar el producto,volve a renovar el contrato aca!",
            {
              title: "Atencion!",
              toaster: "b-toaster-top-center",
              solid: true,
              variant: "danger",
            }
          );
          this.$router.push({
            name: "renovarContrato",
          });
        }
      } else {
        this.$root.$bvToast.toast(
          "La fecha de el contrato se vencio, volve a renovarlo para publicar en MALAMBO",
          {
            title: "Atencion!",
            toaster: "b-toaster-top-center",
            solid: true,
            variant: "danger",
          }
        );
        this.$router.push({
          name: "renovarContrato",
        });
      }
    },
    async getPreciosPublicaciones() {
      try {
        const response = await PublicacionService.getPreciosPublicaciones();
        this.preciosPublicacion = response.data.data;
      } catch (err) {
        this.$root.$bvToast.toast(
          "No estamos encontrando los precios de la publiccaion, de mientras podes ver los productos publicados en MALAMBO ;)",
          {
            title: "Atencion!",
            toaster: "b-toaster-top-center",
            solid: true,
            variant: "danger",
          }
        );
        this.$router.push("/");
      }
    },
    async misPublicaciones() {
      try {
        const response = await PublicacionService.getPublicoUsuario({
          idUsuario: this.getUserId,
        });       
        console.log(response)
        if (response.data.error == false){
          this.yapublico=response.data.data   
          if (!this.yapublico){
             this.valorBotonFinalizar = "Finalizar";
            this.valorUltimoPaso= "Finalizar"
          }
           
        }
   
        
      } catch (err) {
        console.lo(err)
      }
    },
  },
  mounted() {
    axios
      .all([
         this.misPublicaciones(),
        this.getcategorias(),
        this.getcategoriasHijas(),
        this.getContratosUser(),
        this.getPreciosPublicaciones(),
       
      ])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
