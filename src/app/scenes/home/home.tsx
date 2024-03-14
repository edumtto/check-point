'use client'
import React from 'react'
// import { useRouter } from 'next/navigation'
import { database } from '@/app/globals/database'
import { Card, Divider, List, Space, Statistic } from 'antd'
import { CalendarOutlined, TeamOutlined } from '@ant-design/icons'
// import { Member, PersonName } from '@/app/globals/models/member'

export default function HomeScene (): JSX.Element {
  // const router = useRouter()

  return (
    <div>
       <Divider/>
      <Space>
      <Statistic
            title='Activities registered'
            value={database.activities.length}
            prefix={<CalendarOutlined />}
          />

      <Divider type='vertical'/>
      <Statistic
            title='Members added'
            value={database.members.length}
            prefix={<TeamOutlined />}
          />
      </Space>
      <Divider/>
      <Card title={'Next activities'} size='small'>
        <List>
          <List.Item>
            <p>Zumba</p>
          </List.Item>
          <List.Item>
            <p>DrumFit</p>
          </List.Item>
          <List.Item>
            <p>Yoga</p>
          </List.Item>
        </List>
      </Card>
    </div>
  )
}