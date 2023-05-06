<template>
  <div>
    <b-row class="pb-2">
      <b-col class="text-center pt-3">
        <p class="h3 text-center">
          <strong class="parrafoCategorias">
            Detalles de tu emprendimiento
          </strong>
        </p>
      </b-col>
    </b-row>
    <ValidationObserver ref="detalleEmprendimiento">
      <b-container class="pb-3">
        <b-form-group>
          <b-alert
            v-for="alert in alerts"
            dismissible
            v-bind:key="alert.key"
            show
            :variant="alert.variant"
            >{{ alert.message }}</b-alert
          >
        </b-form-group>
        <b-card
          class="mb-3"
          header="Emprendimiento"
          align="center"
          border-variant="success"
          header-border-variant="success"
          header-bg-variant="transparent"
        >
          <b-row>
            <b-col lg="5" md="6">
              <b-form-group
                id="titulo-label"
                label="Titulo (describa con detalles) :"
                label-for="titulo"
              >
                <ValidationProvider
                  :name="'titulo '"
                  :rules="'required'"
                  v-slot="{ errors, valid }"
                >
                  <b-form-input
                    size="sm"
                    v-model="publicacion.titulo"
                    :state="errors[0] ? false : valid ? true : null"
                  ></b-form-input>
                  <b-form-invalid-feedback
                    v-for="error in errors"
                    :key="error.key"
                  >
                    {{ error }}
                  </b-form-invalid-feedback>
                </ValidationProvider>
              </b-form-group>
            </b-col>
          </b-row>
          <!--    <b-row>
          <b-col lg="10" md="10">
            <b-form-checkbox v-model="publicacion.destacada" name="checkbox-1">
              Publicacion destacada (las publicaciones destacadas tienen un costo adicional y se visualizan en el home de +$t('footer.nombre_plataforma')
            </b-form-checkbox>
          </b-col>
          <hr />
        </b-row> -->
          <b-row>
            <b-col cols="12">
              <b-form-group
                class="mb-0"
                id="observaciones-label"
                label="Descripción(podes ingresar todo los datos que necesites mostrar)"
                label-for="observaciones"
              >
                <b-form-textarea
                  id="observaciones"
                  size="sm"
                  rows="8"
                  v-model="publicacion.observaciones"
                  placeholder="Descripción de tu emprendimiento,se recomienda en forma de listado y no todo junto para una mejor visualizacion,te sugerimos poner detallado tu ubicacion,horarios,dias de atencion, redes sociales y demas.."
                ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
      </b-container>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  props: {
    publicacion: {
      type: Array,
    },
  },
  data() {
    return {
      alerts: [],
      montoEntregaInvalido: false,
    };
  },
  methods: {
    actualizarMontoEntrega() {
      this.montoEntregaInvalido = false;
    },
    async validate() {
      let result = await this.$refs.detalleEmprendimiento.validate();
      if (result == true) {
        if (Number(this.publicacion.precio) <= 10) {
          this.montoEntregaInvalido = true;
          return false;
        }
      }
      return result;
    },
  },
};
</script>

<style>
</style>