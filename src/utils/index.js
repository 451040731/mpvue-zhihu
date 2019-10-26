// 格式化数字不足两位前面加0
function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

// 格式化时间
export function formatTime (date) {
  var date = new Date(date * 1000);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y+M+D+h+m+s;
}

// 日期(20180816 => 2018/08/16)
export function formatDate(date) {
  let year = date.slice(0, 4)
  let mon = date.slice(4, 6)
  let day = date.slice(6, 8)
  return `${year}/${mon}/${day}`
}

// 格式化HTML
export function formatHTML(html) {
  let content = html
  content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').replace(/figure/g, 'div').replace(/figcaption/g, 'blockquote').replace(/<blockquote/g, '<blockquote class="info-text"')
  content = content.replace(/<a/g, '<a class="link-text"')
  content = content.replace(/<img/g, '<img class="content-image avatar"')
  return content
}

export default {
  formatNumber,
  formatTime,
  formatDate,
  formatHTML
}
