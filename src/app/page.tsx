'use client'
import React, { useState } from 'react'
import styles from './page.module.css'
import { ActivitiesScene } from './scenes/activities/activities'
import { MembersScene } from './scenes/members/members'
import { NavigationBar, SceneHeader } from './globals/components/global-components'
import { Menu, Layout } from 'antd'
import { activitiesDB, membersDB } from './globals/database'
const { Sider } = Layout
export default function Home (): JSX.Element {
  const [selectedMenuItem, setSelectedMenuItem] = useState('0')
  let mainTitle = 'Activities'

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
    mainScene = <ActivitiesScene activities={activitiesDB}/>
  } else {
    mainTitle = 'Members'
    mainScene = <MembersScene members={membersDB} />
  }

  return (
    <main className={styles.main}>
      <NavigationBar />
      {/* <Header>AAA</Header> */}
        <Layout className={styles.content}>
          <Sider className={styles['side-menu']}>
          <Menu className={styles['side-menu-content']} onClick={onMenuItemClick} defaultSelectedKeys={['0']} mode="inline" items={menuItems}/>
          </Sider>
          <div>
            <SceneHeader title={mainTitle} showBackButton={false} handleBackButtonClick={() => undefined} />
            <div className={styles['main-scene']}>
             {mainScene}
            </div>
          </div>
        </Layout>
    </main>
  )

  function onMenuItemClick (item: any): void {
    // console.log('click ', item.key)
    setSelectedMenuItem(item.key)
  }
}
