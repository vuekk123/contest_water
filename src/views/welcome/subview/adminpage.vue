<script setup lang="ts">
import { onMounted, onUnmounted, ref, reactive } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import {
  device,
  monitor,
  model,
  alert,
  loga,
  eventa
} from "../../login/utils/static";
import { Histogram, List, Clock } from "@element-plus/icons-vue";
import { ReNormalCountTo, ReboundCountTo } from "@/components/ReCountTo";
const mouseflag = ref(false);
const outbox = ref<HTMLElement>(null);
const infoWindow = {};
console.log(outbox);
let map = null;
const markerList = [];
const mapmark = [
  { x: 120.09, y: 30.32, title: "北京" },
  { x: 120.21, y: 30.2, title: "杭州" },
  { x: 120.22, y: 30.3, title: "杭州" },
  { x: 120.24, y: 30.24, title: "杭州" },
  { x: 120.1, y: 30.23, title: "杭州" }
];
const movement = reactive({
  w: window.pageXOffset,
  h: window.pageYOffset,
  wt: 0
});
const markerpos = reactive({ w: 0, h: 0 });
const gerpos = (e: MouseEvent) => {
  movement.w = e.pageX - 240;
  movement.h = e.pageY;
  movement.wt = e.pageX;
};
onMounted(() => {
  AMapLoader.load({
    key: "8e7af8d9709450d729538d40f601ef8f",
    version: "2.0",
    plugins: ["AMap.AdvancedInfoWindow"]
  })
    .then(AMap => {
      var infoWindow = new AMap.InfoWindow({
        anchor: "top-left",
        content: "这是信息窗体！"
      });
      map = new AMap.Map("container", {
        viewMode: "3D",
        zoom: 12,
        center: [120.16, 30.26],
        mapStyle: "amap://styles/whitesmoke"
      });
      mapmark.forEach(item => {
        const marker = new AMap.Marker({
          position: new AMap.LngLat(item.x, item.y)
          // title: item.title
        });
        marker.on("mouseover", function (e) {
          infoWindow.close();
          infoWindow.open(map, [item.x, item.y]);
          mouseflag.value = true;
          markerpos.w = e.pixel.x;
          markerpos.h = e.pixel.y;
        });
        map.on("mousemove", function (e) {
          var amap = document.querySelector(".amap-info") as HTMLElement;
          if (amap) {
            amap.style.translate =
              e.pixel.x -
              markerpos.w +
              "px" +
              " " +
              (e.pixel.y - markerpos.h) +
              "px";
          }
          if (
            Math.abs(movement.w - markerpos.w) +
              Math.abs(movement.h - markerpos.h) >
            150
          ) {
            infoWindow.close();
            mouseflag.value = false;
            movement.w = 0;
            movement.h = 0;
            markerpos.w = 0;
            markerpos.h = 0;
          }
        });
        markerList.push(marker);
      });
      map.add(markerList);
    })
    .catch(e => {
      console.log(e);
    });
});
onUnmounted(() => {
  map?.destroy();
});
</script>

