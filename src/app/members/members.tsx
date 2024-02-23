'use client'
import { React, useState } from 'react'
import { Member } from '../models/member'
import { useRouter } from 'next/navigation'
// import styles from './participants.module.css'
// import { Participant } from '../models/activity'
// import type { Activity } from '../models/activity'
// import { Member, PersonName } from '../models/member'
import { Space, Table, Button } from 'antd'
// import CheckinScene from '../checkin/checkin'

export function MembersScene ({ members }: { members: Member[] }): JSX.Element {
  const router = useRouter()

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
        <Button onClick={() => onAddMember()}>Add</Button>
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

  function onAddMember (): boolean {
    console.log('add')
    router.push('/members/add')
    return true
  }

  function onSelectMember (): void {
    console.log('ok')
  }
}
