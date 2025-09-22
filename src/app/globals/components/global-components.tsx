import styles from './global-components.module.css'
import React, { type ReactNode, useState } from 'react'

import { Button, Layout, Tabs } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

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
      <h1 className={styles['navbar-title']}>CheckPoint</h1>
      {items != null && (
        <div className={styles['navbar-tabs']}>
          <Tabs
            defaultActiveKey={defaultActiveKey}
            onChange={onTabChange}
            items={items.map(item => ({ key: item.key, label: item.label }))}
            className={styles.tabs}
            centered={true}
          />
        </div>
      )}
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
  const [activeKey, setActiveKey] = useState(defaultActiveKey ?? '0')

  const handleTabChange = (key: string): void => {
    setActiveKey(key)
    onTabChange?.(key)
  }

  const activeItem = tabItems?.find(item => item.key === activeKey)

  return (
    <main>
      <NavigationBar items={tabItems} defaultActiveKey={activeKey} onTabChange={handleTabChange} />
      <Layout className={styles.content}>
        {tabItems != null ? activeItem?.children : children}
      </Layout>
    </main>
  )
}
