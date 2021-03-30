<template>
  <div>
    <div fluid class="categoria">
      <b-row class="pb-2">
        <b-col class="text-center pt-3">
          <br />
          <p class="h1 font-britannic text">
            <strong>Guias de ayuda para los usuarios</strong>
          </p>
        </b-col>
      </b-row>
    </div>
    <br />
    <b-container class="bv-example-row">
      <b-row class="mb-3">
        <b-col>
          <div class="card" style="width: 18rem">
            <img
              src="@/assets/registrarse.png"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title"><strong>Como registrarte</strong></h5>
              <p class="card-text">
                Dependiendo el tipo de usuario, te explicamos como te podes
                registrar en unos simples pasos.
              </p>
              <br />
              <br />
              <br />
              <a
                href="https://www.youtube.com/watch?v=KQMmuGVfHEA&t=216s&ab_channel=MalamboBrandsen"
                target="_black"
                class="btnMas"
                >Ver video</a
              >
            </div>
          </div>
        </b-col>
        <b-col>
          <div class="card" style="width: 18rem">
            <img
              src="@/assets/publicacion.png"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title"><strong>Como Publicar</strong></h5>
              <p class="card-text">
                Dependiendo lo que quieras publicar te explicamos los pasos a
                seguir para publicar tu producto,empendimiento o servicio
              </p>
              <br />
              <br />

              <a
                href="https://www.youtube.com/watch?v=YUz3QgG3780&t=1s&ab_channel=MalamboBrandsen"
                target="_black"
                class="btnMas"
                >Ver video</a
              >
            </div>
          </div>
        </b-col>
        <b-col>
          <div class="card" style="width: 18rem">
            <img
              src="@/assets/publicidades.png"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title"><strong>Tipos de publicidades</strong></h5>
              <p class="card-text">
                Tenemos diferentes tipos de publicidades con distintos costos,
                podes observar la que mas te gusta y contactarnos!
              </p>
              <br />
              <br />
              <br />
              <a
                href="https://www.youtube.com/watch?v=tEoLzb0M54w&t=33s&ab_channel=MalamboBrandsen"
                target="_black"
                class="btnMas"
                >Ver video</a
              >
            </div>
          </div>
        </b-col>
        <b-col>
          <div class="card" style="width: 18rem">
            <img src="@/assets/contrato.png" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">
                <strong>Como contratar un servicio</strong>
              </h5>
              <p class="card-text">
                En unos simples pasos te explicamos como contratar el servicio
                para tus productos, emprendimiento o servicio queden activos
                durante todo el mes
              </p>
              <a
                href="https://www.youtube.com/watch?v=KQMmuGVfHEA&ab_channel=MalamboBrandsen"
                target="_black"
                class="btnMas"
                >Ver video</a
              >
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <div fluid>
      <b-row class="pb-2">
        <b-col class="text-center pt-3">
          <br />
          <p class="h1 font-britannic text">
            <strong>Necesitas comunicarte con nosotros?</strong>
          </p>
        </b-col>
      </b-row>
    </div>
    <b-container>
    <b-col >
      <div class="card" style="width: 18rem">
        <img src="@/assets/consultas.png" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">
            <strong>Nosotros te ayudamos con cualquier consulta</strong>
          </h5>
          <p class="card-text" style="white-space: pre-wrap">
            -En tu publicacion no encontras la categoria? <br />
            -Queres averiguar los precios de las publicidades ?<br />
            -No encontras tu publicacion?<br />
            -Tuviste problemas con Mercado pago?<br>
           <strong> -Mandanos un mail o un wsp y te contestamos enseguida!</strong>
          </p>
          <a
            :href="
              'https://api.whatsapp.com/send?text=Hola!%20,me%20comunico' +
              '&phone=+542223431948'
            "
            target="_black"
          >
            <img
              src="@/assets/wsp.png"
              alt=""
              height="auto"
              style="width: 45px; margin: 4px"
            />&nbsp;&nbsp;
          </a>
          <a
            :href="'https://mail.google.com/mail/?view=cm&fs=1&to=info@malambobrandsen.com.ar&body=Hola!%20,me%20comunico&su=Malambo%20consulta%20soporte'"
            target="_black"
            >&nbsp;&nbsp;
            <img
              src="@/assets/mail.png"
              alt=""
              height="auto"
              style="width: 45px; margin: 4px"
            />
          </a>
        </div>
      </div>
    </b-col>
    </b-container>
  </div>
</template>
<script>
export default {
  name: "VerEmpresas",
  components: {},
  data() {
    return {
      loading: false,
      empresas: [],
      categoriasHijas: [],
      categoriaHijaElegida: [],
    };
  },
  created() {},
  computed: {},
  methods: {},
  mounted() {},
};
</script>

<style >
.btnMas {
  /* white-space: normal; */
  background: #ffce4e;
  background: linear-gradient(45deg #00ddf5 0%, #00d9d7 32%, #ffce4e 100%);
  border-radius: 14px;
  margin: -3px 0 0 0;
  padding: 14px 57px 12px 60px;
  width: 88%;
  text-transform: none;
  font-size: 16px;
  /* line-height: 11px; */
  color: #fff;
}
</style>
