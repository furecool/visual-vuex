<template>
  <div class="groupCom">

      <v-row class="d-flex mx-1 body-1 grey--text text--darken-1 font-weight-black text-no-wrap" style="margin:5px auto;background:rgba(255, 255, 255, .4);">

          <div v-if="!$store.state.inBranch" class="d-flex flex-column align-center justify-start" style="width:12.5%;">
            <v-btn v-if="!play && !$store.state.inBranch" text fab x-small class="ma-1" @click="play=!play">
              <v-icon color="grey darken-2" >mdi-play</v-icon>
            </v-btn>
            <v-btn v-if="play" text fab x-small class="ma-1" @click="play=!play">
              <v-icon color="grey darken-2" >mdi-pause</v-icon>
            </v-btn>
          </div>

          <div id="groupBox" class="componentBox" :style="heightOfBox">

            <v-row v-for="(item,index) in $store.state.dataG" :key="index">
              <v-col class="d-flex justify-center">{{item.group}}</v-col>
              <v-col></v-col>
              <v-col></v-col>
              <v-col></v-col>
              <v-col></v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-row>
                    <v-col class="px-0 d-flex justify-end" style="width:40px;">{{item.waitingP}}人</v-col>
                  </v-row>
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <div>
                  <v-row>
                    <v-col class="px-0 d-flex justify-end" style="width:40px;">{{waitMinAvg(item)}}分</v-col>
                    <v-col class="px-0 d-flex justify-end" style="width:40px;">{{waitSecAvg()}}秒</v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>

          </div>

      </v-row>
    
  </div>
</template>

<script>

  export default {
    name: 'GroupCom',

    data() {
      return {
        play: false,
        groupBoxHeight: null,
      }
    },

    created() {
      this.play = true
    },

    computed: {
      heightOfBox:function() {
        let that = this
        if(this.$store.state.inBranch) {
          that.boxHeight = that.$store.state.listHeight
        } else if(this.$store.state.clientHeight >= this.$store.state.hXL) {
          that.boxHeight = that.$store.state.listHeight*8
        } else if(this.$store.state.hXL > this.$store.state.clientHeight && this.$store.state.clientHeight >= this.$store.state.hL) {
          that.boxHeight = that.$store.state.listHeight*6
        } else if(this.$store.state.hL > this.$store.state.clientHeight && this.$store.state.clientHeight >= this.$store.state.hM) {
          that.boxHeight = that.$store.state.listHeight*4
        } else if(this.$store.state.hM > this.$store.state.clientHeight && this.$store.state.clientHeight >= this.$store.state.hS) {
          that.boxHeight = that.$store.state.listHeight*3
        } else if(this.$store.state.hS > this.$store.state.clientHeight) {
          that.boxHeight = that.$store.state.listHeight*2
        }
        that.groupBoxHeight = that.boxHeight
        return 'height:' + this.groupBoxHeight + 'px;'
      },
    },

    watch: {
      '$store.state.dataB':function() {
        this.dataGSort();
      },
      play:function() {
        let box = document.getElementById('groupBox')
        let that = this
        function scroll() {
          if (box.scrollTop + that.boxHeight < box.scrollHeight) {
            // box.scrollTop ++;
            box.scrollTop += that.$store.state.listHeight;
            // box.scrollTop += that.boxHeight;
          } else {
            box.scrollTop = 0;
          }
        }
        if(this.play) {
          window.scrollId1 = window.setInterval(scroll, this.$store.state.carouselTime);
        } else {
          window.clearInterval(window.scrollId1);
        }
      },      
      groupBoxHeight:function() {
        if(this.play) {
          this.play = !this.play
          this.play = !this.play
        }
      },
    },
    
    methods: {
      dataGSort() {
        let attr1
        let attr2
        if(this.$store.state.sortType == '等待人數' || this.$store.state.sortType == '人數警示') {
          attr1 = 'waitingP';
          attr2 = 'waitingT';
        } else if(this.$store.state.sortType == '平均等待時間' || this.$store.state.sortType == '時間警示') {
          attr1 = 'waitingT'
          attr2 = 'waitingP';
        } else {
          attr1 = 'groupId';
          attr2 = 'waitingP';
        }
        this.$store.state.dataG.sort(this.compare(attr1, attr2));
      },
      compare(attr1, attr2) {
        return function(a, b) {
          var p1 = a[attr1];
          var p2 = b[attr1];
          var t1
          var t2
          if(attr1 == 'groupId') {
            if(p1 == p2) {
              return b[attr2] - a[attr2]
            }
            return p1 - p2
          }
          if(p1 === p2) {
            t1 = a[attr2];
            t2 = b[attr2];
            return t2 - t1
          }
          return p2 - p1;
        }
      },
      waitMinAvg(b) {
        let time = Math.floor(b.waitingT /60)
        window.sec = Math.floor(((b.waitingT /60) - time)*60)
        return time;
      },
      waitSecAvg() {
        return window.sec
      },      
    },

  }
</script>
