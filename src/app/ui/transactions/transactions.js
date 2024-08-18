import Image from "next/image"
import styles from './transactions.module.css'

const Transactions = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Latest Transactions</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Status</td>
                        <td>Date</td>
                        <td>Amount</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className={styles.user}>
                                <Image src="https://avatar.iran.liara.run/public"
                                    alt=""
                                    width={40}
                                    height={40}
                                    className={styles.userImage} />
                                SALIL MEHAN
                            </div>
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.pending}`}>
                                Pending
                            </span>
                        </td>
                        <td>30.07.2024</td>
                        <td>$999</td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.user}>
                                <Image src="https://avatar.iran.liara.run/public"
                                    alt=""
                                    width={40}
                                    height={40}
                                    className={styles.userImage} />
                                EMILY
                            </div>
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.pending}`}>
                                Pending
                            </span>
                        </td>
                        <td>30.07.2024</td>
                        <td>$999</td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.user}>
                                <Image src="https://avatar.iran.liara.run/public"
                                    alt=""
                                    width={40}
                                    height={40}
                                    className={styles.userImage} />
                                RICHA
                            </div>
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.done}`}>
                                Done
                            </span>
                        </td>
                        <td>30.07.2024</td>
                        <td>$999</td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.user}>
                                <Image src="https://avatar.iran.liara.run/public"
                                    alt=""
                                    width={40}
                                    height={40}
                                    className={styles.userImage} />
                                ALAN
                            </div>
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.cancel}`}>
                                Cancelled
                            </span>
                        </td>
                        <td>30.07.2024</td>
                        <td>$999</td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.user}>
                                <Image src="https://avatar.iran.liara.run/public"
                                    alt=""
                                    width={40}
                                    height={40} />
                                JOSEPH
                            </div>
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.done}`}>
                                Done
                            </span>
                        </td>
                        <td>30.07.2024</td>
                        <td>$999</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Transactions
