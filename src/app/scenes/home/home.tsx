'use client'
import React, { useContext, useMemo } from 'react'
// import { useRouter } from 'next/navigation'
import { database } from '@/app/globals/database'
import { Card, Divider, List, Space, Statistic, Row, Col, Progress, Typography } from 'antd'
import {
  CalendarOutlined,
  TeamOutlined,
  UserOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  BarChartOutlined
} from '@ant-design/icons'
import { AppContext } from '@/app/globals/appContext'
import { DashboardCalculator } from '@/app/globals/dashboardUtils'
import { formatCurrency, formatDate } from '@/app/globals/utils/formatUtils'
import { Heading2, BodySmall } from '@/app/globals/design-system'
import styles from './home.module.css'
import { BaseCard } from '@/app/globals/components/common/Card'

const { Text } = Typography

export default function HomeScene (): JSX.Element {
  // const router = useRouter()
  const { members } = useContext(AppContext)

  const dashboardMetrics = useMemo(() => {
    const calculator = new DashboardCalculator(database.activities, members)
    return calculator.calculateMetrics()
  }, [members])

  return (
    <div className={styles.dashboardContainer}>
      <Heading2 className={styles.dashboardTitle}>Dashboard Overview</Heading2>

      {/* Total Metrics Section */}
      <BaseCard title={'Total Metrics'}>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <Statistic
              title="Total Enrolled"
              value={dashboardMetrics.totalMetrics.totalEnrolled}
              prefix={<TeamOutlined />}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <Statistic
              title="Total Classes"
              value={dashboardMetrics.totalMetrics.totalClasses}
              prefix={<CalendarOutlined />}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <Statistic
              title="Avg. Enrolled/Class"
              value={dashboardMetrics.totalMetrics.averageEnrolledPerClass}
              prefix={<UserOutlined />}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <Statistic
              title="Active Participation"
              value={dashboardMetrics.totalMetrics.activeParticipation}
              prefix={<CheckCircleOutlined />}
              suffix={`/ ${dashboardMetrics.totalMetrics.totalEnrolled}`}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <Statistic
              title="Total Registration Cost"
              value={formatCurrency(dashboardMetrics.totalMetrics.totalRegistrationCost)}
              prefix={<DollarOutlined />}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={4}>
            <Statistic
              title="Classes per Month"
              value={dashboardMetrics.totalMetrics.classesPerMonth}
              prefix={<ClockCircleOutlined />}
            />
          </Col>
        </Row>
      </BaseCard>

      {/* Class Metrics Section */}
      <BaseCard title={'Class Metrics'}>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={8} lg={8} xl={6}>
            <Statistic
              title="Average Attendance/Week"
              value={dashboardMetrics.classMetrics.averageAttendancePerWeek}
              prefix={<BarChartOutlined />}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={8} xl={6}>
            <Statistic
              title="Active Classes"
              value={dashboardMetrics.classMetrics.activeClasses}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={8} xl={6}>
            <Statistic
              title="Inactive Classes"
              value={dashboardMetrics.classMetrics.inactiveClasses}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Col>
        </Row>

        {/* Active/Inactive Classes Progress */}
        <div className={styles.progressContainer}>
          <Text strong>Class Activity Distribution</Text>
          <Progress
            percent={Math.round((dashboardMetrics.classMetrics.activeClasses / dashboardMetrics.totalMetrics.totalClasses) * 100)}
            strokeColor="#52c41a"
            format={() => `${dashboardMetrics.classMetrics.activeClasses}/${dashboardMetrics.totalMetrics.totalClasses} Active`}
          />
        </div>
      </BaseCard>

      {/* Participation Metrics Section */}
      <BaseCard title="Participation Analytics">
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={8} lg={8} xl={6}>
            <Statistic
              title="Enrolled in Multiple Classes"
              value={dashboardMetrics.participationMetrics.enrolledInMultipleClasses}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Col>
        </Row>

        <Divider />

        <Row gutter={[24, 24]}>
          <Col xs={24} sm={8} md={8} lg={8} xl={6}>
            <Card size="small" className={styles.participationCard}>
              <Statistic
                title="1 Class"
                value={dashboardMetrics.participationMetrics.participationDistribution.oneClass}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8} md={8} lg={8} xl={6}>
            <Card size="small" className={styles.participationCard}>
              <Statistic
                title="2 Classes"
                value={dashboardMetrics.participationMetrics.participationDistribution.twoClasses}
                prefix={<TeamOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8} md={8} lg={8} xl={6}>
            <Card size="small" className={styles.participationCard}>
              <Statistic
                title="3+ Classes"
                value={dashboardMetrics.participationMetrics.participationDistribution.threeOrMoreClasses}
                prefix={<CalendarOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>
      </BaseCard>

      {/* Next Classes Section */}
      <BaseCard title="Next Classes">
        <List
          dataSource={dashboardMetrics.upcomingClasses}
          renderItem={(activity) => (
            <List.Item className={styles.classItem}>
              <List.Item.Meta
                className={styles.classMeta}
                title={<div className={styles.classTitle}>{activity.name}</div>}
                description={
                  <Space direction="vertical" size="small">
                    <Text className={styles.classDetails}>{formatDate(activity.startDateTime)}</Text>
                    <Text type="secondary" className={styles.classDescription}>{activity.description}</Text>
                    <Text type="secondary" className={styles.classDetails}>Room: {activity.room.name}</Text>
                    <Text type="secondary" className={styles.classDetails}>Participants: {activity.participants.length}</Text>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
        {dashboardMetrics.upcomingClasses.length === 0 && (
          <BodySmall>No upcoming classes scheduled</BodySmall>
        )}
      </BaseCard>
    </div>
  )
}
