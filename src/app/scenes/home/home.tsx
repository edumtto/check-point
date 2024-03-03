'use client'
import React from 'react'
// import { useRouter } from 'next/navigation'
import { database } from '@/app/globals/database'
import { Card, Divider, List, Space } from 'antd'
// import { Member, PersonName } from '@/app/globals/models/member'

export default function HomeScene (): JSX.Element {
  // const router = useRouter()

  return (
    <div>
       <Divider/>
      <Space>
      <h4>{ database.activities.length + ' activities registered'}</h4>
      <Divider type='vertical'/>
      <h4>{ database.members.length + ' members added'}</h4>
      </Space>
      <Divider/>
      <Card title={'Next activities'} size='small'>
        <List>
          <List.Item>
            <p>aaa</p>
          </List.Item>
        </List>
      </Card>
    </div>
  )
}
