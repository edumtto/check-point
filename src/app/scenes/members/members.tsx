'use client'
import React from 'react'
import type { Member } from '../../globals/models/member'
import { useRouter } from 'next/navigation'
import { Space, Table, Button } from 'antd'

export function MembersScene ({ members }: { members: Member[] }): JSX.Element {
  const router = useRouter()

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      defaultSortOrder: 'ascend',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', 'ascend']
    }
  ]

  const items = members
    .map(function (member) {
      return {
        key: member.id,
        name: member.fullName()
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div>
      <Space size={'large'} style={{ float: 'right', paddingBottom: 8 }}>
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
    router.push('/scenes/members/add')
    return true
  }

  function onSelectMember (): void {
    console.log('ok')
  }
}
