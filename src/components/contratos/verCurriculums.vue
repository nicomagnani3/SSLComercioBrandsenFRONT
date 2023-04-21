<template>
  <div>
    <br>
    <div class="col-sm-10 col-lg-12 col-xl-8 mx-auto position-static">
      <div>
        <div class="card position-static form-group rounded border-12">
          <div class="card-body px-3 pb-0">
            <div class="card-title" style="line-height: 2">
              <div class="text-center mt-2">
                <h2 class="card-title">Listado de Curriculums</h2>
              </div>
            </div>
            <!--  <div class="body">
      <div fluid class="categoria">
        <b-row class="pb-3">
          <b-col class="text-center pt-3">
            <p class="h1 font-britannic text">
              <strong class="parrafoCategorias">Listado de Curriculums </strong>
            </p>
          </b-col>
        </b-row>
      </div>
    </div> -->
            <br />
            <div v-if="!loading">
              <b-container>
                <b-col lg="4" class="my-1">
                  <b-input-group size="sm">
                    <b-form-input
                      id="filter-input"
                      v-model="filter"
                      type="search"
                      placeholder="Buscar por nombre o ID"
                    ></b-form-input>

                    <b-input-group-append>
                      <b-button :disabled="!filter" @click="filter = ''"
                        >Buscar</b-button
                      >
                    </b-input-group-append>
                  </b-input-group>
                </b-col>
                <b-table
                  class="flip-list-move"
                  small
                  responsive
                  :items="curriculums"
                  :fields="fields"
                  :current-page="currentPage"
                  :filter="filter"
                  :per-page="perPage"
                  show-empty
                  empty-text="No se encontraron curriculums"
                >
                  <!-- @row-selected="onRowSelected" -->
                  <div slot="table-busy" class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Cargando...</strong>
                  </div>
                  <template v-slot:cell(accion)="row">
                    <b-button
                      id="btnConsentimiento"
                      variant="outline-primary"
                      @click="descargarCV(row.item.id, row.item.tipo)"
                      title="Descargar Curriculum"
                    >
                      <b-icon icon="cloud-download" variant="outline-primary">
                      </b-icon>
                    </b-button>
                    <b-button
                      variant="outline-danger"
                      @click="eliminarCV(row.item.id)"
                      title="Eliminar Curriculum"
                    >
                      <b-icon icon="trash" variant="outline-primary"> </b-icon>
                    </b-button>
                  </template>
                </b-table>
                <div class="d-flex justify-content-center">
                  <b-pagination
                    pills
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                  ></b-pagination>
                </div>
              </b-container>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 
<script>
import Contratos from "@/services/ContratosService";
import axios from "axios";
export default {
  name: "vencimientoContrato",
  props: {},
  data() {
    return {
      perPage: 20,
      currentPage: 1,
      filter: null,

      loading: true,
      curriculums: [],
      currentPagePaginate: 1,
      totalRows: 0,
      fields: [
        { key: "id", label: "ID", class: "text-center p2" },
        { key: "nombre", label: "Nombre", class: "text-left p2" },
        { key: "accion", label: "Acciones", class: "text-left p2" },
      ],
    };
  },
  computed: {},
  created() {},
  methods: {
    async getCurriculums() {
      try {
        const response = await Contratos.getCurriculums();
        console.log(response);
        this.curriculums = response.data.data;
        this.totalRows = this.curriculums.length;
      } catch (err) {
        this.$bvToast.toast(err.response.data.message, {
          title: "Atencion!",
          toaster: "b-toaster-top-center",
          solid: true,
          variant: "danger",
        });
      }
    },
    async descargarCV(id, tipo) {
      try {
        await Contratos.descargarCV(id, tipo);
      } catch (error) {
        console.log(error);
      }
    },
    async eliminarCV(id) {
      try {
        const response = await Contratos.deleteCurriculum(id);
        if (response.data.code == 200) {
          this.$root.$bvToast.toast(
            "Se elimino de la listad de Curriculums el curriculum " + id,
            {
              title: "Atencion!",
              toaster: "b-toaster-top-center",
              solid: true,
              variant: "success",
            }
          );
          this.getCurriculums();
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    axios
      .all([this.getCurriculums()])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
ul {
  column-count: 3;
}
</style>
       