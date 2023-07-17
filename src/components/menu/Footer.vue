<template>
  <b-container fluid class="contenedor" :style="{ '--color': showPruebaColor ? color : $t('footer.color')  }">
    <teleport to="head">
      <component :is="'script'" type="application/ld+json">
        { "@context": "https://schema.org", "@type": "WPFooter", "url":
        "https://www.malambobelgrano.com.ar/", "abstract": "Malambo  Belgrano es una
        plataforma digital que impulsa la compra y venta de Servicios, Productos
        de Belgrano provincia de Buenos Aires Argentina, tambien manteniendo la
        información de Micros,Farmacias,Noticias y Clima", "accountablePerson":{
        "additionalName":"Malambo Belgrano", "address": "General Belgrano
        Provincia de Buenos Aires", }, "comment":"Gracias por los horarios de
        los micros, farmacias de turna y los valores del Dolar " "about": {
        "@type": "CommunicateAction", "inLanguage": "Español", "agent": {
        "@type" : "Organization", "url": "https://www.malambobelgrano.com.ar/",
        "email": "info@malambobelgrano.com.ar", "legalName":"Malambo Belgrano",
        "logo": "@/assets/MalamboLogo.png", "alternateName":"Compra-Venta,
        e-commerce", "description": "e-commerce, Productos, Servicios,
        información", "sameAs": "https://www.generalbelgrano.tur.ar/",
        "contactPoint" : { "@type" : "ContactPoint", "telephone" :
        "+542223431948", "contactType" : "Productos, Servicios,información" } }
        } }
      </component>
    </teleport>
    <footer itemscope itemtype="https://schema.org/WPFooter">
      <b-row class="fila">
        <b-col xs="12" md="6" lg="3" align-self="center">
              <img
            v-if="!showPrueba"
            class="logo"
            src="@/assets/MalamboLogo.png"
            alt=""        
          />
          <img v-else class="logo" :src="logoPrueba" alt=""/>
  
        </b-col>

        <b-col xs="12" md="12" lg="3" align-self="center">
          <ul>
            <li>{{ $t('footer.busca_articulos') }}</li>
            <li>{{ $t('footer.busca_servicios') }}</li>
            <li>{{ $t('footer.busca_profesionales') }}</li>
          </ul>
        </b-col>

        <b-col xs="12" md="12" lg="3" align-self="center">
          <ul>
            <li>{{ $t('footer.mismo_sitio') }}</li>
            <li>{{ $t('footer.rapido_facil') }}</li>
            <li>{{ $t('footer.ofertas') }}</li>
          </ul>
        </b-col>
 <!-- Agrega las metaetiquetas para mejorar la visibilidad en Google -->
 <meta name="description" content="Tu mejor opción para encontrar artículos, servicios y profesionales en Belgrano. Todo en un mismo sitio con las mejores ofertas. Rápido, fácil y seguro.">
  <meta name="keywords" content="Belgrano, General Belgrano, artículos, servicios, profesionales, ofertas">
  <meta name="geo.placename" content="General Belgrano">
  <meta name="geo.position" content="-35.766666666667;-58.5">
  <meta name="ICBM" content="-35.766666666667, -58.5">
        <b-col  align-self="end">     
          <b>{{ $t('footer.email') }}</b>
          <!--    <p style="cursor: pointer">
          <a @click="verSoporte()"><strong>Soporte</strong></a>
        </p> -->
        <div>
          <a
          :href="$t('footer.link_wsp')"
            target="_black"
          >
            <img class="icono" src="@/assets/logowsp.png" alt="" />
          </a>
          <a :href="$t('footer.link_instagram')" target="_black">
            <img class="icono" src="@/assets/logo-ig.png" alt="" />
          </a>
          <a :href="$t('footer.link_facebook')" target="_black">
            <img class="icono" src="@/assets/icono-face.png" alt="" />
          </a></div>
        </b-col>
      </b-row>

      
    </footer>
  </b-container>
</template>


<script>
export default {
  name: "Footer",
  props: {
    color: {
      type: String,
      default: () => ("#ffce4e"),
    },
    logoPrueba: {
      type: [String],
      default: () => "",
    },
    showPrueba: {
      type: Boolean,
      default: false,
    },
    showPruebaColor: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
    }
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
  background-color: var(--color);
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

