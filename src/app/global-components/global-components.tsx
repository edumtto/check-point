import styles from './global-components.module.css'
import React from 'react'
import Image from 'next/image'
import classNames from 'classnames'

export function NavigationBar (): JSX.Element {
  return (
    <div className={styles.navbar}>
      <h1 className={styles['navbar-title']}>CheckPoint</h1>
    </div>
  )
}

export function BackButton ({ onClick }: { onClick: () => void }): JSX.Element {
  return (
    <button className={styles['back-button']} onClick={onClick}>
      <Image src='/arrow-left-solid.svg' alt='back' width={22} height={22} />
    </button>
  )
}

export function CloseButton ({ onClick }: { onClick: () => void }): JSX.Element {
  return (
    <button className={styles['close-button']} onClick={onClick}>
      <Image src='/xmark-solid.svg' alt='close' width={16} height={16} />
    </button>
  )
}

export function SceneHeader (
  { title, showBackButton = false, handleBackButtonClick = () => undefined }:
  { title: string, showBackButton: boolean, handleBackButtonClick: () => void }
): JSX.Element {
  if (showBackButton) {
    return <div className={styles.header}>
      <BackButton onClick={handleBackButtonClick} />
      <h2 className={styles['header-title']}>{title}</h2>
    </div>
  }
  return (
    <div className={styles.header}>
      <h2 className={styles['header-title']}>{title}</h2>
    </div>
  )
}

export function ModalBox (
  { title, children, hidden, onClose }:
  { title: string, children: JSX.Element, hidden: boolean, onClose: () => void }
): JSX.Element {
  if (hidden) {
    return <>hidden</>
  }

  const contentClasses = classNames(styles['modal-content'], styles['animate-zoom'])
  return (
    <div className={styles['modal-background']}>
      <div className={styles['modal-container']}>
        <div className={contentClasses}>
          <div className={styles['modal-title-bar']}>
            <h2>{title}</h2>
            <CloseButton onClick={onClose} />
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
