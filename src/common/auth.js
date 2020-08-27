export default class auth {
  constructor() {}
  /**
   * @description 设置cookies
   * @param {String} name cookies名称
   * @param {String} value 值
   */
  static setCookies(name, value) {
    var hours = 24;
    var d = new Date();
    d.setTime(d.getTime() + 1 * 60 * 60 * 1000 * hours);
    window.document.cookie =
      name + "=" + value + ";path=/;expires=" + d.toGMTString();
  }
  /**
   * @description 获取cookies
   * @param {String} name cookies名称
   */
  static getCookies(name) {
    var v = window.document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    return v ? v[2] : null;
  }

  /**
   * @description 移除cookies
   */
  static removeCookies() {
    var arr = ["BackARuserName", "BackARuserToken"];
    for (let i = 0; i < arr.length; i++) {
      this.setCookies(arr[i], "");
    }
  }
}
