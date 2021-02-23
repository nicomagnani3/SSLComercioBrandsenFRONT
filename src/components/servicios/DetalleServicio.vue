<template>
  <div>
    <b-row class="pb-2">
      <b-col class="text-center pt-3">
        <p class="h3 text-center">Detalles de tu publicacion</p>
      </b-col>
    </b-row>
    <ValidationObserver ref="detalleServicio">
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
        <!--    <b-card class="mb-3" header="Publicacion"> -->
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
       <!--    <b-col lg="5" md="6">
            <b-form-group id="precio-label" label="Precio:" label-for="precio">
              <ValidationProvider
                :name="'precio '"
                :rules="'required'"
                v-slot="{ errors, valid }"
              >
                <vue-numeric
                  style="text-align: right"
                  v-model="publicacion.precio"
                  separator="."
                  :min="0"
                  :precision="2"
                  v-on:input="actualizarMontoEntrega"
                  :state="errors[0] ? false : valid ? true : null"
                ></vue-numeric>
                <p
                  v-if="montoEntregaInvalido"
                  style="color: red; font-size: 10px"
                >
                  el monto debe ser mayor
                </p>
              </ValidationProvider>
            </b-form-group>
          </b-col> -->
        </b-row>
        <b-row>
          <b-col lg="10" md="10">
            <b-form-checkbox v-model="publicacion.destacada" name="checkbox-1">
              Publicacion destacada (las publicaciones destacadas tienen un costo adicional y se visualizan en el home de Malambo)
            </b-form-checkbox>
          </b-col>
          <hr />
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group
              class="mb-0"
              id="observaciones-label"
              label="Descripción(opcional)"
              label-for="observaciones"
            >
              <b-form-textarea
                id="observaciones"
                size="sm"
                rows="8"
                v-model="publicacion.observaciones"
                placeholder="Descripción del servicio que vas a publicar"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
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
      let result = await this.$refs.detalleServicio.validate();
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