<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14" style="">
        <div style="overflow: hidden; border: 1px solid #ccc">
          <div
            id="container"
            @mousemove="mouseflag ? gerpos($event) : ''"
            ref="outbox"
          ></div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
        <el-card style="height: 46%">
          <h3 style="font-weight: bold; display: flex; align-items: center">
            <Histogram style="width: 1em; height: 1em; margin-right: 8px" />
            设备统计
          </h3>
          <el-row :gutter="40" class="panel-group">
            <el-col :span="12" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-icon-wrapper icon-blue ali">
                  <component :is="device" style="width: 40px; height: 100%" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">设备数量</div>
                  <!-- <div class="card-panel-num"> -->
                  <ReNormalCountTo
                    :duration="2000"
                    :color="'#666666'"
                    :fontSize="'18px'"
                    :startVal="1"
                    :endVal="26"
                  />
                  <!-- </div> -->
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="card-panel-col">
              <div class="card-panel">
                <div
                  class="card-panel-icon-wrapper icon-red ali"
                  style="display: flex; align-items: center"
                >
                  <component :is="monitor" style="width: 40px; height: 100%" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">监测数据</div>
                  <ReNormalCountTo
                    :duration="2000"
                    :color="'#666666'"
                    :fontSize="'18px'"
                    :startVal="1"
                    :endVal="6428"
                  />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-icon-wrapper icon-blue ali">
                  <component :is="model" style="width: 40px; height: 100%" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">产品数量</div>
                  <ul class="flex" style="">
                    <ReNormalCountTo
                      :duration="2000"
                      :color="'#666666'"
                      :fontSize="'18px'"
                      :startVal="1"
                      :endVal="32"
                    />
                  </ul>
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="card-panel-col">
              <div class="card-panel">
                <div
                  class="card-panel-icon-wrapper icon-red ali"
                  style="display: flex; align-items: center"
                >
                  <component :is="alert" style="width: 40px; height: 100%" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">告警数量</div>
                  <ReNormalCountTo
                    :duration="2000"
                    :color="'#666666'"
                    :fontSize="'18px'"
                    :startVal="1"
                    :endVal="1231"
                  />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-icon-wrapper icon-blue ali">
                  <component :is="loga" style="width: 40px; height: 100%" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">操作记录</div>
                  <ReNormalCountTo
                    :duration="2000"
                    :color="'#666666'"
                    :fontSize="'18px'"
                    :startVal="1"
                    :endVal="1208"
                  />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="card-panel-col">
              <div class="card-panel">
                <div
                  class="card-panel-icon-wrapper icon-red ali"
                  style="display: flex; align-items: center"
                >
                  <component :is="eventa" style="width: 40px; height: 100%" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">上报事件</div>
                  <ReNormalCountTo
                    :duration="2000"
                    :color="'#666666'"
                    :fontSize="'18px'"
                    :startVal="1"
                    :endVal="1"
                  />
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
        <el-card style="margin-top: 4%; height: 50%">
          <h3
            style="
              font-weight: bold;
              margin-bottom: 10px;
              display: flex;
              align-items: center;
              margin-bottom: 25px;
            "
          >
            <List style="width: 1em; height: 1em; margin-right: 8px" />信息栏
          </h3>
          <el-row :gutter="24" style="cursor: pointer">
            <el-col :span="16"
              ><el-tag class="ml-2 marginicon" type="warning">公告</el-tag
              >水务物联网数据采集v1.0版本</el-col
            >
            <el-col :span="8"
              ><div style="display: flex; align-items: center">
                <Clock
                  style="width: 1em; height: 1em; margin-right: 8px"
                />2023/11/4
              </div></el-col
            >
          </el-row>
          <el-row :gutter="24" style="cursor: pointer">
            <el-col :span="16"
              ><el-tag class="ml-2 marginicon">信息</el-tag
              >水务物联网数据采集版本支持</el-col
            >
            <el-col :span="8"
              ><div style="display: flex; align-items: center">
                <Clock
                  style="width: 1em; height: 1em; margin-right: 8px"
                />2023/11/4
              </div></el-col
            >
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <div style="width: 100%; background-color: black; height: 200px">
        then
      </div>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
:deep(.scroll-num) {
  // animation: enhance-bounce-in-down 0.1s calc(var(--delay) * 1s) forwards !important;
  ul li {
    font-size: 18px !important;
    color: #666666 !important;
    // font-weight: normal !important;
  }
}
#container {
  width: 837px;
  height: 650px;
}
.phone {
  height: 729px;
  width: 370px;
  background-image: url("../assets/images/phone.png");
  background-size: cover;
  margin: 0 auto;
}

.phone-container {
  height: 618px;
  width: 343px;
  position: relative;
  top: 46px;
  left: 12px;
  background-color: #fff;
}

.content {
  line-height: 24px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 10px;
}

.description {
  font-size: 12px;

  tr {
    line-height: 20px;
  }
}

.panel-group {
  .card-panel-col {
    margin-bottom: 10px;
  }

  .card-panel {
    height: 68px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    color: #666;
    border: 1px solid #eee;
    border-radius: 5px;
    //box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.08);
    background-color: #fff;

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-blue {
        background: #36a3f7;
      }

      .icon-green {
        background: #34bfa3;
      }

      .icon-red {
        background: #f56c6c;
      }

      .icon-orange {
        background: #e6a23c;
      }
    }

    .icon-blue {
      color: #36a3f7;
    }

    .icon-green {
      color: #34bfa3;
    }

    .icon-red {
      color: #f56c6c;
    }

    .icon-orange {
      color: #e6a23c;
    }

    .card-panel-icon-wrapper {
      float: left;
      // margin: 5px;
      padding: 10px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 30px;
    }

    .card-panel-description {
      display: flex;
      flex-direction: column;
      align-items: center;
      float: right;
      font-weight: bold;
      margin: 15px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 14px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        margin-bottom: 3px;
        text-align: right;
      }

      .card-panel-num {
        font-size: 18px;
      }
    }
  }
}
.ali {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
<style>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.amap-info-close {
  display: none;
}
.amap-info {
  display: block;
  transform: all 0.1s;
  /* background-color: black; */
}
.el-tag--warning {
  background: #ffba00;
  color: white;
}
.marginicon {
  margin-right: 5px;
}
</style>
