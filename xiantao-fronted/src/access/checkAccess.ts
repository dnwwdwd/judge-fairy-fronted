/**
 * 公用的权限校验方法
 * @param loginUser 当前登录用户
 * @param needAccess 需要有的权限
 * @return boolean 有权限
 */
import ACCESS_ENUM from "@/access/accessEnum";

const checkAccess = (loginUser : any, needAccess = ACCESS_ENUM.NOT_LOGIN)=> {
  // 获取当前用户具有什么权限（如果 loginUser 不存在，表示未登录）
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }
  // 如果需要用户登录才能访问
  if (needAccess === ACCESS_ENUM.USER) {
    // 如果用户没登录,那么表示无权限
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }
  // 如果需要管理员权限
  if (needAccess === ACCESS_ENUM.ADMIN) {
    // 如果不为管理员，表示无权限
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }
  return true;
};

export default checkAccess;