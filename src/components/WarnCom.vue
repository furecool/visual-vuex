<template>
  <div class="warnCom">

      <v-row class="mx-1 body-1 grey--text text--darken-1 font-weight-black text-no-wrap" style="margin:5px auto;background:rgba(255, 255, 255, .4);">

          <div v-if="!$store.state.inBranch" class="d-flex flex-column align-center justify-start" style="width:12.5%">
            <v-btn v-if="!play" text fab x-small class="ma-0" @click="play=!play">
              <v-icon color="grey darken-2" >mdi-play</v-icon>
            </v-btn>
            <v-btn v-if="play" text fab x-small class="ma-0" @click="play=!play">
              <v-icon color="grey darken-2" >mdi-pause</v-icon>
            </v-btn>
            <v-btn v-if="this.$store.state.openBranch" text fab x-small class="ma-0" @click="toggleBox">
              <v-icon color="grey darken-2" >mdi-toggle-switch</v-icon>
            </v-btn>
            <v-btn v-if="!this.$store.state.openBranch" text fab x-small class="ma-0" @click="toggleBox">
              <v-icon color="grey darken-2" >mdi-toggle-switch-off</v-icon>
            </v-btn>
          </div>
          
          <div id="warnBox" class="componentBox" :style="heightOfBox">
            <div v-for="(item,index) in $store.state.dataB" :key="index">
              <v-row v-if="item.waitingP >= $store.state.peopleY || item.waitingT >= $store.state.timeY">
                <v-col class="d-flex justify-center">{{item.group}}</v-col>
                <v-col class="d-flex justify-center">{{item.branchId}}</v-col>
                <v-col class="d-flex justify-center" style="min-width:100px;">{{item.branch}}</v-col>
                <v-col class="d-flex justify-center align-center">
                  <img v-if="item.waitingP>=$store.state.peopleR" src="@/assets/bell_r.png">
                  <img v-if="$store.state.peopleR > item.waitingP && item.waitingP >= $store.state.peopleY" src="@/assets/bell_y.png">
                  <img v-if="$store.state.peopleY > item.waitingP" src="@/assets/bell_g.png">
                </v-col>
                <v-col class="d-flex justify-center align-center">
                  <img v-if="item.waitingT>=$store.state.timeR" src="@/assets/bell_r.png">
                  <img v-if="$store.state.timeR > item.waitingT && item.waitingT >= $store.state.timeY" src="@/assets/bell_y.png">
                  <img v-if="$store.state.timeY > item.waitingT" src="@/assets/bell_g.png">
                </v-col>
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
          </div>

      </v-row>

  </div>
</template>

<script>

  export default {
    name: 'WarnCom',

    data() {
      return {
        play: false,
        warnBoxHeight: null,
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
        } else if (this.$store.state.clientHeight >= this.$store.state.hXL) {
          that.boxHeight = that.$store.state.listHeight*9
        } else if(this.$store.state.hXL > this.$store.state.clientHeight && this.$store.state.clientHeight >= this.$store.state.hL) {
          that.boxHeight = that.$store.state.listHeight*9
        } else if(this.$store.state.hL > this.$store.state.clientHeight && this.$store.state.clientHeight >= this.$store.state.hM) {
          that.boxHeight = that.$store.state.listHeight*6
        } else if(this.$store.state.hM > this.$store.state.clientHeight && this.$store.state.clientHeight >= this.$store.state.hS) {
          that.boxHeight = that.$store.state.listHeight*3
        } else if(this.$store.state.hS > this.$store.state.clientHeight) {
          that.boxHeight = that.$store.state.listHeight*2
        }
        if(this.$store.state.openBranch == true) {
          that.warnBoxHeight = that.boxHeight
        } else {
          that.warnBoxHeight = that.boxHeight*2
        }
        return 'height:' + this.warnBoxHeight + 'px;'
      },
    },
    
    watch: {
      play:function() {
        let box = document.getElementById('warnBox')
        let that = this
        function scroll() {
          if (box.scrollTop + that.warnBoxHeight < box.scrollHeight) {
            // box.scrollTop ++;
            box.scrollTop += that.$store.state.listHeight;
            // box.scrollTop += that.warnBoxHeight;
          } else {
            box.scrollTop = 0;
          }
        }
        if(this.play) {
          window.scrollId2 = window.setInterval(scroll, this.$store.state.carouselTime);
        } else {
          window.clearInterval(window.scrollId2);
        }
      },
      warnBoxHeight:function() {
        if(this.play) {
          this.play = !this.play
          this.play = !this.play
        }
      },
    },

    methods: {  
      waitMinAvg(b) {
        let time = Math.floor(b.waitingT /60)
        window.sec = Math.floor(((b.waitingT /60) - time)*60)
        return time;
      },
      waitSecAvg() {
        return window.sec
      },
      toggleBox() {
        this.$store.state.openBranch = !this.$store.state.openBranch
        if(this.$store.state.openBranch == true) {
          this.warnBoxHeight = this.boxHeight
        } else {
          this.warnBoxHeight = this.boxHeight*2
        }        
      },
    },
    
  }
</script>
