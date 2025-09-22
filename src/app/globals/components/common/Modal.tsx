import React from 'react'
import { Modal as AntModal } from 'antd'

interface CommonModalProps {
  title: string
  open: boolean
  onClose: () => void
  children: React.ReactNode
  footer?: React.ReactNode
}

export function CommonModal ({
  title,
  open,
  onClose,
  children,
  footer = []
}: CommonModalProps): JSX.Element {
  return (
    <AntModal
      title={title}
      open={open}
      onCancel={onClose}
      footer={footer}
    >
      {children}
    </AntModal>
  )
}
