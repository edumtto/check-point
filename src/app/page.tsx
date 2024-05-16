'use client'
import React from 'react'
import styles from './page.module.css'
import { ActivitiesScene } from './scenes/activities/activities'
import { MembersScene } from './scenes/members/members'
import { MainContainer } from './globals/components/global-components'
import { Tabs } from 'antd'
import { database, appState } from './globals/database'
import HomeScene from './scenes/home/home'
import { api } from '@/app/globals/api'
import { ContextProvider } from './globals/appContext'

export default function StartScene (): JSX.Element {
  void api.getAllMembers()

  const items = [
    {
      key: '0',
      label: 'Home',
      children: <HomeScene />
    },
    {
      key: '1',
      label: 'Activities',
      children: <ActivitiesScene activities={database.activities} />
    },
    {
      key: '2',
      label: 'Members',
      children: <MembersScene /> // {database.members} />
    },
    {
      key: '3',
      label: 'About',
      children: 'Version 0.10'
    }
  ]

  return (
    <MainContainer>
      <ContextProvider>
      <div className={styles['selected-scene']}>
          <Tabs defaultActiveKey={appState.lastActiveTab} onChange={onTabChange} items={items}/>
        </div>
      </ContextProvider>
    </MainContainer>
  )

  function onTabChange (activeKey: string): void {
    appState.lastActiveTab = activeKey
  }
}
