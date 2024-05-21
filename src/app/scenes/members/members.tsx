'use client'
import React, { useContext, useEffect, useState } from 'react'
import type { Member } from '../../globals/models/member'
import { useRouter } from 'next/navigation'
import { Space, Table, Button, Input, Modal } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import styles from './members.module.css'
import { api } from '@/app/globals/api'
import MemberScene from './member/page'
import { appState } from '@/app/globals/database'
import { AppContext } from '@/app/globals/appContext'

export function MembersScene (): JSX.Element {
  const { members, updateMembers } = useContext(AppContext)
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedMember, setSelectedMember] = useState<Member | undefined>(undefined)

  useEffect(() => {
    console.log('use effect - Members -- isLoaded: ' + isLoaded + ' ,isFetching: ' + isFetching)
  }, [])

  console.log('-- isLoaded: ' + isLoaded + ' ,isFetching: ' + isFetching)

  if (!isFetching) {
    setIsFetching(true)

    api.getAllMembers()
      .then((value) => {
        // setTimeout(() => {
        console.log(value)
        updateMembers(value)
        setIsLoaded(true)
        appState.members = value
        // }, 3000)
      })
      .catch((reason) => {
        setIsLoaded(true)
        console.log(reason)
      })
  }

  const items = members
    .filter(filterMember)
    .map(function (member: Member) {
      return {
        key: member.id,
        name: member.fullName(),
        data: member
      }
    })
    .sort((a: any, b: any) => a.name.localeCompare(b.name))

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
        loading={!isLoaded}
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

  function onSearchChange (element: any): void {
    setSearch(element.target.value)
  }

  function memberScene (): JSX.Element {
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
        <MemberScene member={selectedMember}/>
      </Modal>
    </>
  }
}
