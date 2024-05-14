import styles from './global-components.module.css'
import React, { type ReactNode } from 'react'

import { Button, Layout } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

export function NavigationBar (): JSX.Element {
  return (
    <div className={styles.navbar}>
      <h1 className={styles['navbar-title']}>CheckPoint</h1>
    </div>
  )
}

export function SceneHeader (
  { title, showBackButton = false, handleBackButtonClick = () => undefined }:
  { title: string, showBackButton: boolean, handleBackButtonClick: () => void }
): JSX.Element {
  if (showBackButton) {
    return <div className={styles.header}>
      <Button type="primary" shape="circle" icon={<ArrowLeftOutlined />} size="large" onClick={handleBackButtonClick} />
      <h2 className={styles['header-title']}>{title}</h2>
    </div>
  }
  return (
    <div className={styles.header}>
      <h2 className={styles['header-title']}>{title}</h2>
    </div>
  )
}

export function Loader ({ isHidden }: { isHidden: boolean }): JSX.Element {
  const visibilityProp = isHidden ? 'hidden' : 'visible'
  return <div className={styles.loader} style={{ visibility: visibilityProp }}></div>
}

export function SideBar ({ items }: { items: string[] }): JSX.Element {
  const itemsMenu = items.map(function (value, index) {
    return <li key={value}>{value}</li>
  })

  return <div className={styles.sidebar}>
    <ul>
      {itemsMenu}
    </ul>
  </div>
}

export function MainContainerWithTitle (
  { title, handleBackButtonClick, children }: { title: string, handleBackButtonClick: () => void, children: ReactNode }
): JSX.Element {
  return (
    <main>
      <NavigationBar />
      <Layout className={styles.content}>
        <SceneHeader title={title} showBackButton={true} handleBackButtonClick={handleBackButtonClick} />
        {children}
      </Layout>
    </main>
  )
}

export function MainContainer ({ children }: { children: ReactNode }): JSX.Element {
  return (
    <main>
      <NavigationBar />
      <Layout className={styles.content}>
        {children}
      </Layout>
    </main>
  )
}
