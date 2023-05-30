<template>
  <div id="app">
    <!-- 环形进度条 -->
    <circularProgressBar :value="value" />
    <div class="slider">
      <el-slider
        v-model="value"
        @change="changeSlider"
      ></el-slider>
    </div>
  </div>
</template>

<script>
import circularProgressBar from "@/components/circularProgressBar.vue";
export default {
  name: "App",
  components: {
    circularProgressBar,
  },
  data() {
    return {
      value: 75,
    };
  },
  methods: {
    changeSlider(val) {
      this.value = val;
    },
  },
};
</script>

<style>
p {
  text-align: center;
}
.slider {
  width: 25%;
  margin: 0 auto;
}
</style>
