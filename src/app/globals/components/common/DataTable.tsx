import React from 'react'
import { Table } from 'antd'

interface DataTableProps {
  columns: any[]
  dataSource: any[]
  loading?: boolean
  size?: 'small' | 'middle' | 'large'
  bordered?: boolean
  pagination?: any
  onRow?: (record: any, rowIndex?: number) => any
  className?: string
}

export function DataTable ({
  columns,
  dataSource,
  loading = false,
  size = 'middle',
  bordered = false,
  pagination = { pageSize: 50 },
  onRow,
  className
}: DataTableProps): JSX.Element {
  return (
    <Table
      className={className}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      size={size}
      bordered={bordered}
      pagination={pagination}
      onRow={onRow}
    />
  )
}
