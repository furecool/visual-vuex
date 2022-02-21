<template>
  <div class="tableHeader">

      <!-- regular table header -->
      <div v-if="!$store.state.inDirector" style="display:flex;margin:0 4px;">
        <v-row class="body-1 grey--text text--darken-1 font-weight-black"  style="margin:0px auto;background:rgba(255, 255, 255, .4);padding-right:10px;">
          <v-col v-if="!$store.state.inBranch" class="py-1" style="">
            <p class="d-flex justify-center ma-0 text-no-wrap">
              滾動控制
            </p>
          </v-col>
          <v-col class="py-1" v-for="header in headerList" :key="header.id" style="">
            <p class="d-flex justify-center ma-0 text-no-wrap headerList" @click="sortInfo(header)">              
              {{header}}
              <v-icon v-if="sortType(header) && !$store.state.inBranch" color="grey darken-2" >mdi-menu-down</v-icon>
            </p>
          </v-col>
        </v-row>
      </div>

      <!-- director table header -->
      <v-row v-if="$store.state.inDirector" class="body-1 grey--text text--darken-1 font-weight-black" style="margin:5px auto;">
        <v-col class="mx-2">
          <v-row class="text-no-wrap" style="margin:0px auto;background:rgba(255, 255, 255, .4);padding-right:10px;">
            <div class="py-1" style="width:20%;">
              <p class="d-flex justify-center my-0">滾動</p>
            </div>
            <v-col class="py-1" v-for="header in headerListP" :key="header.id">
              <p class="d-flex justify-center ma-0">{{header}}</p>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="mx-2">
          <v-row class="text-no-wrap" style="margin:0px auto;background:rgba(255, 255, 255, .4);padding-right:10px;">
            <div class="py-1" style="width:20%;">
              <p class="d-flex justify-center my-0">滾動</p>
            </div>
            <v-col class="py-1" v-for="header in headerListT" :key="header.id">
              <p class="d-flex justify-center ma-0">{{header}}</p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

  </div>
</template>

<script>

  export default {
    name: 'TableHeader',

    data() {
      return {
        headerList: [
          '區名',
          '分行代號',
          '分行名稱',
          '人數警示',
          '時間警示',
          '等待人數',
          '平均等待時間',
        ],
        headerListP: [
          '區名',
          '分行名稱',
          '等待人數',
          '人數警示',
        ],
        headerListT: [
          '區名',
          '分行名稱',
          '平均等待時間',
          '時間警示',          
        ],
      }
    }, 

    mounted() {
      this.sortInfo(this.$store.state.sortType);
    },

    watch: {
      '$store.state.infoChange':function() {
        this.sortInfo(this.$store.state.sortType);
      },
    },

    methods: {

      sortType(header) {
        let result
        if(this.$store.state.sortType == header) {
          result = true          
        }
        return result
      },
      
      sortInfo(h) {
        let attr
        if(h=='分行代號') attr = 'branchId'
        if(h=='分行名稱') attr = 'branch'
        if(h=='等待人數') attr = 'waitingP'
        if(h=='平均等待時間') attr = 'waitingT'
        if(h == '人數警示') {
          this.$store.state.dataB.sort(this.compareWeight('waitingP','waitingT'));
        }else if(h == '時間警示') {
          this.$store.state.dataB.sort(this.compareWeight('waitingT','waitingP'));
        } else if(h == '區名') {
          this.$store.state.dataB.sort(this.compare('groupId'));
        } else {
          this.$store.state.dataB.sort(this.compare(attr));
        }
        this.$store.state.sortType = h
      },
      compare(attr1) { // id、分區、分行、人數、時間
        return function(a,b) {
          var val1 = a[attr1];
          var val2 = b[attr1];
          if(attr1 == 'branchId' || attr1 == 'groupId') {
            if(val1 == val2) {
              if(b['waitingP'] == a['waitingP']) {
                return b['waitingT'] - a['waitingT']
              }
              return b['waitingP'] - a['waitingP']
            }
            return val1 - val2
          } else if(attr1 == 'branch') {
            return val1.localeCompare(val2, "zh-hant")
          } else if(attr1 == 'waitingP') {
            if(val1 == val2) {
              return b['waitingT'] - a['waitingT']
            }
          } else if(attr1 == 'waitingT') {
            if(val1 == val2) {
              return b['waitingP'] - a['waitingP']
            }
          }
          return val2 - val1
        }
      },
      compareWeight(attr1, attr2) { // 警示燈權重
        let that = this
        return function(a, b) {
          var p1
          var p2
          var t1
          var t2
          var weight_P = 1
          var weight_T = 1
          var weight_R = 5
          var weight_Y = 2
          var weight_G = 1          
          var wp1
          var wp2
          var wt1
          var wt2
          var w1
          var w2
          if(attr1 == 'waitingP') {
            p1 = a[attr1];
            p2 = b[attr1];
            t1 = a[attr2];
            t2 = b[attr2];
            weight_P = 2;
          } else if(attr1 == 'waitingT') {
            t1 = a[attr1];
            t2 = b[attr1];
            p1 = a[attr2];
            p2 = b[attr2];
            weight_T = 2;
          }
          var wPR = weight_P*weight_R
          var wPY = weight_P*weight_Y
          var wPG = weight_P*weight_G
          var wTR = weight_T*weight_R
          var wTY = weight_T*weight_Y
          var wTG = weight_T*weight_G
          if(p1 >= that.$store.state.peopleR) {
            wp1 = wPR
          } else if (that.$store.state.peopleR > p1 && p1 >= that.$store.state.peopleY) {
            wp1 = wPY
          } else {
            wp1 = wPG
          }
          if(p2 >= that.$store.state.peopleR) {
            wp2 = wPR
          } else if (that.$store.state.peopleR > p2 && p2 >= that.$store.state.peopleY) {
            wp2 = wPY
          } else {
            wp2 = wPG
          }
          if(t1 >= that.$store.state.timeR) {
            wt1 = wTR
          } else if (that.$store.state.timeR > t1 && t1 >= that.$store.state.timeY) {
            wt1 = wTY
          } else {
            wt1 = wTG
          }
          if(t2 >= that.$store.state.timeR) {
            wt2 = wTR
          } else if (that.$store.state.timeR > t2 && t2 >= that.$store.state.timeY) {
            wt2 = wTY
          } else {
            wt2 = wTG
          }
          w1 = wp1 + wt1
          w2 = wp2 + wt2
          if(attr1 == 'waitingP') {
            if(w2 == w1) {
              if(p1 == p2) {
                return t2 - t1
              }
              return p2 - p1
            }
          } else if(attr1 == 'waitingT') {
            if(w2 == w1) {
              if(t1 == t2) {
                return p2 - p1
              }
              return t2 - t1
            }
          }
          return w2 - w1
        }
      },
    },

  }
</script>