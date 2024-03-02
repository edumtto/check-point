'use client'
import React from 'react'
import styles from './page.module.css'
import { ActivitiesScene } from './scenes/activities/activities'
import { MembersScene } from './scenes/members/members'
import { MainContainer } from './globals/components/global-components'
import { Tabs } from 'antd'
import { database, appState } from './globals/database'

export default function Home (): JSX.Element {
  const items = [
    {
      key: '0',
      label: 'Activities',
      children: <ActivitiesScene activities={database.activities} />
    },
    {
      key: '1',
      label: 'Members',
      children: <MembersScene members={database.members} />
    },
    {
      key: '2',
      label: 'Analytics',
      children: 'Analytics data'
    },
    {
      key: '3',
      label: 'About',
      children: 'Version 0.10'
    }
  ]

  return (
    <MainContainer>
        <div className={styles['selected-scene']}>
          <Tabs defaultActiveKey={appState.lastActiveTab} onChange={onTabChange} items={items}/>
        </div>
    </MainContainer>
  )

  function onTabChange (activeKey: string): void {
    appState.lastActiveTab = activeKey
  }
}
