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
    plugins: ['~/plugins/maps.client', '~/plugins/dataApi', '~/plugins/auth.client', '~/plugins/vCalendar.client'],
    modules: ['~/modules/auth', '~/modules/algolia', '~/modules/cloudinary', '@nuxtjs/cloudinary'], 
    buildModules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
    cloudinary: {
        cloudName: 'dhdzvmgot',
    },
    image: {
        cloudinary: {
          baseURL: 'https://res.cloudinary.com/dhdzvmgot/image/upload/'
        }
    },
    css: ['~/assets/sass/app.scss'],
    build: {
        extractCSS: true,
        loaders: {
            limit: 0,
        }
    },
    publicRuntimeConfig: {
        rootUrl: process.env.NODE_ENV === 'production' ? 'https://ruri-bnb.vercel.app/' : 'http://localhost:3000',
        auth: {
            cookieName: 'idToken',
            clientId: '102392009144-h5ai2eg0t597vlkq83k1bbdo78tivs1m.apps.googleusercontent.com',
        },
        algolia: {  
            appID: "BWH88H6F6O",
            key: process.env.ALGOLIA_PUBLIC_API_KEY,
        },
        cloudinary: {
            apiKey: process.env.CLOUDONARY_API_KEY,
        }
    },
    privateRuntimeConfig : {
        algolia: {
            appID: "BWH88H6F6O",
            key: process.env.ALGOLIA_PRIVATE_API_KEY,
        },
        cloudinary: {
            apiSecret: process.env.CLOUDONARY_API_SECRET
        }
    }
}