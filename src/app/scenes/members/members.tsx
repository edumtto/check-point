'use client'
import React, { useState } from 'react'
import type { Member } from '../../globals/models/member'
import { useRouter } from 'next/navigation'
import { Space, Table, Button, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import styles from './members.module.css'
import { api } from '@/app/globals/api'

export function MembersScene ({ membersProp }: { membersProp: Member[] | null }): JSX.Element {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [members, setMembers] = useState<Member[]>([])

  if (!isLoaded) {
    if (membersProp !== null) {
      setIsLoaded(true)
      setMembers(membersProp)
    } else {
      api.getNewMembers()
        .then((value) => {
          console.log(value)
          setIsLoaded(true)
          setMembers(value)
        })
        .catch((reason) => {
          setIsLoaded(true)
          console.log(reason)
        })
    }
  }

  const items = members
    .filter(filterMember)
    .map(function (member) {
      return {
        key: member.id,
        name: member.fullName()
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
      // defaultSortOrder: 'ascend',
      // sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      // sortDirections: ['ascend', 'descend', 'ascend']
    }
  ]

  return (
    <div>
      <Space size={'large'} style={{ float: 'right', paddingBottom: 8 }}>
        <Input addonBefore={<SearchOutlined />} onChange={onSearchChange} />
        <Button onClick={() => onAddMember()}>Add</Button>
      </Space>
      <Table
        className={styles.members__list}
        size='small'
        columns={columns}
        dataSource={items}
        pagination={{ pageSize: 15 }}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => { onSelectMember() }
          }
        }}
      />
    </div>
  )

  function filterMember (member: Member, index: any): boolean {
    if (search === '') {
      return true
    }
    return member.fullName().toLowerCase().startsWith(search.toLowerCase())
  }

  function onAddMember (): boolean {
    router.push('/scenes/members/add')
    return true
  }

  function onSelectMember (): void {
    console.log('ok')
  }

  function onSearchChange (element: any): void {
    setSearch(element.target.value)
  }
}
