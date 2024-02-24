'use client'
import React, { useState } from 'react'
import styles from './page.module.css'
import { ActivitiesScene } from './scenes/activities/activities'
import { MembersScene } from './scenes/members/members'
import { MainContainer, SceneHeader } from './globals/components/global-components'
import { Menu, Layout } from 'antd'
import Database from './globals/database'
const { Sider, Content } = Layout

export default function Home (): JSX.Element {
  const [selectedMenuItem, setSelectedMenuItem] = useState('0')
  let mainTitle = 'Activities'
  const db = new Database()

  const menuItems: any[] = [
    {
      key: 'g0',
      label: 'Check In',
      type: 'group',
      children: [
        { key: '0', label: 'Activities' },
        { key: '1', label: 'Members' }
      ]
    },
    {
      key: 'g1',
      label: 'Manage',
      type: 'group',
      children: [
        { key: '2', label: 'Activities' },
        { key: '3', label: 'Members' }
      ]
    },
    {
      key: 'g2',
      label: 'About',
      type: 'group',
      children: [
        { key: '4', label: 'FAQ' },
        { key: '5', label: 'Support' }
      ]
    }
  ]

  let mainScene: React.JSX.Element
  if (selectedMenuItem === '0') {
    mainTitle = 'Activities'
    mainScene = <ActivitiesScene activities={db.activities} />
  } else {
    mainTitle = 'Members'
    mainScene = <MembersScene members={db.members} />
  }

  return (
    <MainContainer>
      <Sider className={styles['side-menu']}>
        <Menu className={styles['side-menu-content']} onClick={onMenuItemClick} defaultSelectedKeys={['0']} mode="inline" items={menuItems} />
      </Sider>
      <Content>
        <SceneHeader title={mainTitle} showBackButton={false} handleBackButtonClick={() => undefined} />
        <div className={styles['selected-scene']}>
          {mainScene}
        </div>
      </Content>
    </MainContainer>
  )

  function onMenuItemClick (item: any): void {
    setSelectedMenuItem(item.key)
  }
}
