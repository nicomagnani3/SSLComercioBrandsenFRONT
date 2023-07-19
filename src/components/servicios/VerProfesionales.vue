<template>
<div>
    <div v-if="loading" class="text-center">
      <br /><br />
      <b-spinner
     style="width: 7rem; height: 7rem"
        variant="warning"
        label="Text Centered"
      >
      </b-spinner>
    </div>
    <div v-else class="body">
      <div fluid class="categoria">
        <b-row class="pb-2">
          <b-col class="text-center pt-3">
            <br />
            <p class="h1 font-britannic text">
              <strong class="parrafoCategorias">Profesionales</strong>
            </p>
          </b-col>
        </b-row>
      </div>
      <br />
      <b-row class="text-center">
        <b-col cols="3" class="text-center d-none d-sm-none d-md-block">
        </b-col>
        <b-col>
          <b-list-group>
            <b-list-group-item
              button
              class="list-group-item"
              v-for="item in this.profesionales"
              :key="item.id"
              @click="verEmpresa(item)"
            >
              <br />
              <a class="buscador">{{ item.nombre }}</a>
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col class="text-center d-none d-sm-none d-md-block"></b-col>
      </b-row>
    </div>
</div>
</template>
<script>
import ServiciosService from "@/services/ServiciosService";

import axios from "axios";
export default {
  name: "verRubros",
  components: {},
  data() {
    return {
      loading: false,
      profesionales: [],
    };
  },
  created() {},
  computed: {},
  methods: { 
     async getServiciosHijos() {
      try {
        const response = await ServiciosService.getserviciossHijos();
        this.categoriasHijas = response.data.data;
 this.profesionales = this.categoriasHijas.filter(
        (c) => c.idPadre == 19
      );
      this.profesionales = this.ordenarDatos(this.profesionales);
      } catch (err) {
        this.categorias = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
      }
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
        verEmpresa(empresa) {
      const path = `/productos/${empresa.nombre}`;
      if (this.$route.path !== path)
        this.$router.push({
          name: "productos",
          query: {
            q: this.searchQuery,
            t: new Date().getTime(),
          },
          params: {
            producto: empresa.nombre,
            empresa: empresa.usuario,
          },
        });
    },

  },
  mounted() {
    axios
      .all([ this.getServiciosHijos()])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style >