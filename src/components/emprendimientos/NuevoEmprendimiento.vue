<template>
    <div v-if="loading" class="text-center">
    <br /><br />    <br /><br />
    <b-spinner
       style="width: 7rem; height: 7rem"
      variant="warning"
      label="Text Centered"
    >
    </b-spinner>
  </div>
  <div v-else>
    <b-row>
      <b-col cols="12">
        <form-wizard
          @on-complete="onComplete"
          title="Malambo te simplifica las cosas"
          subtitle="Elegi lo que quieras publicar en unos simples pasos"
          back-button-text="Volver!"
          next-button-text="Siguiente!"
          finish-button-text="Finalizar"
          color="#000000"
          error-color="#dc3545"
        >
          <tab-content
            title="¡Hola! Antes que nada contanos,¿qué vas a publicar?"
            style="color: rgb(10 10 10)"
          >
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
          <tab-content title="Finalizar">
            <PagarEmprendimiento
              :publicacion="this.publicacionEmprendimiento"
              :destacada="this.publicacionEmprendimiento.destacada"
              :imagen="this.imgPrimeraEmprendimiento"
              :finalizo="this.presionoFinalizar"
              :contrato="this.contrato"
            >
            </PagarEmprendimiento>
          </tab-content>
        </form-wizard>
      </b-col>
    </b-row>
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
import Contratos from "@/services/ContratosService";

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
      loading: true,
      contrato: [],
      publicacionEmprendimiento: [],
      alerts: [],
      montoEntregaInvalido: false,

      imgPrimeraEmprendimiento: [
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
        if (!this.presionoCrear) {
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
          this.$root.$bvToast.toast(
            "Se creo con exito el emprendimiento, gracias por confiar en MALAMBO",
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
    async getContratosUser() {
      try {
        const response = await Contratos.getContratosUser({
          user: this.getUserId,
        });
        this.contrato = response.data.data;
        if (response.data.error == false && response.data.data.length > 0) {
          this.verTipoPublicacion();
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
    },
    verTipoPublicacion() {
      if (Number(this.contrato[0].cantnormal) > 0) {
        this.publicacionEmprendimiento.destacada = false;
      } else {
        this.publicacionEmprendimiento.destacada = true;
      }
    },
    verificarContrato() {
      var fechaHoy = new Date();
      fechaHoy.setHours(0, 0, 0, 0);
      var fechaContrato = new Date(this.contrato[0].hasta);
      fechaContrato.setHours(0, 0, 0, 0);
      if (fechaHoy <= fechaContrato){      
        if (this.contrato[0].cantDestacada <= 0  && this.contrato[0].cantnormal <= 0){
          this.$root.$bvToast.toast(
            "No dispones de publicaciones para publicar el emprendimiento,volve a renovar el contrato aca!",
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
      }else{
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
  },
  mounted() {
    axios
      .all([this.getEmprendimientos(), this.getContratosUser()])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
