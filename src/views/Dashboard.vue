<template>
  <a-layout class='index animated fadeIn'>
      <a-card >
          <a-result
                  status="info"
                   :title="'后台管理系统，欢迎您【'+user.info.username+'】!'"
                  sub-title="后台管理系统，专业的微服务架构解决方案！"
          >
              <template #extra>
                  <a-button key="console" type="primary">马上体验</a-button>
                  <a-button key="buy">立即联系</a-button>
              </template>
          </a-result>
      </a-card>
  </a-layout>
</template>

<script>
import store from "@/store";

export default {
  name: "Dashboard..vue",
  data() {
    return {

    }
  },
  computed:{
    user() {
      return store.state.user;
    }
  }
}
</script>
