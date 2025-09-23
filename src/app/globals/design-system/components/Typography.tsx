import React from 'react'
import { cn } from './utils'

interface TypographyProps {
  children: React.ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
}

// Heading Components
export function Heading1 ({ children, className, as: Component = 'h1' }: TypographyProps): JSX.Element {
  return (
    <Component className={cn(
      'text-4xl font-bold leading-tight tracking-tight text-on-background',
      className
    )}>
      {children}
    </Component>
  )
}

// export function Heading2 ({ children, className, as: Component = 'h2' }: TypographyProps): JSX.Element {
//   return (
//     <Component className={cn(
//       'text-3xl font-semibold leading-tight tracking-tight text-on-background',
//       className
//     )}>
//       {children}
//     </Component>
//   )
// }

export function Heading3 ({ children, className, as: Component = 'h3' }: TypographyProps): JSX.Element {
  return (
    <Component className={cn(
      'text-2xl font-semibold leading-snug tracking-tight text-on-background',
      className
    )}>
      {children}
    </Component>
  )
}

export function Heading4 ({ children, className, as: Component = 'h4' }: TypographyProps): JSX.Element {
  return (
    <Component className={cn(
      'text-xl font-medium leading-snug tracking-tight text-on-background',
      className
    )}>
      {children}
    </Component>
  )
}

export function Heading5 ({ children, className, as: Component = 'h5' }: TypographyProps): JSX.Element {
  return (
    <Component className={cn(
      'text-lg font-medium leading-snug tracking-tight text-on-background',
      className
    )}>
      {children}
    </Component>
  )
}

export function Heading6 ({ children, className, as: Component = 'h6' }: TypographyProps): JSX.Element {
  return (
    <Component className={cn(
      'text-base font-medium leading-snug tracking-tight text-on-background',
      className
    )}>
      {children}
    </Component>
  )
}

// Text Components
export function BodyLarge ({ children, className, as: Component = 'p' }: TypographyProps): JSX.Element {
  return (
    <Component className={cn(
      'text-lg leading-relaxed text-on-surface',
      className
    )}>
      {children}
    </Component>
  )
}

export function Body ({ children, className, as: Component = 'p' }: TypographyProps): JSX.Element {
  return (
    <Component className={cn(
      'text-base leading-normal text-on-surface',
      className
    )}>
      {children}
    </Component>
  )
}

export function BodySmall ({ children, className, as: Component = 'p' }: TypographyProps): JSX.Element {
  return (
    <Component className={cn(
      'text-sm leading-normal text-on-surface-variant',
      className
    )}>
      {children}
    </Component>
  )
}

export function Caption ({ children, className, as: Component = 'span' }: TypographyProps): JSX.Element {
  return (
    <Component className={cn(
      'text-xs leading-normal text-on-surface-variant',
      className
    )}>
      {children}
    </Component>
  )
}

export function Overline ({ children, className, as: Component = 'span' }: TypographyProps): JSX.Element {
  return (
    <Component className={cn(
      'text-xs font-medium uppercase tracking-wider text-on-surface-variant',
      className
    )}>
      {children}
    </Component>
  )
}

// Label Components
export function Label ({ children, className, as: Component = 'label' }: TypographyProps): JSX.Element {
  return (
    <Component className={cn(
      'text-sm font-medium leading-normal text-on-surface',
      className
    )}>
      {children}
    </Component>
  )
}

export function LabelSmall ({ children, className, as: Component = 'label' }: TypographyProps): JSX.Element {
  return (
    <Component className={cn(
      'text-xs font-medium leading-normal text-on-surface-variant',
      className
    )}>
      {children}
    </Component>
  )
}

// Code Components
export function Code ({ children, className, as: Component = 'code' }: TypographyProps): JSX.Element {
  return (
    <Component className={cn(
      'font-mono text-sm bg-surface-variant px-2 py-1 rounded-md text-on-surface',
      className
    )}>
      {children}
    </Component>
  )
}

export function CodeBlock ({ children, className, as: Component = 'pre' }: TypographyProps): JSX.Element {
  return (
    <Component className={cn(
      'font-mono text-sm bg-surface-variant p-4 rounded-lg overflow-x-auto text-on-surface',
      className
    )}>
      {children}
    </Component>
  )
}

// Link Component
// export function Link ({ children, className, as: Component = 'a', ...props }: TypographyProps & React.AnchorHTMLAttributes<HTMLAnchorElement>): JSX.Element {
//   return (
//     <Component className={cn(
//       'text-primary-500 hover:text-primary-600 underline-offset-4 hover:underline transition-colors',
//       className
//     )} {...props}>
//       {children}
//     </Component>
//   )
// }
