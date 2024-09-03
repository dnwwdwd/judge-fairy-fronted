<template>
  <a-layout class="layout-demo">
    <a-layout-sider hide-trigger collapsible>
      <div class="logo" />
      <a-menu
        :defaultOpenKeys="['1']"
        :defaultSelectedKeys="['0_1']"
        :style="{ width: '100%' }"
      >
        <img
          id="logo"
          src="https://img.te5.com/uploads/allimg/220823/232-220R3104402.jpg"
          height="46px"
          width="80px"
          style="margin-left: 30px; margin-bottom: 20px"
        />
        <router-link to="/">
          <a-menu-item key="0_1">
            <IconHome />
            首页
          </a-menu-item>
        </router-link>
        <router-link to="/notice">
          <a-menu-item key="0_2">
            <IconCalendar />
            通知
          </a-menu-item>
        </router-link>
        <router-link to="/my">
          <a-menu-item key="0_3">
            <IconCalendar />
            我的
          </a-menu-item>
        </router-link>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout style="padding: 0 24px">
        <a-layout-content>
          <router-view />
        </a-layout-content>

      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts"></script>

<style scoped>
.layout-demo {
  height: 100vh; /* 使布局占据整个视口高度 */
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}


#logo{
  margin-top: 30px;
  border-radius: 20px;
}
</style>
