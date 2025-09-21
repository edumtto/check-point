import React from 'react'
import { Card } from 'antd'

export function BaseCard ({ title, children }: { title: string, children: React.ReactNode }): React.JSX.Element {
  return (
    <Card
      style={styles.card}
      bodyStyle={{ padding: 'var(--spacing-6)' }}
      title={title}
    >
      {children}
    </Card>
  )
}

export function CompactCard ({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <Card
      style={styles.card}
      bodyStyle={{ padding: 0 }}
    >
      {children}
    </Card>
  )
}

const styles = {
  card: {
    marginBottom: 'var(--spacing-6)',
    borderRadius: 'var(--border-radius-lg)',
    boxShadow: 'var(--shadow-sm)',
    transition: 'box-shadow var(--animation-duration-normal) var(--animation-easing-ease-out)'
  }
}
