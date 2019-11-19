import React, { useState, useEffect } from 'react'
import muiStyled from '@/muiStyled'
import { List } from '@material-ui/core'
import { IReply, IPost, ITopic } from '@cc98/api'
import ReplyListItem from './ReplyListItem'

import useFetcher from '@/hooks/useFetcher'
import { getPostInfoById, getPostList } from '@/services/post'
import { getTopicInfoById, getTopicList } from '@/services/topic'

const ListS = muiStyled(List)({
  width: '100%',

})

interface ItemProps {
  data: IReply[]
  postList: IPost[]
  topicList: ITopic[]
}

export const ReplyList: React.FC<ItemProps> = ({ data, postList, topicList }) => (
  <ListS>
    {data.map((x, index) => (
      <ReplyListItem key={x.id} data={x} post={postList[index]} topic={topicList[index]} />
    ))}
  </ListS>
)

interface Props {
  data: IReply[]
}

export default ({ data }: Props) => {
  const [postList, setPostList] = useState<IPost[]>([])
  const [topicList, setTopicList] = useState<ITopic[]>([])
  const size = 20

  function callback() {
    let offset = data.length % size === 0 ? 20 : data.length % size
    let fromPos = data.length - offset
    if (fromPos < 0) {
        return null
    }
    let nextData = data.slice(fromPos)
    getPostList(nextData).then(res => {
      res
        .fail(err => {})
        .succeed(list => {
          let fixList = nextData.map(x => list.filter(y => y.id === x.postId)[0])
          setPostList(prevList => prevList.concat(fixList))
        })
    })
    getTopicList(nextData).then(res => {
      res
        .fail(err => {})
        .succeed(list => {
          let fixList = nextData.map(x => list.filter(y => y.id === x.topicId)[0])
          setTopicList(prevList => prevList.concat(fixList))
        })
    })
  }

  useEffect(() => {
    callback()
  }, [data])

  return (
    <ReplyList
      data={data}
      postList={postList}
      topicList={topicList}
    />
  )
}

// export default ReplyList
