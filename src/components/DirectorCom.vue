<template>
  <div class="directorCom">

      <v-row class="body-1 grey--text text--darken-1 font-weight-black text-no-wrap" style="margin:5px auto;">
        <!-- 人數 -->
        <v-col class="mx-2 d-flex" style="background:rgba(255, 255, 255, .4);">

          <div class="d-flex flex-column align-center justify-start" style="width:20%;">
            <v-btn v-if="!play" text fab x-small class="ma-1" @click="play=!play">
              <v-icon color="grey darken-2" >mdi-play</v-icon>
            </v-btn>
            <v-btn v-if="play" text fab x-small class="ma-1" @click="play=!play">
              <v-icon color="grey darken-2" >mdi-pause</v-icon>
            </v-btn>
          </div>

          <div id="directorBox1" class="componentBox" :style="heightOfBox">
            <div v-for="(item, id) in infoP" :key="id">
              <v-row v-if="item.waitingP >= $store.state.peopleY">
                <v-col class="d-flex justify-center">{{item.group}}</v-col>
                <v-col class="d-flex justify-center" style="min-width:100px;">{{item.branch}}</v-col>
                <v-col class="d-flex justify-center">
                  <div>
                    <v-row>
                      <v-col class="px-0 d-flex justify-center" style="width:50px;">{{item.waitingP}}人</v-col>
                    </v-row>
                  </div>
                </v-col> 
                <v-col class="d-flex justify-center align-center">
                  <img v-if="item.waitingP >= $store.state.peopleR" src="@/assets/bell_r.png">
                  <img v-if="$store.state.peopleR > item.waitingP && item.waitingP >= $store.state.peopleY" src="@/assets/bell_y.png">
                  <img v-if="$store.state.peopleY > item.waitingP" src="@/assets/bell_g.png">
                </v-col>
              </v-row>
            </div>
          </div>
        </v-col>
        <!-- 時間 -->
        <v-col class="mx-2 d-flex" style="background:rgba(255, 255, 255, .4);">

          <div class="d-flex flex-column align-center justify-start" style="width:20%;">
            <v-btn v-if="!play2" text fab x-small class="ma-1" @click="play2=!play2">
              <v-icon color="grey darken-2" >mdi-play</v-icon>
            </v-btn>
            <v-btn v-if="play2" text fab x-small class="ma-1" @click="play2=!play2">
              <v-icon color="grey darken-2" >mdi-pause</v-icon>
            </v-btn>
          </div>

          <div id="directorBox2" class="componentBox" :style="heightOfBox">
            <div v-for="(item, id) in infoT" :key="id">
              <v-row v-if="item.waitingT >= $store.state.timeY">
                <v-col class="d-flex justify-center">{{item.group}}</v-col>
                <v-col class="d-flex justify-center" style="min-width:100px;">{{item.branch}}</v-col>
                <v-col class="d-flex justify-center">
                  <div class="d-flex justify-center" style="width:100px;">
                    <v-row>
                      <v-col class="px-0 d-flex justify-end">{{waitMinAvg(item)}}分</v-col>
                      <v-col class="px-0 d-flex justify-end">{{waitSecAvg()}}秒</v-col>
                    </v-row>
                  </div>
                </v-col>
                <v-col class="d-flex justify-center align-center">
                  <img v-if="item.waitingT >= $store.state.timeR" src="@/assets/bell_r.png">
                  <img v-if="$store.state.timeR > item.waitingT && item.waitingT >= $store.state.timeY" src="@/assets/bell_y.png">
                  <img v-if="$store.state.timeY > item.waitingT" src="@/assets/bell_g.png">
                </v-col>
              </v-row>
            </div>
          </div>          
        </v-col>
        
      </v-row>

  </div>
</template>

<script>

  export default {
    name: 'DirectorCom',
    
    props: {
      infoP: [],
      infoT: [],
    },

    data() {
      return {
        play: false,
        play2: false,
        directorBoxHeight: null,
      }
    },

    created() {
      this.play = true
      this.play2 = true
    },

    computed: {
      heightOfBox:function() {
        let that = this
          if(this.$store.state.clientHeight >= this.$store.state.hXL) {
            that.boxHeight = that.$store.state.listHeight*26
          } else if(this.$store.state.hXL > this.$store.state.clientHeight && this.$store.state.clientHeight >= this.$store.state.hL) {
            that.boxHeight = that.$store.state.listHeight*24
          } else if(this.$store.state.hL > this.$store.state.clientHeight && this.$store.state.clientHeight >= this.$store.state.hM) {
            that.boxHeight = that.$store.state.listHeight*16
          } else if(this.$store.state.hM > this.$store.state.clientHeight && this.$store.state.clientHeight >= this.$store.state.hS) {
            that.boxHeight = that.$store.state.listHeight*9
          } else if(this.$store.state.hS > this.$store.state.clientHeight) {
            that.boxHeight = that.$store.state.listHeight*4
          }
          that.directorBoxHeight = that.boxHeight        
        return 'height:' + this.directorBoxHeight + 'px;'
      },      
    },

    watch: {
      '$store.state.dataB':function() {
          this.infoP.sort(this.compare('waitingP'));
          this.infoT.sort(this.compare('waitingT'));
      },
      play:function() {
        let box = document.getElementById('directorBox1')
        let that = this
        function scroll() {
          if(box.scrollTop + that.boxHeight < box.scrollHeight) {
            box.scrollTop += that.$store.state.listHeight;
            // box.scrollTop ++;
            // box.scrollTop += that.boxHeight;
          } else {
            box.scrollTop = 0;
          }
        }
        if(this.play) {
          window.scrollId4 = window.setInterval(scroll, this.$store.state.carouselTime);
        } else {
          window.clearInterval(window.scrollId4);
        }
      },
      play2:function() {
        let box2 = document.getElementById('directorBox2')
        let that = this
        function scroll() {
          if(box2.scrollTop + that.boxHeight < box2.scrollHeight) {
            box2.scrollTop += that.$store.state.listHeight;
            // box2.scrollTop ++;
            // box2.scrollTop += that.boxHeight;
          } else {
            box2.scrollTop = 0;
          }
        }
        if(this.play2) {
          window.scrollId5 = window.setInterval(scroll, this.$store.state.carouselTime);
        } else {
          window.clearInterval(window.scrollId5);
        }
      },
      directorBoxHeight:function() {
        if(this.play) {
          this.play = !this.play
          this.play = !this.play
        }
        if(this.play2) {
          this.play2 = !this.play2
          this.play2 = !this.play2
        }
      },
    },

    methods: {
      compare(attr) {
        return function(a,b) {
          var val1 = a[attr];
          var val2 = b[attr];
          return val2 - val1
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