<script lang="ts" setup>
import { nextTick, onActivated, onMounted } from "vue";
import * as echarts from "echarts";
import "echarts/extension/bmap/bmap";
import { onBeforeMount, ref } from "vue";
import { useDetail } from "@/router/hooks";
const { toDetail, router } = useDetail();
//接受父组件传过来的参数
const props = defineProps({
  flag: {
    type: Number,
    default: ""
  }
});
function loadBMap() {
  return new Promise(function (resolve, reject) {
    if (typeof BMap !== "undefined") {
      resolve(BMap);
      return true;
    }
    window.onBMapCallback = function () {
      resolve(BMap);
    };
    // 使用https协议需要添加一下meta标签
    var protocolStr = document.location.protocol;
    if (protocolStr == "https:") {
      let meta = document.createElement("meta");
      meta.httpEquiv = "Content-Security-Policy";
      meta.content = "upgrade-insecure-requests";
      meta.onerror = reject;
      document.head.appendChild(meta);
    }
    // 引入百度地图
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "http://api.map.baidu.com/api?v=2.0&ak=" +
      "ymIsTuk5HB15Qorioz8hzQDl03KGegmE" +
      "&__ec_v__=20190126&callback=onBMapCallback";
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
loadMap();
function loadMap() {
  nextTick(() => {
    loadBMap().then(() => {
      getmap();
    });
  });
}
const tooltip = {
  trigger: "item",
  formatter: function (params) {
    var htmlStr = '<div style="padding:5px;line-height:28px;">';
    htmlStr +=
      "设备名称： <span style='color:#409EFF'>" +
      params.data.name +
      "</span><br />";
    htmlStr += "设备编号： " + params.data.serialNumber + "<br />";
    htmlStr += "设备状态： ";
    if (params.data.status == 1) {
      htmlStr += "<span style='color:#32CD32'>在线</span>" + "<br />";
    } else if (params.data.status == 2) {
      htmlStr += "<span style='color:#909399'>离线</span>" + "<br />";
    } else if (params.data.status == 3) {
      htmlStr += "<span style='color:#E6A23C'>禁用</span>" + "<br />";
    } else if (params.data.status == 4) {
      htmlStr += "<span style='color:#F56C6C'>报警</span>" + "<br />";
    }
    htmlStr += "固件版本： Version " + params.data.firmwareVersion + "<br />";
    htmlStr += "激活时间： " + params.data.activeTime + "<br />";
    htmlStr += "所在地址： " + params.data.networkAddress + "<br />";
    htmlStr += "</div>";
    return htmlStr;
  }
};
function getmap() {
  var myChart = echarts.init(document.getElementById("map"));
  var option;

  // 单击事件
  myChart.on("click", params => {
    toDetail({ deviceId: params.data.serialNumber }, "query");
  });

  // 格式化数据
  var option;

  var data = [
    {
      devicename: "水流量传感器(FlowMeter-X100)",
      longitude: 120.2,
      latitude: 30.3,
      serialNumber: "D1PGLPG58K88",
      status: 1,
      firmwareVersion: "2.0",
      activeTime: "2023-11-05",
      networkAddress: "杭州上城区"
    },
    {
      devicename: "水质传感器(WaterQualityProbe-3000)",
      longitude: 120.3,
      latitude: 30.4,
      serialNumber: "N67Vak24kv0",
      status: 2,
      firmwareVersion: "2.0",
      activeTime: "2023-11-05",
      networkAddress: "杭州星桥镇"
    },
    {
      devicename: "温度传感器(TempSensor-T200)",
      longitude: 120.1,
      latitude: 30.3,
      serialNumber: "SI54ZNV38192",
      status: 3,
      firmwareVersion: "2.0",
      activeTime: "2023-11-05",
      networkAddress: "杭州蒋村街道"
    },
    {
      devicename: "水压传感器(SKU:SEN0257)",
      longitude: 120.2,
      latitude: 30.2,
      serialNumber: "P23NG92SSO7",
      status: 4,
      firmwareVersion: "2.0",
      activeTime: "2023-11-05",
      networkAddress: "杭州西新镇"
    }
  ];
  // var geoCoordMap = {
  //   摄像头: [121.15, 31.89]
  // };
  var convertData = function (data, status) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var geoCoord = [data[i].longitude, data[i].latitude];
      // var geoCoord = geoCoordMap[data[i].devicename];
      if (geoCoord && data[i].status == status) {
        res.push({
          name: data[i].devicename,
          value: geoCoord,
          serialNumber: data[i].serialNumber,
          status: data[i].status,
          firmwareVersion: data[i].firmwareVersion,
          networkAddress: data[i].networkAddress,
          activeTime: data[i].activeTime == null ? "" : data[i].activeTime
        });
      }
    }
    return res;
  };
  function renderItem(params, api) {
    var coords = [
      // [116.7, 39.53],
      // [103.73, 36.03],
      // [112.91, 27.87],
      // [120.65, 28.01],
      // [119.57, 39.95]
    ];
    var points = [];
    for (var i = 0; i < coords.length; i++) {
      points.push(api.coord(coords[i]));
    }
    var color = api.visual("color");
    return {
      type: "polygon",
      shape: {
        points: echarts.graphic.clipPointsByRect(points, {
          x: params.coordSys.x,
          y: params.coordSys.y,
          width: params.coordSys.width,
          height: params.coordSys.height
        })
      },
      style: api.style({
        fill: color,
        stroke: echarts.color.lift(color)
      })
    };
  }
  option = {
    backgroundColor: "transparent",
    title: {
      text: "水务物联网设备分布",
      subtext: "当前在线设备:" + convertData(data, 1).length,
      left: "center",
      textStyle: {
        color: "gray"
      }
    },
    tooltip: {
      trigger: "item"
    },
    bmap: {
      center: [120.35, 30.3],
      zoom: 12,
      roam: true,
      mapStyle: {
        styleJson: [
          {
            featureType: "water",
            elementType: "all",
            stylers: {
              color: "#d1d1d1"
            }
          },
          {
            featureType: "land",
            elementType: "all",
            stylers: {
              color: "#f3f3f3"
            }
          },
          {
            featureType: "railway",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "highway",
            elementType: "all",
            stylers: {
              color: "#fdfdfd"
            }
          },
          {
            featureType: "highway",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "arterial",
            elementType: "geometry",
            stylers: {
              color: "#fefefe"
            }
          },
          {
            featureType: "arterial",
            elementType: "geometry.fill",
            stylers: {
              color: "#fefefe"
            }
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "green",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "subway",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "manmade",
            elementType: "all",
            stylers: {
              color: "#d1d1d1"
            }
          },
          {
            featureType: "local",
            elementType: "all",
            stylers: {
              color: "#d1d1d1"
            }
          },
          {
            featureType: "arterial",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "boundary",
            elementType: "all",
            stylers: {
              color: "#fefefe"
            }
          },
          {
            featureType: "building",
            elementType: "all",
            stylers: {
              color: "#d1d1d1"
            }
          },
          {
            featureType: "label",
            elementType: "labels.text.fill",
            stylers: {
              color: "#999999"
            }
          }
        ]
      }
    },
    series: [
      {
        name: "设备详情",
        type: "effectScatter",
        coordinateSystem: "bmap",
        showEffectOn: "render",
        rippleEffect: {
          //设置涟漪动画样式
          // color:'purple',  //涟漪颜色,默认为散点自身颜色
          brushType: "stroke", //动画方式,全填充或只有线条,'stroke'
          period: 4, //动画周期
          scale: "4" //涟漪规模
        },
        data: convertData(data, 1),
        encode: {
          value: 2
        },
        symbolSize: function (val) {
          return 20;
        },
        label: {
          formatter: "{b}",
          position: "right"
        },
        itemStyle: {
          color: "#32CD32"
        },
        emphasis: {
          label: {
            show: true
          }
        },
        tooltip
      },
      {
        name: "设备详情",
        type: "effectScatter",
        coordinateSystem: "bmap",
        // showEffectOn: "render",
        rippleEffect: {
          //设置涟漪动画样式
          // color:'purple',  //涟漪颜色,默认为散点自身颜色
          brushType: "fill", //动画方式,全填充或只有线条,'stroke'
          period: 4, //动画周期
          scale: "2" //涟漪规模
        },
        data: convertData(data, 2),
        encode: {
          value: 2
        },
        symbolSize: function (val) {
          return 20;
        },
        label: {
          formatter: "{b}",
          position: "right"
        },
        itemStyle: {
          color: "#909399"
        },
        emphasis: {
          label: {
            show: true
          }
        },
        tooltip
      },
      {
        name: "设备详情",
        type: "effectScatter",
        coordinateSystem: "bmap",
        // showEffectOn: "render",
        rippleEffect: {
          //设置涟漪动画样式
          // color:'purple',  //涟漪颜色,默认为散点自身颜色
          brushType: "fill", //动画方式,全填充或只有线条,'stroke'
          period: 4, //动画周期
          scale: "2" //涟漪规模
        },
        data: convertData(data, 3),
        encode: {
          value: 2
        },
        symbolSize: function (val) {
          return 20;
        },
        label: {
          formatter: "{b}",
          position: "right"
        },
        itemStyle: {
          color: "#E6A23C"
        },
        emphasis: {
          label: {
            show: true
          }
        },
        tooltip
      },
      {
        name: "设备详情",
        type: "effectScatter",
        coordinateSystem: "bmap",
        // showEffectOn: "render",
        rippleEffect: {
          //设置涟漪动画样式
          // color:'purple',  //涟漪颜色,默认为散点自身颜色
          brushType: "fill", //动画方式,全填充或只有线条,'stroke'
          period: 4, //动画周期
          scale: "3.5" //涟漪规模
        },
        data: convertData(data, 4),
        encode: {
          value: 2
        },
        symbolSize: function (val) {
          return 20;
        },
        label: {
          formatter: "{b}",
          position: "right"
        },
        itemStyle: {
          color: "#F56C6C"
        },
        emphasis: {
          label: {
            show: true
          }
        },
        tooltip
      }
    ]
  };

  option && myChart.setOption(option);
}
</script>
<template>
  <div id="map" ref="map"></div>
</template>
<style scoped>
#map {
  width: 837px;
  height: 650px;
}
</style>
