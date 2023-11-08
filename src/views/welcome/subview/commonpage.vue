<script lang="ts" setup>
import { nextTick } from "vue";
import * as echarts from "echarts/core";
import {
  GridComponent,
  GridComponentOption,
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption
} from "echarts/components";
import {
  BarChart,
  BarSeriesOption,
  PieChart,
  PieSeriesOption
} from "echarts/charts";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  GridComponent,
  BarChart,
  CanvasRenderer,
  UniversalTransition,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);

type EChartsOption = echarts.ComposeOption<
  | GridComponentOption
  | BarSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | PieSeriesOption
>;
nextTick(() => {
  moutedforma();
  moutedformb();
});
function moutedforma() {
  var chartDom = document.getElementById("forma")!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  interface DataItem {
    value: number;
    groupId: string;
  }
  option = {
    xAxis: {
      data: ["Animals", "Fruits", "Cars"]
    },
    yAxis: {},
    dataGroupId: "",
    animationDurationUpdate: 500,
    series: {
      type: "bar",
      id: "sales",
      data: [
        {
          value: 5,
          groupId: "animals"
        },
        {
          value: 2,
          groupId: "fruits"
        },
        {
          value: 4,
          groupId: "cars"
        }
      ] as DataItem[],
      universalTransition: {
        enabled: true,
        divideShape: "clone"
      }
    }
  };

  const drilldownData = [
    {
      dataGroupId: "animals",
      data: [
        ["Cats", 4],
        ["Dogs", 2],
        ["Cows", 1],
        ["Sheep", 2],
        ["Pigs", 1]
      ]
    },
    {
      dataGroupId: "fruits",
      data: [
        ["Apples", 4],
        ["Oranges", 2]
      ]
    },
    {
      dataGroupId: "cars",
      data: [
        ["Toyota", 4],
        ["Opel", 2],
        ["Volkswagen", 2]
      ]
    }
  ];

  myChart.on("click", function (event) {
    if (event.data) {
      var subData = drilldownData.find(function (data) {
        return data.dataGroupId === (event.data as DataItem).groupId;
      });
      if (!subData) {
        return;
      }
      myChart.setOption<echarts.EChartsCoreOption>({
        xAxis: {
          data: subData.data.map(function (item) {
            return item[0];
          })
        },
        series: {
          type: "bar",
          id: "sales",
          dataGroupId: subData.dataGroupId,
          data: subData.data.map(function (item) {
            return item[1];
          }),
          universalTransition: {
            enabled: true,
            divideShape: "clone"
          }
        },
        graphic: [
          {
            type: "text",
            left: 50,
            top: 20,
            style: {
              text: "Back",
              fontSize: 18
            },
            onclick: function () {
              myChart.setOption<echarts.EChartsCoreOption>(option);
            }
          }
        ]
      });
    }
  });

  option && myChart.setOption(option);
}
function moutedformb() {
  var chartDom = document.getElementById("formb")!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  option = {
    title: {
      // text: "Referer of a Website",
      // subtext: "Fake Data",
      left: "center"
    },
    tooltip: {
      trigger: "item"
    },
    legend: {
      show: true,
      selectedMode: true,
      orient: "vertical",
      left: "right",
      align: "left"
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };

  option && myChart.setOption(option);
}
</script>
<template>
  <div>
    <div
      id="forma"
      style="width: 400px; height: 300px; display: inline-block"
    ></div>
    <div
      id="formb"
      style="width: 600px; height: 300px; display: inline-block"
    ></div>
  </div>
</template>
<style></style>
