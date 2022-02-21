<template>
  <div class="home">

    <v-container>

      <!-- --------------------- 全行資訊 --------------------- -->
      <AllCom/>

      <!-- --------------------- table header --------------------- -->
      <TableHeader/>

      <!-- --------------------- 分區資訊 --------------------- -->
      <GroupCom/>

      <!-- --------------------- 警示分行 --------------------- -->
      <WarnCom/>

      <!-- --------------------- 分行資訊 --------------------- -->
      <transition name="fade">
        <BranchCom v-show="$store.state.openBranch"/>
      </transition>      

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
    name: 'Home',

    components: {
      AllCom,
      GroupCom,
      WarnCom,
      BranchCom,
      TableHeader,
    },

    data() {
      return {
      }
    },

  }
</script>