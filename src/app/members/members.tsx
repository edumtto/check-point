'use client'
import { React, useState } from 'react'
import { Member } from '../models/member'
// import styles from './participants.module.css'
// import { Participant } from '../models/activity'
// import type { Activity } from '../models/activity'
// import { Member, PersonName } from '../models/member'
import { Space, Table, Button } from 'antd'
// import CheckinScene from '../checkin/checkin'

export function MembersScene ({ members }: { members: Member[] }): JSX.Element {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: { compare: (a: any, b: any) => a.name.localeCompare(b.name) },
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend']
    }
  ]

  const items = members
    .map(function (member) {
      return {
        name: member.fullName()
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div>
      <Space size={'large'} style={{ float: 'right' }}>
        <Button>Add</Button>
      </Space>
      <Table
        size='small'
        columns={columns}
        dataSource={items}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => { onSelectMember() }
          }
        }}
      />
    </div>
  )

  function onSelectMember(): void {
    console.log('ok')
  }
}
