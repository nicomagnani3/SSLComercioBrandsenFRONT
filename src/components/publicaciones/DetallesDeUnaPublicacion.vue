<template>
  <div>
   <!--  <p>Se publico el dia : {{ publicacion.fecha | formatDate }}</p>
    <p>Tipo de publicacion: {{ publicacion.tipo }}</p>
    Categoria :<span class="buscador" style="color: #ffc107" @click="buscarCategoria(publicacion.padre)"> {{ publicacion.padre }}</span>
    
    <p v-if="Number(publicacion.precio) > Number(0)">
      Precio: {{ getImporte(publicacion.precio) }}
    </p>    -->
    <div>   
      <p style="  white-space: pre-wrap;"> {{ publicacion.descripcion }}</p>
      <p v-if="Number(publicacion.precio) > Number(0)">
     <strong> Precio:</strong> {{ getImporte(publicacion.precio) }}
    </p> 
    </div>
     <div>   
      <p> <strong>Contacto:</strong></p>
      <a
        v-if="publicacion.telefono != null "
        :href="
          'https://api.whatsapp.com/send?text=Hola!%20,desde%20Malambo%20observe%20la%20publicacion%20' +
          publicacion.titulo +
          ',queria%20obtener%20mas%20detalles' +
          '&phone=+54' +
          acomodarCelular(publicacion.telefono)
        "
        target="_black"
      >
        <img
          v-if=" publicacion.telefono != null"
          src="@/assets/wsp.png"
          alt=""
          height="auto"
          style="width: 40px; margin: 4px"
        />&nbsp;&nbsp;
      </a>
      <a
        :href="
          'https://mail.google.com/mail/?view=cm&fs=1&to=' +
          publicacion.email +
          '&body=Hola!%20,desde%20Malambo%20observe%20la%20publicacion%20' +
          publicacion.titulo +
          ',queria%20obtener%20mas%20detalles' +
          '&su=Malambo consulta por ' +
          publicacion.titulo
        "
        target="_black"
        >&nbsp;&nbsp;
        <img
          v-if="publicacion.email != null"
          src="@/assets/mail.png"
          alt=""
          height="auto"
          style="width: 40px; margin: 4px"
        />
      </a>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "imagenesDeUnaPublicacion",
  components: {},
  props: {
    publicacion: {
      type: Object,
    },
    },
  data() {
    return {
      loading: true,
    };
  },

  methods: {
      buscarCategoria(nombre){
          const path = `/buscarProductos/${nombre}`;
      if (this.$route.path !== path)
        this.$router.push({
          name: "buscarProductos",
          query: {
            q: this.searchQuery,
            t: new Date().getTime(),
          },
          params: {
            producto: nombre,
           
          },
        });
      },
    getImporte(precio) {
      const options2 = { style: "currency", currency: "USD" };
      const numberFormat2 = new Intl.NumberFormat("en-US", options2);
      return numberFormat2.format(precio);
    },
    aceptarDetalle() {
      this.$emit("okDetalles");
    },
    acomodarCelular(telefono) {
      if (telefono[0] == 0) {
        return telefono.substr(1);
      }
      return telefono;
    },
  },
  mounted() {},
};
</script>

<style scoped>
.imgProd img {
  object-fit: contain;
}

.imgProd {
  width: 50%;
}
</style>>

