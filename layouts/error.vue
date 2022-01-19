<template>
  <div style="text-align: center">
    <img
      src="https://media4.giphy.com/media/26FPGt0CsPqPAmXg4/giphy.gif?cid=ecf05e4723i5yadittab4bddx0dgzex5breol12nd49x7wo3&rid=giphy.gif&ct=g"
    />
    <h1>Error!</h1>
    {{ error.message }} {{ error.statusCode }}
  </div>
</template>
<script>
export default {
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  head() {
    return {
      title: "BIG PROBLEMS!",
    };
  },
};
</script>
