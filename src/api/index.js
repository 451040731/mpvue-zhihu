import fly from '@/api/request'

export async function fetch (url,params,obj) {
  return new Promise((resolve, reject) => {
    fly.request(url,params,{
      method: obj.method,
    })
    .then(response => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
  })
}

//接口类
export default {
  /*最新消息*/
	getLatestArticle() {
		return fetch('/4/news/latest',null,{
      method: 'get'
    })
  },
  // 过往消息
  getBeforeArticle(data) {
		return fetch(`/4/news/before/${data}`,null,{
      method: 'get'
    })
  },
  //文章详情
  getArticleDetail(id) {
		return fetch(`/4/news/${id}`,null,{
      method: 'get'
    })
  },
  //评论和赞
  getArticleExtra(id) {
		return fetch(`/4/story-extra/${id}`,null,{
      method: 'get'
    })
  },
  // 文章短评论
  getShortComment(id) {
    return fetch(`/4/story/${id}/short-comments`,null,{
      method: 'get'
    })
  },
  // 文章短评论（更多）
  getShortCommentMore(id,lastId) {
    return fetch(`/4/story/${id}/short-comments/before/${lastId}`,null,{
      method: 'get'
    })
  },
}
