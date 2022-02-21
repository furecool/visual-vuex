<template>
  <v-app id="app">

    <div v-if="loading" class="d-flex justify-center align-center" style="height:100vh;">
      <v-progress-circular
        :size="100"
        :width="7"
        color="red darken-3"
        indeterminate
      ></v-progress-circular>
    </div>

    <div v-if="!loading">
      <Navbar/>
      <v-main class="lighten-3 back">
        <keep-alive>
          <router-view/>
        </keep-alive>      
      </v-main>
    </div>

  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',

  components: {
    Navbar,
  },

  data() {
    return {
      auth: '00',
      id: '002',
      // id: '0002',
      getTime: 5000,
      readTime: 0,
      loading: true,
    }
  },

  created() {

    let that = this
    let url = 'http://localhost:2211/api/visualdata'
    // let url = './data.json'
    // let url = 'Api/api/visualdata'
    
    function getInfo() {
      that.$axios.post(url,{author: that.auth,id: that.id})
      .then(function(res) {
        that.$store.state.dataT = res.data.Payload.DataTotal
        that.$store.state.dataG = res.data.Payload.DataGroupList
        that.$store.state.dataB = res.data.Payload.DataBranchList
        that.loading = false
        that.$store.state.infoChange = !that.$store.state.infoChange
        // console.log(res.data.Payload.DataBranchList)
      })
      .catch(function(err) {
        console.log(err)
      })
      // console.log(that.readTime+=1)
    }

    clearInterval(setInterval(getInfo, that.getTime))
    getInfo()
    setInterval(getInfo, that.getTime)

    // 在這修改權限代碼及對應頁
    if(this.auth=='00') {
      this.$router.push({
        name:'Home',
        params: {
          // 'homeName': '000'
        }
      }).catch(err => {err});
    } else if(this.auth=='01') {
      this.$router.push({
        name:'Director',
        params: {
          // 'directorName': '001'
        }
      }).catch(err => {err});
    } else if(this.auth=='02') {
      this.$router.push({
        name:'Group',
        params: {
          // 'districtName': this.id
        }
      }).catch(err => {err});
    } else if(this.auth=='03') {
      this.$router.push({
        name:'Branch',
        params: {
          // 'branchId': this.id
        }
      }).catch(err => {err});
    }

  },

  mounted() {
    let that = this
    window.onresize = function(){
      that.$store.state.clientHeight = document.documentElement.clientHeight
    }
  },

};
</script>

<style>

  body {
    background-color: #ededed;
    overflow: hidden;
  }
  body::-webkit-scrollbar {
    display: none;
  }
  #app {
    background-color: #ededed;
  }


  /* 背景樣式 */

  .back {
    position: relative;
    overflow: hidden;
    background-color: #e9e8e8;
  }
  .back::before {
    content: "";
    position: absolute;
    width: 250%;
    height: 2000px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    left: -150%;
    z-index: 0;
  }

  /* views */

  .container {
    max-width: 100%;
  }

  /* components */

  .col {
    padding: 0px;
  }
  .headerList {
    cursor: pointer;
  }

  /* componentBox */

  .componentBox {
    flex:1;
    overflow-x: hidden;
    overflow-y: scroll;
    margin:0 auto;
    transition: all .3s ease;
  }
  .componentBox::-webkit-scrollbar {
    background-color: rgba(0, 0, 0, 0);
    width: 10px;
  }
  .componentBox::-webkit-scrollbar-thumb {
    background: #707070;
  }
  .componentBox .row {
    margin: 0;
  }
  .componentBox .col {
    line-height: 2rem;
  }
  .componentBox img {
    width: 18px;
  }

  /* fade */

  .fade-leave-active,
  .fade-enter-active {
    transition: all .2s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-to,
  .fade-leave {
    opacity: 1;
  }

  
</style>
