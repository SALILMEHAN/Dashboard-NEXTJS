"use client";
import Navbar from "../ui/navbar/navbar";
import styles from "@/app/ui/dashboard/dashboard.module.css";
import Sidebar from "../ui/sidebar/sidebar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const layout = ({ children }) => {
  const { id, premium } = useSelector((store) => store.user);
  const router = useRouter();
  useEffect(() => {
    if (!id) {
      router.push("/sign-in");
    }
    if (premium) {
      document.documentElement.setAttribute("data-theme", "premium");
    } else {
      document.documentElement.setAttribute("data-theme", "default");
    }
  }, [premium]);
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default layout;
