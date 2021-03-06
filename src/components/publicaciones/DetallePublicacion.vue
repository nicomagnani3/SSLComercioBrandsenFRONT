<template>
  <div>
    <b-row class="pb-2">
      <b-col class="text-center pt-3">
        <p class="h3 text-center">Detalles de tu publicacion</p>
      </b-col>
    </b-row>
    <ValidationObserver ref="detallePublicacion">
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
        <b-card class="mb-3" header="Publicacion">
          <b-row>
            <b-col lg="5" md="6">
              <b-form-group
                id="titulo-label"
                label="Titulo :"
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
            <b-col lg="5" md="6">
              <b-form-group
                id="precio-label"
                label="Precio:"
                label-for="precio"
              >
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
            </b-col>
          </b-row>
          <b-row>
            <div v-if="contrato.length > 0">
              <b-col md="12">
                <b-form-group
                  id="TipoPublicacion-label"
                  label="Tipo de publicacion :"
                  label-for="TipoPublicacion"
                >
                  <ValidationProvider
                    :name="'TipoPublicacion '"
                    :rules="'required'"
                    v-slot="{ errors, valid }"
                  >
                    <b-form-select
                      v-model="tipoSeleccionado"
                      size="sm"
                      required
                      :options="fArmarPaquete"
                      @change="verSiEsDestacada()"
                      :state="errors[0] ? false : valid ? true : null"
                    ></b-form-select>
                    <b-form-invalid-feedback
                      v-for="error in errors"
                      :key="error.key"
                    >
                      {{ error }}
                    </b-form-invalid-feedback>
                  </ValidationProvider>
                </b-form-group>
              </b-col>
            </div>
            <div v-else>
              <b-col lg="8" md="18">
                <b-form-group
                  id="TipoPublicacion-label"
                  label="Tipo de publicacion :"
                  label-for="TipoPublicacion"
                >
                  <ValidationProvider
                    :name="'TipoPublicacion '"
                    :rules="'required'"
                    v-slot="{ errors, valid }"
                  >
                    <b-form-select
                      v-model="tipoSeleccionado"
                      size="sm"
                      required
                      :options="fpreciosPublicaciones"
                      @change="verSiEsDestacada()"
                      :state="errors[0] ? false : valid ? true : null"
                    ></b-form-select>
                    <b-form-invalid-feedback
                      v-for="error in errors"
                      :key="error.key"
                    >
                      {{ error }}
                    </b-form-invalid-feedback>
                  </ValidationProvider>
                </b-form-group>
              </b-col>
            </div>
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
                  placeholder="Descripcion del producto que vas a publicar"
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
    preciosPublicacion: {
      type: Array,
    },

    contrato: {
      type: Array,
    },
  },
  data() {
    return {
      alerts: [],
      montoEntregaInvalido: false,
      tipoSeleccionado: null,
      options: [
        { value: null, text: "-- Seleccione el tipo de publicacion --" },
        { value: 1, text: "Publicacion estandar" },
        { value: 2, text: "Publicacion destacada (Home + redes sociales)" },
      ],
    };
  },
  methods: {
    actualizarMontoEntrega() {
      this.montoEntregaInvalido = false;
    },
    async validate() {
      let result = await this.$refs.detallePublicacion.validate();
      if (result == true) {
        if (Number(this.publicacion.precio) <= 10) {
          this.montoEntregaInvalido = true;
          return false;
        }
      }
      return result;
    },
    verSiEsDestacada() {
      console.log(this.publicacion);
      this.tipoSeleccionado == 1
        ? (this.publicacion.destacada = false)
        : (this.publicacion.destacada = true);
    },
        seleccionarPrimero(){
      this.tipoSeleccionado=1
    }
    
  },
  computed: {
    fpreciosPublicaciones() {
      let mc = this.preciosPublicacion.map((e) => ({
        value: e.id,
        text: e.nombre + ":  $" + " " + e.precio,
      }));
      mc.push({
        value: null,
        text: "-- Seleccione el tipo de publicacion --",
        disabled: true,
      });

      return mc;
    },
    fArmarPaquete(){
      if (Number(this.contrato[0].cantDestacada) >Number(0)){
         return [
                { value: null, text: "-- Seleccione el tipo de publicacion --" },
                { value: 1, text: "Publicacion estandar" },
                { value: 2, text: "Publicacion destacada (Home + redes sociales)" },
              ]
      }else{
          this.seleccionarPrimero()
          return [
                { value: null, text: "-- Seleccione el tipo de publicacion --" },
                { value: 1, text: "Publicacion estandar" },
              ]
      }
    }
  },
};
</script>

