import { Activity } from './models/activity'
import { Member } from './models/member'

export interface DashboardMetrics {
  totalMetrics: {
    totalEnrolled: number
    totalClasses: number
    averageEnrolledPerClass: number
    activeParticipation: number
    totalRegistrationCost: number
    classesPerMonth: number
  }
  classMetrics: {
    averageAttendancePerWeek: number
    activeClasses: number
    inactiveClasses: number
  }
  participationMetrics: {
    enrolledInMultipleClasses: number
    participationDistribution: {
      oneClass: number
      twoClasses: number
      threeOrMoreClasses: number
    }
  }
  upcomingClasses: Activity[]
}

export class DashboardCalculator {
  private readonly activities: Activity[]
  private readonly members: Member[]

  constructor (activities: Activity[], members: Member[]) {
    this.activities = activities
    this.members = members
  }

  calculateMetrics(): DashboardMetrics {
    return {
      totalMetrics: this.calculateTotalMetrics(),
      classMetrics: this.calculateClassMetrics(),
      participationMetrics: this.calculateParticipationMetrics(),
      upcomingClasses: this.getUpcomingClasses()
    }
  }

  private calculateTotalMetrics () {
    const totalEnrolled = this.members.length
    const totalClasses = this.activities.length
    const totalParticipants = this.activities.reduce((sum, activity) => sum + activity.participants.length, 0)
    const averageEnrolledPerClass = totalClasses > 0 ? totalParticipants / totalClasses : 0

    // Active participation: members who have participated in at least one class in the last month
    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
    const activeParticipation = this.members.filter(member =>
      this.activities.some(activity =>
        activity.startDateTime >= oneMonthAgo &&
        activity.participants.some(p => p.member.id === member.id)
      )
    ).length

    // Assume a registration cost of $50 per member (this could be made configurable)
    const totalRegistrationCost = totalEnrolled * 50

    // Classes per month: calculate average classes per month over the last 3 months
    const threeMonthsAgo = new Date()
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
    const recentActivities = this.activities.filter(activity => activity.startDateTime >= threeMonthsAgo)
    const classesPerMonth = recentActivities.length / 3

    return {
      totalEnrolled,
      totalClasses,
      averageEnrolledPerClass: Math.round(averageEnrolledPerClass * 10) / 10,
      activeParticipation,
      totalRegistrationCost,
      classesPerMonth: Math.round(classesPerMonth * 10) / 10
    }
  }

  private calculateClassMetrics () {
    // Average attendance per week
    const currentWeek = new Date()
    currentWeek.setDate(currentWeek.getDate() - 7)
    const weeklyActivities = this.activities.filter(activity => activity.startDateTime >= currentWeek)
    const totalWeeklyAttendance = weeklyActivities.reduce((sum, activity) => sum + activity.participants.length, 0)
    const averageAttendancePerWeek = weeklyActivities.length > 0 ? totalWeeklyAttendance / weeklyActivities.length : 0

    // Active vs Inactive classes (classes with participants vs without)
    const activeClasses = this.activities.filter(activity => activity.participants.length > 0).length
    const inactiveClasses = this.activities.length - activeClasses

    return {
      averageAttendancePerWeek: Math.round(averageAttendancePerWeek * 10) / 10,
      activeClasses,
      inactiveClasses
    }
  }

  private calculateParticipationMetrics () {
    // Calculate how many members are enrolled in multiple classes
    const memberClassCounts = new Map<number, number>()

    this.activities.forEach(activity => {
      activity.participants.forEach(participant => {
        const memberId = participant.member.id
        memberClassCounts.set(memberId, (memberClassCounts.get(memberId) || 0) + 1)
      })
    })

    const enrolledInMultipleClasses = Array.from(memberClassCounts.values())
      .filter(count => count > 1).length

    // Participation distribution
    const oneClass = Array.from(memberClassCounts.values()).filter(count => count === 1).length
    const twoClasses = Array.from(memberClassCounts.values()).filter(count => count === 2).length
    const threeOrMoreClasses = Array.from(memberClassCounts.values()).filter(count => count >= 3).length

    return {
      enrolledInMultipleClasses,
      participationDistribution: {
        oneClass,
        twoClasses,
        threeOrMoreClasses
      }
    }
  }

  private getUpcomingClasses (): Activity[] {
    const now = new Date()
    return this.activities
      .filter(activity => activity.startDateTime > now)
      .sort((a, b) => a.startDateTime.getTime() - b.startDateTime.getTime())
      .slice(0, 5) // Show next 5 classes
  }
}
