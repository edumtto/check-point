'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './participants.module.css'
import { Participant } from '../../../globals/models/activity'
import { MainContainerWithTitle } from '../../../globals/components/global-components'
import { Member, PersonName } from '../../../globals/models/member'
import { Modal, Table, Statistic, Space, Alert } from 'antd'
import CheckinScene from '../../checkin/checkin'
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons'
import { database } from '../../../globals/database'

export default function ParticipantsScene ({ params }: { params: { activityId: string } }): JSX.Element {
  const router = useRouter()
  const activity = database.getActivity(params.activityId)

  if (activity === undefined) {
    return (
      <MainContainerWithTitle title='Participants' handleBackButtonClick={() => { router.push('/') }}>
        <div className={styles['participants-content']}>
          <Alert message='No activity found.' type="error" />
        </div>
      </MainContainerWithTitle>
    )
  }

  if (activity.participants.length === 0) {
    return (
      <MainContainerWithTitle title='Participants' handleBackButtonClick={() => { router.push('/') }}>
        <div className={styles['participants-content']}>
          <Alert message='No registered participants yet.' type="warning" />
        </div>
      </MainContainerWithTitle>
    )
  }

  const nullParticipant = new Participant(new Member(0, new PersonName('', '', '')))
  const [selected, setSelected] = useState(nullParticipant)

  function onSelectParticipant (participant: Participant): void {
    setSelected(participant)
  }

  function checkinScene (): JSX.Element {
    const onClose = function (): void { setSelected(nullParticipant) }
    const children = <CheckinScene participant={selected} onCheck={onClose} />
    return <>
      <Modal
        title={selected.member.fullName()}
        open={selected.member.id !== nullParticipant.member.id}
        onCancel={onClose}
        footer={[]}
      >
        {children}
      </Modal>
    </>
  }

  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: { compare: (a: any, b: any) => a.name.localeCompare(b.name) },
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend']
    },
    {
      title: 'Check in Time',
      dataIndex: 'checkInTime',
      key: 'checkInTime',
      sorter: { compare: (a: any, b: any) => a.checkInTime.localeCompare(b.checkInTime) }
    },
    {
      title: 'Check out Time',
      dataIndex: 'checkOutTime',
      key: 'checkOutTime',
      sorter: { compare: (a: any, b: any) => a.checkOutTime.localeCompare(b.checkOutTime) }
    }
  ]

  const tableData = activity.participants
    .map(function (p) {
      return {
        key: p.member.id,
        name: p.member.fullName(),
        checkInTime: p.checkInDate?.toLocaleTimeString() ?? '',
        checkOutTime: p.checkOutDate?.toLocaleTimeString() ?? '',
        participant: p
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  const checkedInNumber = tableData
    .reduce(function (total, item) {
      return item.participant.isCheckedIn() ? total + 1 : total
    }, 0)

  const checkedOutNumber = tableData
    .reduce(function (total, item) {
      return item.participant.isCheckedOut() ? total + 1 : total
    }, 0)

  return (
    <MainContainerWithTitle title='Participants' handleBackButtonClick={() => { router.push('/') }}>
      <div className={styles['participants-content']}>
        <Space size={'large'} className={styles['participants-statistics']}>
          <Statistic
            title='Checked In'
            value={checkedInNumber}
            prefix={<LoginOutlined className={styles['checkin-icon']} />}
            suffix={'/ ' + activity.participants.length}
          />
          <Statistic
            title='Checked Out'
            value={checkedOutNumber}
            prefix={<LogoutOutlined className={styles['checkout-icon']} />}
            suffix={'/ ' + activity.participants.length}
          />
        </Space>
        <Table
          size='small'
          columns={tableColumns}
          dataSource={tableData}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => { onSelectParticipant(record.participant) }
            }
          }}
        />
        {checkinScene()}
      </div>
    </MainContainerWithTitle>
  )
}
