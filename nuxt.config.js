export default {
    components: true,
    head: {
        titleTemplate: "Mastering Nuxt: %s",
        htmlAttrs: {
            Lang: "en"
        },
        bodyAttrs:{
            class: ["my-style"]
        },
        meta: [{
            charset: "utf-8"
        }]
    },
    router: {
        prefetchLinks: false
    },
    plugins: ['~/plugins/maps.client', '~/plugins/dataApi', '~/plugins/auth.client'],
    modules: ['~/modules/auth', '~/modules/algolia'],
    buildModules: ['@nuxtjs/tailwindcss'],
    css: ['~/assets/sass/app.scss'],
    build: {
        extractCSS: true,
        loaders: {
            limit: 0,
        }
    },
    publicRuntimeConfig: {
        auth: {
            cookieName: 'idToken',
            clientId: '102392009144-h5ai2eg0t597vlkq83k1bbdo78tivs1m.apps.googleusercontent.com',
        },
        algolia: {  
            appID: "BWH88H6F6O",
            key: "",
        }
    },
    privateRuntimeConfig : {
        algolia: {
            appID: "BWH88H6F6O",
            key: "",
        },
    }
}