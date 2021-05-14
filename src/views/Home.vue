<template>
  <div class="table-cell">
    <div class="home">
      <div class="ocr">
        <router-link to="/test">Test-OCR</router-link><br />
        <router-link to="/progressBar">ProgressBar</router-link><br />
        <router-link to="/testIdCardOcr">TestIdCardOcr</router-link><br />
        <router-link to="/login">Login</router-link><br />
        <router-link to="/index">Index</router-link><br />
        <router-link to="/question">Question</router-link>
      </div>
      <img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld />
    </div>
  </div>

</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue';

  export default {
    name: 'Home',
    components: {
      HelloWorld
    }
  }
</script>

<style>
  .table-cell {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
