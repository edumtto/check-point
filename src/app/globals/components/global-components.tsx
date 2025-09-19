import styles from './global-components.module.css'
import React, { type ReactNode, useState } from 'react'

import { Button, Layout, Tabs } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

export function TabContentManager ({
  items,
  defaultActiveKey,
  onTabChange
}: {
  items?: any[]
  defaultActiveKey?: string
  onTabChange?: (activeKey: string) => void
}): JSX.Element {
  const [activeKey, setActiveKey] = useState(defaultActiveKey ?? '0')

  const handleTabChange = (key: string): void => {
    setActiveKey(key)
    onTabChange?.(key)
  }

  const activeItem = items?.find(item => item.key === activeKey)

  return (
    <>
      <div className={styles.navbar}>
        {items != null && (
          <div className={styles['navbar-tabs']}>
            <Tabs
              activeKey={activeKey}
              onChange={handleTabChange}
              items={items.map(item => ({ key: item.key, label: item.label }))}
              className={styles.tabs}
            />
          </div>
        )}
        <h1 className={styles['navbar-title']}>CheckPoint</h1>
      </div>
      {activeItem?.children}
    </>
  )
}

export function NavigationBar ({
  items,
  defaultActiveKey,
  onTabChange
}: {
  items?: any[]
  defaultActiveKey?: string
  onTabChange?: (activeKey: string) => void
}): JSX.Element {
  return (
    <div className={styles.navbar}>
      {items != null && (
        <div className={styles['navbar-tabs']}>
          <Tabs
            defaultActiveKey={defaultActiveKey}
            onChange={onTabChange}
            items={items.map(item => ({ key: item.key, label: item.label }))}
            className={styles.tabs}
          />
        </div>
      )}
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
  { title, handleBackButtonClick, children, tabItems, defaultActiveKey, onTabChange }:
  { title: string, handleBackButtonClick: () => void, children: ReactNode, tabItems?: any[], defaultActiveKey?: string, onTabChange?: (activeKey: string) => void }
): JSX.Element {
  return (
    <main>
      <NavigationBar items={tabItems} defaultActiveKey={defaultActiveKey} onTabChange={onTabChange} />
      <Layout className={styles.content}>
        <SceneHeader title={title} showBackButton={true} handleBackButtonClick={handleBackButtonClick} />
        {children}
      </Layout>
    </main>
  )
}

export function MainContainer ({ children, tabItems, defaultActiveKey, onTabChange }: { children: ReactNode, tabItems?: any[], defaultActiveKey?: string, onTabChange?: (activeKey: string) => void }): JSX.Element {
  if (tabItems != null) {
    return (
      <main>
        <TabContentManager items={tabItems} defaultActiveKey={defaultActiveKey} onTabChange={onTabChange} />
        <Layout className={styles.content}>
          {children}
        </Layout>
      </main>
    )
  }

  return (
    <main>
      <NavigationBar />
      <Layout className={styles.content}>
        {children}
      </Layout>
    </main>
  )
}
