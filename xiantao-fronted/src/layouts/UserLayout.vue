<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh;">
      <a-layout-header class="header">
        <a-space>
          <img src="../assets/img.png" class="logo"/>
          <div >闲淘</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://github.com/dnwwdwd" target="_blank">
          闲淘 by C1own
        </a>
      </a-layout-footer>
    </a-layout>
  </div>

</template>

<script setup lang="ts">

</script>

<style scoped>
#userLayout {
  text-align: center;
  background: url("../assets/img.png") no-repeat center;
}

#userLayout .logo{
  width: 64px;
  height: 64px;
}

#userLayout .header{
  margin-bottom: 16px;
  margin-top: 16px;
}

#userLayout .content {
  margin-bottom: 16px;
  padding: 20px;
}

#userLayout .footer{
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
