/**
 * Utility functions for formatting data across the application
 */

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const formatDateShort = (date: Date): string => {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString()
}
