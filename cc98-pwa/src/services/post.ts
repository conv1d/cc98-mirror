import { GET, PUT } from '@/utils/fetch'
import { IPost, IMyPosts, ILike, IReply } from '@cc98/api'

/**
 * 获取一个帖子的10层楼
 */
export function getPost(id: number, from: number) {
  return GET<IPost[]>(`topic/${id}/post`, {
    params: {
      from,
      size: 10,
    },
  })
}

export function getSharePost(shareId: string, from: number) {
  let id = shareId.slice(0, shareId.indexOf('+'))
  let share_token = shareId.slice(shareId.indexOf('+') + 1, shareId.length)
  return GET<IPost[]>(`topic/${id}/post`, {
    params: {
      share_token,
      from,
      size: 10,
    },
  })
}

export function getPostList(data: IReply[]) {
  let id = data.map(x => `id=${x.postId}`).join('&')
  return GET<IPost[]>(`post/basic?${id}`)
}

export function getPostInfoById(id: number) {
  return GET<IPost[]>(`post/basic`, {
    params: {
      id
    }
  }).then(res => Promise.resolve(res.map(postIds => postIds[0])))
}

/**
 * 逆向获取帖子
 */
export function getReversePost(id: number, from: number, total: number) {
  const floor = total + 1
  /**
   * case ex 34L  floor = 34 from = 0
   * 请求 realFrom = 25 size = 10 -> floor = 34 from = 10
   *     realFrom = 15 size = 10 -> floor = 34 from = 20
   *     realFrom = 5 size = 10 -> floor = 34 from = 30
   *     1 < floor - from < 9  realFrom = 0 size = floor - from + 1
   *     floor = from + 1
   * case ex 10L
   *     realFrom = 0 realSize = 10
   *     from = 9 total = 9
   * case
   *     from = 0 total = 10 floor = 11
   *     希望的结果 realFrom = 1
   */
  const realFrom = floor - from - 10 >= 0 ? floor - from - 10 : 0
  let realSize = from !== 0 && from === total ? 0 : 10
  if (floor - from < 9) {
    realSize = floor - from
  }

  return GET<IPost[]>(`topic/${id}/post`, {
    params: {
      from: realFrom,
      size: realSize,
    },
  }).then(res => Promise.resolve(res.map(data => data.reverse())))
}

/**
 * 获取一个帖子的单独一层
 */
export function getSinglePost(topicId: number | string, floor: number) {
  return GET<IPost[]>(`topic/${topicId}/post`, {
    params: {
      from: floor - 1,
      size: 1,
    },
  }).then(res => Promise.resolve(res.map(posts => posts[0])))
}

export function getFloor(topicId: number | string, floor: number) {
  return GET<IPost[]>(`topic/${topicId}/post`, {
    params: {
      from: floor - 1,
      size: 1,
    },
  })
}

/**
 * 追踪非匿名版块的用户
 */
export function getTracePost(topicId: number, userId: number | string, from: number) {
  return GET<IPost[]>('post/topic/user', {
    params: {
      topicId,
      userId,
      from,
      size: 10,
    },
  })
}

/**
 * 追踪匿名版块用户
 */
export function getAnonymousTracePost(topicId: number, postId: number | string, from: number) {
  return GET<IPost[]>('post/topic/anonymous/user', {
    params: {
      topicId,
      postId,
      from,
      size: 10,
    },
  })
}

/**
 * 获取热评
 */
export function getHotPost(topicId: number) {
  return GET<IPost[]>(`topic/${topicId}/hot-post`)
}

export function getShareHotPost(shareId: string) {
  let id = shareId.slice(0, shareId.indexOf('+'))
  let share_token = shareId.slice(shareId.indexOf('+') + 1, shareId.length)
  return GET<IPost[]>(`topic/${id}/hot-post`, {
    params: {
      share_token
    },
  })
}

/**
 * 获取赞/踩状态
 */
export function getLikeState(topicId: number) {
  return GET<ILike>(`post/${topicId}/like`)
}

/**
 * 赞
 */
export function putLike(topicId: number) {
  return PUT(`post/${topicId}/like`, {
    params: 1,
  })
}

/**
 * 踩
 */
export function putDislike(topicId: number) {
  return PUT(`post/${topicId}/like`, {
    params: 2,
  })
}

/**
 * 用户评分 +1或-1
 */
export function rate(id: number, value: 1 | -1, reason: string) {
  return PUT(`post/${id}/rating`, {
    params: {
      value,
      reason,
    },
  })
}

/**
 * 获取用户近期发的回复
 */
export function getMyRecentPosts(from: number) {
  return GET<IMyPosts>('me/recent-post', {
    params: {
      from,
      size: 20,
    },
  }).then(res => Promise.resolve(res.map(posts => posts.data)))
}
