import { GET, POST } from '@/utils/fetch'
import { ISignIn, ISite, IConfig, IShare } from '@cc98/api'

/**
 * 获取全站基本信息
 */
export function getSiteInfo() {
  return GET<ISite>('config/global')
}

/**
 * 获取全站主页信息
 */
export function getHomeInfo() {
  return GET<IConfig>('config/index')
}

/**
 * 获取签到信息
 */
export function getSignState() {
  return GET<ISignIn>('me/signin')
}

export function getShareToken(id: number) {
  return GET<IShare>(`share?id=${id}`)
}


/**
 * 签到
 */
export function signIn() {
  return POST<ISignIn>('me/signin')
}
