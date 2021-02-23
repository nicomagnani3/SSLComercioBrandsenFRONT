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
      finish-button-text="Obtener boton de pago"
      color="#FFCE4E"
    >
      <tab-content title="¡Hola! Antes que nada contanos,¿qué vas a publicar?">
        <ListarEmprendimientos
          :emprendimientos="this.emprendimientos"
          @update-emprendimiento="updateEmprendimiento"
        ></ListarEmprendimientos>
      </tab-content>
      <tab-content
        title="Detalles de tu emprendimiento"
        :before-change="validarDetalleEmprendimiento"
      >
        <DetalleEmprendimiento
          ref="detalleEmprendimiento"
          :publicacion="this.publicacionEmprendimiento"
        ></DetalleEmprendimiento>
      </tab-content>
      <tab-content
        title="Imagenes de tu emprendimiento"
        :before-change="validarImagenes"
      >
        <ImagenesCarga
          ref="altaImagenes"
          :imagenes="this.imagenesEmprendimiento"
          :imgPrimera="this.imgPrimeraEmprendimiento"
        >
        </ImagenesCarga>
      </tab-content>
      <tab-content title="Pagar el emprendimiento">
        <PagarEmprendimiento
          :publicacion="this.publicacionEmprendimiento"
          :destacada="this.publicacionEmprendimiento.destacada"
          :imagen="this.imgPrimeraEmprendimiento"
          :finalizo="this.presionoFinalizar"
        >
        </PagarEmprendimiento>
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import EmprendimientoService from "@/services/EmprendimientoService";
import ListarEmprendimientos from "@/components/emprendimientos/ListarEmprendimientos.vue";
import DetalleEmprendimiento from "@/components/emprendimientos/DetalleEmprendimiento.vue";
import PagarEmprendimiento from "@/components/emprendimientos/PagarEmprendimiento.vue";
import ImagenesCarga from "@/components/imagenes/ImagenesCarga.vue";
import MercadoPago from "@/services/MercadoPago";

export default {
  name: "nuevaPublicacion",
  components: {
    ImagenesCarga,
    ListarEmprendimientos,
    DetalleEmprendimiento,
    PagarEmprendimiento,
  },
  data() {
    return {
      presionoFinalizar: false,
      tipoPublicacion: [],
      tipoPublicacionSeleccionada: null,
      categorias: [],
      categoriaSeleccionada: null,
      categoriasHijas: [],
      categoriaHijaElegida: [],
      categoriaHijaSeleccionada: null,
      emprendimientos: [],
      emprendimientoSeleccionado: null,
      emprendimientosHijos: [],
      emprendimientoHijoElegido: [],
      emprendimientoHijoSeleccionado: null,
      pagoPublicacion: false,
      loading: true,     
      publicacionEmprendimiento: [],
      alerts: [],
      montoEntregaInvalido: false,
         
      imgPrimeraEmprendimiento: [
        {
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
        }
      ],
      imagenesEmprendimiento: [],
      presionoCrear: false,
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
    async validarDetalleEmprendimiento() {
      let result = await this.$refs.detalleEmprendimiento.validate();
      return result;
    },
    async validarPago() {
      let result = await this.$refs.validarPago.validate();
      if (result == false) {
        alert(
          "Debe efectuar el pago para poder finalizar la publicacion en Malambo"
        );
        return false;
      }
      return result;
    },
    async validarImagenes() {
      let result = await this.$refs.altaImagenes.validate();
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
        if (!this.presionoCrear){
              this.crearPublicacion();    
        }
       
      }
    },
    async crearPublicacion() {
      this.presionoCrear = true;
      
      try {
        const response = await EmprendimientoService.addEmprendimiento({
          titulo: this.publicacionEmprendimiento.titulo,
          importe: this.publicacionEmprendimiento.precio,
          observaciones: this.publicacionEmprendimiento.observaciones,
          destacada: this.publicacionEmprendimiento.destacada,
          imagenes: this.imagenesEmprendimiento,
          imgPrimera: this.imgPrimeraEmprendimiento[0].base64,
          emprendimiento: this.emprendimientoSeleccionado,
          usuarioID: this.getUserId,
        });
        if (response.data.error == false) {
          this.validarPagoMercadoPago(response.data.data)
        }
      } catch (error) {
        this.$bvToast.toast(`No se pudo crear la publicacion`, {
          title: error.data,
          toaster: "b-toaster-top-center",
          solid: true,
          variant: "danger",
        });
        this.$router.push({
          name: "Home",
        });
      }
    },
    async validarPagoMercadoPago(idPublicacion){
       let precioPublicacion = this.publicacionEmprendimiento.destacada
          ? 600
          : 400;
        const response = await MercadoPago.crearPreferencia({
          titulo: this.publicacionEmprendimiento.titulo,
          precioPublicacion: precioPublicacion,
          idPublicacion:idPublicacion,
          descripcion: this.publicacionEmprendimiento.observaciones,         
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
    updateEmprendimiento(emprendimiento) {
      this.emprendimientoSeleccionado = emprendimiento[0].id;
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
    async getEmprendimientos() {
      try {
        const response = await EmprendimientoService.getEmprendimientos();
        this.emprendimientos = response.data.data;
        this.emprendimientos = this.ordenarDatos(this.emprendimientos);
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
  },
  mounted() {
    axios
      .all([
        this.getEmprendimientos(),
        //this.getEmprendimientosHijos(),
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
