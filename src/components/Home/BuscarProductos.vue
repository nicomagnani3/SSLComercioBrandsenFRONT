<template>
  <b-container class="nuevoCobro">
    <div>
      <b-row class="pb-2">
        <b-col class="text-center pt-3">
          <p class="h3 ">{{ producto }}</p>
        </b-col>
      </b-row>

      <div class="col-md-8 col- col-sm-12 col-lg-6 col-xl-6">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">asd</h3>
          </div>
          <div class="card-body">
            <p>
              <strong
                >Nombre del Producto:
                <!-- {{ product.name }} --></strong
              >
            </p>
            <p><strong>Descripción del Producto: "asd"</strong></p>
            <p><strong>Precio:asd</strong></p>
            <p><strong>Fecha de creación:sad</strong></p>

            <button class="btn btn-danger">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "AlbumList",
  data() {
    return {
      producto: "",
    };
  },
  created() {
    this.producto = this.$route.params.producto;
  },
};
</script>