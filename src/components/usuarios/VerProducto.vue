<template>
    <div>
        <section class="py-5">
            <div class="container px-4 px-lg-5 my-5">
                <div class="row gx-4 gx-lg-5 align-items-center">
                    <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0"
                            :src="`data:image/png;base64, ${producto.imagen}`" alt="..." /></div>
                    <div class="col-md-6">
                        <div class="small mb-1">{{ producto.padre }}</div>
                        <div class="small mb-1" v-if="producto.hijo">{{ producto.hijo }}</div>
                        <h1 class="display-5 fw-bolder">{{ producto.titulo }}</h1>
                        <div class="fs-5 mb-5">
                            <span class="text-decoration-line-through" v-if="producto.precio">${{ producto.precio }}</span>
                        </div>
                        <p class="lead" v-if="producto.descripcion != 'SN'">{{ producto.descripcion }}</p>
                        <div class="small mb-1" v-if="producto.telefono">Telefono: {{ producto.telefono }}</div>
                        <div class="small mb-1">Email: {{ producto.email }}</div>
                        <div class="d-flex">
                            <div class="button-container">
                                <a block class="btn btn btn--block card__btn btn-block color-wsp" v-if="producto.telefono"
                                    :href="'https://api.whatsapp.com/send?text=Hola!%20,desde%' + $t('footer.nombre_plataforma') + '%20observe%20la%20publicacion%20' +
                                        producto.titulo +
                                        ',queria%20obtener%20mas%20detalles' +
                                        '&phone=+54' +
                                        acomodarCelular(producto.telefono)
                                        " target="_black">
                                    <span style="margin-right: 4px;">Enviar WhatsApp </span>
                                    <i class="fa-brands fa-whatsapp" style="color: #ffffff;"></i>
                                </a>
                                <a :href="'https://mail.google.com/mail/?view=cm&fs=1&to=' +
                                    producto.email +
                                    '&su=' + $t('footer.nombre_plataforma') + ' consulta por ' +
                                    producto.titulo
                                    " target="_black" class="btn btn btn--block card__btn btn-block sitio-mail">
                                    <span style="margin-right: 4px;">Enviar Mail </span>
                                    <i class="fas fa-envelope"></i>
                                </a>
                                <b-btn v-if="producto.web" :href="producto.web" block
                                    class="btn btn btn--block card__btn btn-block sitio-button" target="_blank">
                                    <span style="margin-right: 6px;">Ir al sitio</span>
                                    <i class="fas fa-link" style="color: #ffffff;"></i>

                                </b-btn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <ImagenesDeUnaPublicacion :idPublicacion="this.id" :tipo="this.tipo.toUpperCase()"></ImagenesDeUnaPublicacion>
    </div>
</template>

<script>
import Vue from 'vue';

import axios from "axios";
import ProductosService from "@/services/ProductosService";
import ImagenesDeUnaPublicacion from "@/components/imagenes/ImagenesDeUnaPublicacion.vue";
export default {
    components: {
        ImagenesDeUnaPublicacion,
    },
    props: {
        tipo: {
            type: String,
            required: true
        },
        id: {
            required: true
        },
        nombre: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            producto: undefined,
        }
    },
    computed: {
        schemaProduct() {
            return {
                '@context': 'https://schema.org/',
                '@type': 'Product',
                'name': this.producto.titulo,
                'description': this.producto.descripcion,
                'image': `data:image/png;base64, ${this.producto.imagen}`,
                'category': this.producto.padre, // Agregamos la categoría
                'subcategory': this.producto.hijo, // Agregamos la subcategoría
                'offers': {
                    '@type': 'Offer',
                    'price': this.producto.precio,
                    'priceCurrency': 'ARS'
                },
                'location': {
                    '@type': 'Place',
                    'name': 'General Belgrano, Provincia de Buenos Aires, Argentina',
                    'address': {
                        '@type': 'PostalAddress',
                        'addressLocality': 'General Belgrano',
                        'addressRegion': 'Provincia de Buenos Aires',
                        'addressCountry': 'Argentina'
                    }
                }
                // Agrega más propiedades según lo necesites para tu producto
            };
        },
    },
    methods: {
        async getProducto() {
            try {

                let response = await ProductosService.getProducto({
                    tipo: this.tipo,
                    id: this.id
                });
                this.producto = response.data.publicacion
            } catch (err) {
                this.loading = true;
                this.getPorductos();
                this.productos = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
            }
        },
        acomodarCelular(telefono) {
            if (telefono[0] == 0) {
                return telefono.substr(1);
            }
            return telefono;
        },
    },
    mounted() {
        axios
            .all([this.getProducto()])
            .then(() => {
                this.loading = false;
                const script = Vue.createElement('script');
                script.setAttribute('type', 'application/ld+json');
                script.textContent = JSON.stringify(this.schemaProduct);
                document.head.appendChild(script);
            })
            .catch((err) => {
                console.log(err);
            });
    },

};
</script>

<style>
.color-wsp {
    border-color: #25D366 !important;
    background-color: #25D366 !important;
    color: white !important
}

.sitio-button {
    border-color: #007BFF !important;
    background-color: #007BFF !important;
    color: white !important
}

.sitio-mail {
    border-color: #999999 !important;
    background-color: #999999 !important;
    color: white !important
}
</style>