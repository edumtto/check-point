/* eslint-disable react/prop-types */
'use client'
import React, { useState } from 'react'
import { MemberType } from '@/app/globals/models/member'
import { Button, Descriptions, Result } from 'antd'

interface MemberSceneProps {
  member: MemberType
  // onClose: () => void
  // onDelete: (id: number) => void
}

const MemberScene = (props: MemberSceneProps): JSX.Element => {
  const member = props.member
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState<boolean | undefined>(undefined)
  const items = [
    {
      key: '1',
      label: 'First Name',
      children: member.firstName
    },
    {
      key: '2',
      label: 'Last Name',
      children: member.lastName
    },
    {
      key: '5',
      label: 'Gender',
      children: member.gender()
    },
    {
      key: '6',
      label: 'Birthday',
      children: formatDate(member.birthday)
    },
    {
      key: '4',
      label: 'Age',
      children: member.age()
    },
    {
      key: '3',
      label: 'Address',
      children: member.address
    },
    {
      key: '7',
      label: 'Email',
      children: member.email
    },
    {
      key: '8',
      label: 'Created at',
      children: formatDate(member.createdAt)
    },
    {
      key: '9',
      label: 'Comments',
      children: member.comments
    }
  ]

  if (isDeleteConfirmed === false) {
    return (
      <div>
        <Result
          status='warning'
          title='Are you sure you want to delete this member?'
          extra={[
            <Button danger key='delete' onClick={onConfirmDeleteMember}>Delete</Button>,
            <Button key='cancel' onClick={onCancelDeleteMember}>Cancel</Button>
          ]}
        />
      </div>
    )
  }

  if (isDeleteConfirmed === true) {
    // props.onClose()
    console.log('close')
  }

  return (<div>
    <Descriptions items={items} column={1} style={{ paddingTop: 32 }} />
    <Button danger onClick={onDeleteMember}>Delete</Button>
  </div>
  )

  function formatDate (date: Date): string {
    return `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`
  }

  function onDeleteMember (): void {
    setIsDeleteConfirmed(false)
  }

  function onConfirmDeleteMember (): void {
    // props.onDelete(member.id)
    console.log('delete')
  }

  function onCancelDeleteMember (): void {
    setIsDeleteConfirmed(undefined)
  }
}

export default MemberScene
