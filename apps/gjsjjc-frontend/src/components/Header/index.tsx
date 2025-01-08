import styles from './index.module.scss'

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.titleWrap}>
        <div className={styles.title}>处置列表</div>
      </div>

      <div className={styles.arrowWrap}>
        <div className={styles.arrowLeft}></div>
        <div className={styles.arrowRight}></div>
      </div>
      <div className={styles.rightBox}>
        {new Array(4).fill('').map((_, i) => (
          <div className={styles['rightBox' + (i + 1)]}></div>
        ))}
      </div>
    </div>
  )
}

export default Header
