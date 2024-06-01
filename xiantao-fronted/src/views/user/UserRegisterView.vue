<template>
  <div id="userRegister">
    <h2 style="margin-bottom: 16px; margin-left: 30px">用户注册</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      :model="form"
      auto-label-width
      @submit="handleSubmit"
      label-align="right"
    >
      <a-form-item field="账号" tooltip="账号不少于4位" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="密码" label="密码" tooltip="密码不少于8位">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item
        field="确认密码"
        label="确认密码"
        tooltip="确认密码不少于8位"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请输入确认密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          style="
            width: 120px;
            margin-left: 110px;
            border-radius: 5%;
            margin-top: 10px;
          "
          >注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";

const router = useRouter();

const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
});
const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);
  if (res?.code === 0) {
    message.success("注册成功");
    // 跳转到主页
    router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败" + (res.message ? `，${res.message}` : ""));
  }
};
</script>