import React from 'react'
import { navigate } from '@/utils/history'
import muiStyled from '@/muiStyled'

import useModel from '@/hooks/useModel'
import userModel from '@/models/user'
import stateModel from '@/models/state'
import settingModel from '@/models/setting'

import { Divider, Drawer, List, ListItem, ListItemIcon } from '@material-ui/core'
import ListItemText from '@/hotfix/ListItemText'

import WidgetsIcon from '@material-ui/icons/Widgets'
import NotificationsIcon from '@material-ui/icons/Notifications'
import CancelIcon from '@material-ui/icons/Cancel'
import FiberNewIcon from '@material-ui/icons/FiberNew'
import HomeIcon from '@material-ui/icons/Home'
import PageviewIcon from '@material-ui/icons/Pageview'
import GroupIcon from '@material-ui/icons/Group'
import PetsIcon from '@material-ui/icons/Pets'
import SettingsIcon from '@material-ui/icons/Settings'
import HelpIcon from '@material-ui/icons/Help'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import MailIcon from '@material-ui/icons/Mail'
import ToysIcon from '@material-ui/icons/Toys'
import InfoIcon from '@material-ui/icons/Info'

import UserInfo from './UserInfo'

interface ItemProps {
  /**
   * 图标
   */
  icon: React.ReactElement<any>
  /**
   * 文字
   */
  text: string
  /**
   * 单击回调
   */
  onClick: () => void
}

const Item: React.FC<ItemProps> = ({ icon, text, onClick }) => (
  <ListItem button onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
)

const ListS = muiStyled(List)({
  width: 180,
})

const DividerS = muiStyled(Divider)({
  margin: '0 16px',
  height: 1.5,
})

const jump = (link: string) => () => navigate(link)

const DrawerMenu: React.FC = () => {
  const user = useModel(userModel)
  const { LOG_OUT } = userModel

  const { isDrawerOpen } = useModel(stateModel, ['isDrawerOpen'])
  const { CLOSE_DRAWER } = stateModel

  const { useNotification} = useModel(settingModel, ['useNotification'])
  const { customHome } = useModel(settingModel, ['customHome'])

  return (
    <Drawer open={isDrawerOpen} onClose={CLOSE_DRAWER}>
      <ListS onClick={CLOSE_DRAWER}>
        <UserInfo isLogIn={user.isLogIn} info={user.myInfo} />
        <DividerS />

        {user.isLogIn && (
          <>
            <Item icon={<HomeIcon />} text="主页" onClick={jump('/')} />
            {customHome !== 1 && (
              <Item icon={<InfoIcon />} text="资讯" onClick={jump('/info')} />
            )}
            {customHome !== 2 && (
              <Item icon={<TrendingUpIcon />} text="热门" onClick={jump('/hotTopics')} />
            )}
            {customHome !== 3 && (
              <Item icon={<FiberNewIcon />} text="新帖" onClick={jump('/newTopics')} />
            )}
            <Item icon={<WidgetsIcon />} text="版面" onClick={jump('/boardList')} />
            {customHome !== 4 && (
              <Item icon={<ToysIcon />} text="关注" onClick={jump('/myFollow')} />
            )}
            <Item icon={<NotificationsIcon color={(useNotification && user.unRead && (user.unRead.atCount || user.unRead.replyCount || user.unRead.systemCount)) ? 'secondary' : 'inherit'} />} text="通知" onClick={jump('/notice')} />
            <Item icon={<MailIcon color={(useNotification && user.unRead && (user.unRead.messageCount)) ? 'secondary' : 'inherit'} />} text="私信" onClick={jump('/messageList')} />
            <Item icon={<GroupIcon />} text="社交" onClick={jump('/social')} />
            <Item icon={<PetsIcon />} text="足迹" onClick={jump('/history')} />
            <Item icon={<PageviewIcon />} text="搜索" onClick={jump('/search')} />
            <Item icon={<SettingsIcon />} text="设置" onClick={jump('/setting')} />
            <Item icon={<HelpIcon />} text="帮助" onClick={jump('/help')} />
          </>
        )}
        {!user.isLogIn && (
          <>
            <Item icon={<HelpIcon />} text="联系" onClick={jump('https://github.com/conv1d')} />
          </>
        )}
        {user.isLogIn && (
          <>
            <Item icon={<CancelIcon />} text="退出" onClick={LOG_OUT} />
          </>
        )}
      </ListS>
    </Drawer>
  )
}

export default DrawerMenu
