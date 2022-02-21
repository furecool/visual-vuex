<template>
  <div class="director">

    <v-container fluid>

      <!-- --------------------- 全行資訊 --------------------- -->
      <AllCom/>

      <TableHeader/>

      <!-- --------------------- 警示分行 --------------------- -->
      <DirectorCom :infoP="infoP" :infoT="infoT"/>

    </v-container>
      
  </div>
</template>

<script>
  import AllCom from '@/components/AllCom'
  import TableHeader from '@/components/TableHeader'
  import DirectorCom from '@/components/DirectorCom'

  export default {
    name: 'Director',

    components: {
      AllCom,
      TableHeader,
      DirectorCom,
    },

    data() {
      return {
        infoP: [],
        infoT: [],
      }
    },

    created() {
      this.$store.state.inDirector = true
      this.makeInfoD()
    },

    watch: {
      '$store.state.info':function() {
        this.makeInfoD()
      }
    },

    methods: {
      makeInfoD() {
        let that = this
        this.infoP = []
        this.infoT = []
        this.$store.state.dataB.forEach(function(item) {
          that.infoP.push(item)
        })
        this.$store.state.dataB.forEach(function(item) {
          that.infoT.push(item)
        })
      },
    },

  }
</script>
