import { Model } from '@/hooks/useModel'

import { getLocalStorage, setLocalStorage } from '@/utils/storage'

import { ThemeEnum, ModeEnum } from '@/theme'

interface State {
  /**
   * 主题
   */
  theme: ThemeEnum
  /**
   * 模式
   */
  mode: ModeEnum
  /**
   * 是否开启实时通知
   */
  useSignalr: boolean
  useNotification: boolean
  useCompress: boolean
  /**
   * 缓存页数
   */
  cacheSize: number
  /**
   * 自定义主页
   */
  customHome: number
}

class SettingModel extends Model<State> {
  constructor() {
    super()

    this.state = {
      theme: ThemeEnum.AUTO,
      mode: ModeEnum.LIGHT,
      useSignalr: false,
      useNotification: true,
      useCompress: true,
      cacheSize: 3,
      customHome: 1,
    }

    const setting = getLocalStorage('setting') as State | null
    this.setState(setting)
  }

  SYNC_SETTING = () => {
    setLocalStorage('setting', this.state)
  }

  TOGGLE_MODE = () => {
    this.setState(state => ({
      mode: state.mode === ModeEnum.LIGHT ? ModeEnum.DARK : ModeEnum.LIGHT,
    }))
    this.SYNC_SETTING()
  }

  CHANGE_THEME = (theme: ThemeEnum) => {
    this.setState({ theme })
    this.SYNC_SETTING()
  }

  TOGGLE_SIGNALR = () => {
    this.setState(state => ({
      useSignalr: !state.useSignalr,
    }))
    this.SYNC_SETTING()
  }

  TOGGLE_NOTIFICATION = () => {
    this.setState(state => ({
      useNotification: !state.useNotification,
    }))
    this.SYNC_SETTING()
  }

  TOGGLE_COMPRESS = () => {
    this.setState(state => ({
      useCompress: !state.useCompress,
    }))
    this.SYNC_SETTING()
  }


  CHANGE_CACHE = (size: number) => {
    this.setState({
      cacheSize: size,
    })
    this.SYNC_SETTING()
  }

  CHANGE_CUSTOMHOME = (value: number) => {
    this.setState({
      customHome: value,
    })
    this.SYNC_SETTING()
  }
}

export default new SettingModel()
