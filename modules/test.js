export default function () {
  this.nuxt.hook("render:route", (url, result, context) => {
    context.res.setHeader("X-Powered-By", "The Force!!");
  });
}
