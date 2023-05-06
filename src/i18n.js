/*

import LenguajeService from "@/services/LenguajeService";

export default function initI18n() {
    console.log("entro")
  return LenguajeService.getLenguaje()
    .then(function(data) {
        console.log("entra")
        console.log(data.data)
      return createI18n({
        legacy: false,
        locale: "es",
        fallbackLocale: "en",
        globalInjection: true,
        messages:data.data
      })

    })
    .catch(function (error) {
      console.log("eror")
      console.log(error)
    });
}
 */