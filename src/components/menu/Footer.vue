<template>
  <b-container fluid class="contenedor">
      <teleport to="head">
    <component :is="'script'" type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "WPFooter",
        "url": "https://www.malambobrandsen.com.ar/",
        "abstract": "Malambo es una plataforma digital que impulsa la compra y venta de Servicios, Productos de  Brandsen provincia de Buenos Aires Argentina, tambien manteniendo la información de Micros,Farmacias,Noticias y Clima",
        "accountablePerson":{
            "additionalName":"Malambo Brandsen",
            "address": "Coronel Brandsen Provincia de Buenos Aires",
        },
        "comment":"Gracias por los horarios de los micros, farmacias de turna y los valores del Dolar "
        "about": {
            "@type": "CommunicateAction",
            "inLanguage": "Español",
            "agent": {
                          "@type" : "Organization",
                          "url": "https://www.malambobrandsen.com.ar/",
                          "email": "info@malambobrandsen.com.ar",
                          "legalName":"Malambo Brandsen",
                          "logo": "@/assets/MalamboLogo.png",
                          "alternateName":"Compra-Venta, e-commerce",
                          "description": "e-commerce, Productos, Servicios, información",
                          "sameAs": "https://www.infobrandsen.com.ar/",
                        "contactPoint" : 
                          { "@type" : "ContactPoint",
                            "telephone" : "+542223431948",
                            "contactType" : "Productos, Servicios,información"
                          }
                     }
          }
      }
    </component>
  </teleport>
    <footer  itemscope itemtype="https://schema.org/WPFooter">
    <b-row class="fila">
      <b-col xs="12" md="6" lg="3" align-self="center">
        <img class="logo" src="@/assets/MalamboLogo.png" alt="" />
      </b-col>

      <b-col xs="12" md="12" lg="3" align-self="center">
        <ul>
          <li>Buscá articulos en Brandsen</li>
          <li>Buscá servicios en Brandsen</li>
          <li>Buscá profesionales en Brandsen</li>
        </ul>
      </b-col>

      <b-col xs="12" md="12" lg="3" align-self="center">
        <ul>
          <li>Todo en un mismo sitio</li>
          <li>Rápido y fácil</li>
          <li>Las mejores ofertas</li>
        </ul>
      </b-col>

      <b-col xs="12" md="12" lg="3" align-self="end">
        <p>Contáctenos:</p>
        <p>info@malambobrandsen.com.ar</p>
     <!--    <p style="cursor: pointer">
          <a @click="verSoporte()"><strong>Soporte</strong></a>
        </p> -->

        <a
          :href="
            'https://api.whatsapp.com/send?text=Hola%20Malambo!' +
            '&phone=+542223431948'
          "
          target="_black"
        >
          <img class="icono" src="@/assets/logowsp.png" alt="" />
        </a>
        <a href="https://www.instagram.com/malambobrandsen/" target="_black">
          <img class="icono" src="@/assets/logo-ig.png" alt="" />
        </a>
        <a href="https://www.facebook.com/MalamboBrandsen" target="_black">
          <img class="icono" src="@/assets/icono-face.png" alt="" />
        </a>
      </b-col>
    </b-row>

    <b-row class="big">
      <b-col>
        <a href="">
          <img class="logoBig" src="@/assets/bigdatapng.png" alt="" />
        </a>
      </b-col>
    </b-row>
    </footer>
  </b-container>
</template>


<script>
export default {
  name: "Footer",
  components: {},
  data() {
    return {};
  },
  methods: {
    verSoporte() {
      this.$router.push({
        name: "verSoporte",
      });
    },
  },
};
</script>

<style  scoped>
.contenedor {
  height: auto;
  background-color: #ffce4e;
}

.columna {
  border: 1px solid black;
}
.containPubli {
  margin: 10px;
}

.logo {
  width: 300px;
}

.icono {
  width: 35px;
  margin: 5px;
}

.logoBig {
  width: 40%;
}

.big {
  text-align: center;
}
</style>

