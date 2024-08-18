"use client";
import styles from "@/app/ui/dashboard/dashboard.module.css";
import Transactions from "../ui/transactions/transactions";

const Dashbaord = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <Transactions />
      </div>
    </div>
  );
};

export default Dashbaord;
