import styles from './global-components.module.css'
import Image from 'next/image'

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