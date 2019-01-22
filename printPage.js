/**
 * 打印当前页面，并去掉页眉和页脚
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