<template>
  <div class="root">
    <div class="content">
      <div
        class="charts"
        ref="charts"
      ></div>
      <div class="status">
        <div>检测状态</div>
        <div :class="getColor">{{ getStatus }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      chartData: 75,
    };
  },
  watch: {
    value(val) {
      this.chartData = val;
      this.$nextTick(() => {
        this.initEcharts();
      });
    },
  },
  computed: {
    getColor() {
      if (this.chartData > 50) {
        return "red";
      } else if (this.chartData <= 50 && this.chartData > 0) {
        return "blue";
      } else {
        return "weizhi";
      }
    },
    getStatus() {
      if (this.chartData > 50) {
        return "报警";
      } else if (this.chartData <= 50 && this.chartData > 0) {
        return "正常";
      } else {
        return "未知";
      }
    },
  },
  methods: {
    initEcharts() {
      let chartData = this.chartData;
      let gradient = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        {
          offset: 0,
          color: "#9372f1",
        },
        {
          offset: 1,
          color: "#9372f1",
        },
      ]);

      let option = {
        backgroundColor: "#ffffff",
        legend: {
          show: false,
        },
        title: {
          text: `{value|${chartData}}{unit|%}\n异常分数`,
          top: "center",
          left: "center",
          textStyle: {
            rich: {
              value: {
                fontSize: 28,
                color: "#7566f6",
                fontWeight: 700,
              },
              unit: {
                fontSize: 14,
                color: "#7566f6",
                padding: [0, 0, 6, 1],
                fontWeight: 700,
              },
            },
          },
        },
        series: [
          {
            type: "pie",
            clockwise: false,
            radius: ["66%", "70%"],
            zlevel: 3,
            hoverAnimation: false,
            label: {
              show: false,
            },
            data: [
              {
                value: 100 - chartData,
                itemStyle: {
                  color: "transparent",
                },
              },
              {
                value: chartData,
                itemStyle: {
                  normal: {
                    borderWidth: 18,
                    borderColor: gradient,
                    color: gradient,
                  },
                },
              },
            ],
          },
          {
            type: "pie",
            clockwise: false,
            radius: ["66%", "70%"],
            hoverAnimation: false,
            zlevel: 2,
            label: {
              show: false,
            },
            itemStyle: {
              color: "#ECEFF4",
              borderWidth: 16,
              borderColor: "#ECEFF4",
            },
            emphasis: {
              itemStyle: {
                color: "#ECEFF4",
                borderWidth: 16,
                borderColor: "#ECEFF4",
              },
            },
            data: [100],
          },
        ],
      };

      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.charts);
      // 绘制图表
      myChart.setOption(option);
    },
  },
  mounted() {
    this.initEcharts();
  },
};
</script>

<style lang="css" scoped>
.root {
  height: 500px;
  position: relative;
}
.content {
  width: 300px;
  height: 350px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.charts {
  width: 300px;
  height: 300px;
}
.status {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 25px;
  font-size: 20px;
  color: #9192af;
  font-weight: 700;
}
.red {
  color: #ff6b6b;
}
.blue {
  color: #80c6fa;
}
.weizhi {
  color: #9191b0;
}
</style>
