import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  console.log("当前登录用户信息", store.state.user.loginUser);
  let loginUser = store.state.user.loginUser;

  // 如果之前没登录过，自动登录
  if (!loginUser || !loginUser.userRole) {
    // 加 await 是为了确保用户登录成功后再执行后续的代码
    await store.dispatch("user/getLoginUser");
    // 重新获取最新的 loginUser
    loginUser = store.state.user.loginUser;
    console.log("更新后的登录用户信息", loginUser);
  }

  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;

  // 要跳转的页面必须要登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 如果没登录，跳转到登录页面
    if (!loginUser || !loginUser.userRole) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }

    // 如果已经登录了，但是权限不足，那么跳转到无权限页面
    if (!checkAccess(loginUser, needAccess)) {
      next('/noauth');
      return; // 注意这里添加了 return，避免调用多次 next()
    }
  }

  next();
});