<template>
  <div class="allCom">

      <v-row class="ma-1 body-2">

        <v-col class="d-flex flex-column align-center">
          <div style="filter: drop-shadow(3px 5px 5px rgba(0, 0, 0, 0.5));">
            <v-card class="pt-3 pl-1 d-flex flex-column justify-center align-center grey--text text--darken-1 font-weight-black title" height="100" width="210" style="border-image: linear-gradient(90deg, #acacac 0%, #707070 .5%) 1;border-left:10px solid;clip-path: inset(0 round 10px);">
              <div>全行平均等待人數</div>
              <v-card-title class="headline font-weight-black text-no-wrap"  :style="colorPeople()">
                <span style="letter-spacing:5px;">{{$store.state.dataT.waitingP}}人</span>
              </v-card-title>
            </v-card>
          </div>
          <v-card flat color="rgba(0, 0, 0, 0)" class="d-flex justify-space-between align-center grey--text text--darken-1 font-weight-black pa-2" style="width:200px;">
              <div style="display:flex;justify-content:space-between;">
                <img src="@/assets/bell_r.png" alt="" style="height:18px;width:18px;margin-right:7px">高於{{$store.state.peopleR}}人               
              </div>
              <div style="display:flex;justify-content:space-between;">
                <img src="@/assets/bell_y.png" alt="" style="height:18px;width:18px;margin-right:7px">高於{{$store.state.peopleY}}人 
              </div>              
          </v-card>
        </v-col>

        <!-- 全行平均等待時間 -->

        <v-col class="d-flex flex-column align-center">
          <div style="filter: drop-shadow(3px 5px 5px rgba(0, 0, 0, 0.5));">
            <v-card class="pt-2 pl-1 d-flex flex-column justify-center align-center grey--text text--darken-1 font-weight-black title" height="100" width="210" style="border-image: linear-gradient(90deg, #acacac 0%, #707070 .5%) 1;border-left:10px solid;clip-path: inset(0 round 10px);">
              <div>全行平均等待時間</div>
              <v-card-title class="headline font-weight-black text-no-wrap" :style="colorTime()">
                <span style="letter-spacing:5px;text-align:right;">{{avgMinite()}}分{{avgS}}秒</span>              
              </v-card-title>
            </v-card>
          </div> 
          <v-card flat color="rgba(0, 0, 0, 0)" class="d-flex  justify-space-between align-center grey--text text--darken-1 font-weight-black pa-2" style="width:200px;">
              <div style="display:flex;justify-content:space-between;">
                <img src="@/assets/bell_r.png" alt="" style="height:18px;width:18px;margin-right:7px">高於{{$store.state.timeR/60}}分
              </div>
              <div style="display:flex;justify-content:space-between;">
                <img src="@/assets/bell_y.png" alt="" style="height:18px;width:18px;margin-right:7px">高於{{$store.state.timeY/60}}分 
              </div>              
          </v-card>
        </v-col>

      </v-row>
    
  </div>
</template>

<script>

  export default {
    name: 'AllCom',
    data() {
      return {
        avgM: null,
        avgS: null,
      }
    },
    methods: {
      avgMinite() {
        this.avgM = Math.floor(this.$store.state.dataT.waitingT/60)
        this.avgS = Math.floor(((this.$store.state.dataT.waitingT/60) - this.avgM)*60)
        return this.avgM;
      },
      colorPeople() {
        let color
        if(this.$store.state.dataT.waitingP >= this.$store.state.peopleR) {
          color = 'red';
        } else if(this.$store.state.peopleR > this.$store.state.dataT.waitingP && this.$store.state.dataT.waitingP >= this.$store.state.peopleY ) {
          color = 'orange';
        }
        return "color:" + color;
      },
      colorTime() {
        let color
        if(this.avgM >= this.$store.state.timeR/60) {
          color = 'red';
        } else if(this.$store.state.timeR/60 > this.avgM && this.avgM >= this.$store.state.timeY/60 ) {
          color = 'orange';
        }
        return "color:" + color;
      }

    },
  }
</script>
