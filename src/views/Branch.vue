<template>
  <div class="branch">

    <v-container>

      <!-- --------------------- 全行資訊 --------------------- -->
      <AllCom/>

      <!-- --------------------- table header --------------------- -->
      <TableHeader/>

      <!-- --------------------- 分區資訊 --------------------- -->
      <GroupCom/>

      <!-- --------------------- 警示分行 --------------------- -->
      <WarnCom v-show="warnOrNot"/>

      <!-- --------------------- 分行資訊 --------------------- -->
      <BranchCom v-show="!warnOrNot"/>

    </v-container>

  </div>
</template>

<script>
  import AllCom from '@/components/AllCom'
  import GroupCom from '@/components/GroupCom'
  import WarnCom from '@/components/WarnCom'
  import BranchCom from '@/components/BranchCom'
  import TableHeader from '@/components/TableHeader'

  export default {
    name: 'Branch',

    components: {
      AllCom,
      GroupCom,
      WarnCom,
      BranchCom,
      TableHeader
    },

    data() {
      return {
        branchObj: {},
      }
    },

    created() {
      this.$store.state.inBranch = true
      this.makeInfoB();
    },

    computed: {
      warnOrNot: function() {
        let warn
        if(this.branchObj.waitingP >= this.$store.state.peopleY || this.branchObj.waitingT >= this.$store.state.timeY) {
          warn = true
        } else {
          warn = false
        }
        return warn
      }
    },

    watch: {
      '$store.state.dataB':function() {
        this.makeInfoB();
      }
    },

    methods: {
      makeInfoB() {
        let that = this
        this.$store.state.dataB.forEach(function(item) {
              that.branchObj = item
        });
      }
    },

  }
</script>