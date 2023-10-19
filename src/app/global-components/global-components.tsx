import styles from './global-components.module.css'
import Image from 'next/image'
import { useState } from 'react';

export function NavigationBar() {
    return (
      <div className={styles["navbar"]}>
          <h1 className={styles["navbar-title"]}>CheckPoint</h1>
      </div>
    );
  }

export function BackButton({ onClick }:{ onClick: () => void}) {
    return (
        <button className={styles['back-button']} onClick={onClick}>
            <Image src='/arrow-left-solid.svg' alt='back' width={22} height={22}/>
        </button> 
    )
}

export function SceneHeader(
    { title , showBackButton = false, handleBackButtonClick = () => undefined}
    :{ title: string, showBackButton: Boolean, handleBackButtonClick: () => void}
) {
    if (showBackButton) {
        return <div className={styles["header"]}>
            <BackButton onClick={handleBackButtonClick} />
            <h2 className={styles["header-title"]}>{title}</h2>
        </div>
    }
    return (
        <div className={styles["header"]}>
            <h2 className={styles["header-title"]}>{title}</h2>
        </div>
    );
}

export function ModalBox({ children, hidden, onClose }:{ children: JSX.Element, hidden: Boolean, onClose: () => void}) {
    if (hidden) {
        return <>hidden</>;
    }
    return (
        <div className={styles["modal"]}>
            <div className={styles["modal-content"]}>
                <button className={styles["close-modal"]} onClick={onClose}>x</button>
                {children}
            </div>
        </div>
    )
}