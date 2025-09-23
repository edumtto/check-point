/**
 * Utility function for merging class names
 * Similar to clsx or classnames but lightweight
 */
export function cn (...classes: Array<string | undefined | null | false>): string {
  return classes.filter(Boolean).join(' ')
}
