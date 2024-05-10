'use client'
import React, { useState } from 'react'
import type { Member } from '../../globals/models/member'
import { useRouter } from 'next/navigation'
import { Space, Table, Button, Input, Modal } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import styles from './members.module.css'
import { api } from '@/app/globals/api'
import MemberScene from './[memberId]/page'

export function MembersScene({ membersProp }: { membersProp: Member[] | null }): JSX.Element {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [members, setMembers] = useState<Member[]>([])
  const [selectedMember, setSelectedMember] = useState<Member | undefined>(undefined)

  if (!isLoaded) {
    if (membersProp !== null) {
      setIsLoaded(true)
      setMembers(membersProp)
    } else {
      api.getAllMembers()
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
        name: member.fullName(),
        data: member
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
            onClick: event => { setSelectedMember(record.data) }
          }
        }}
      />
      {memberScene()}
    </div>
  )

  function filterMember(member: Member, index: any): boolean {
    if (search === '') {
      return true
    }
    return member.fullName().toLowerCase().startsWith(search.toLowerCase())
  }

  function onAddMember(): boolean {
    router.push('/scenes/members/add')
    return true
  }

  function onSearchChange(element: any): void {
    setSearch(element.target.value)
  }

  function memberScene(): JSX.Element {
    if (selectedMember === undefined) {
      return <></>
    }
    const onClose = function (): void { setSelectedMember(undefined) }
    const onDelete = function (id: number): void {
      onClose()
      api.deleteMember(id)
        .then((value) => {
          setIsLoaded(false)
        })
        .catch((reason) => {
          console.log(reason)
        })
    }

    return <>
      <Modal
        title={selectedMember.fullName()}
        open={selectedMember !== undefined}
        onCancel={onClose}
        footer={[]}
      >
        <MemberScene member={selectedMember} onClose={onClose} onDelete={onDelete} />
      </Modal>
    </>
  }
}
