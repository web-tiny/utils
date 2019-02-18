/*
 * @Author: Tiny 
 * @Date: 2019-02-18 15:06:57 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-02-18 15:09:00
 */

/**
 * 打印当前页面，并去掉页眉和页脚,
 * 注：兼容问题直接用css：
 * @page{
 *    size: auto;
 *    margin: 0;
 * }
 */
const printPage = (() => {
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    let hkey_root="HKEY_CURRENT_USER"
    let hkey_path = "HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\PageSetup\\"

    try {
      const REGWSH = new ActiveXObject("WScript.Shell")
      REGWSH.RegWrite(hkey_root + hkey_path + "header", "")
      REGWSH.RegWrite(hkey_root + hkey_path + "footer", "")
    } catch (e) {
      console.warn(e)
    }
  }
  window.print('_blank')
})()

export {
  printPage
}