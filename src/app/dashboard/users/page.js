"use client";
import Image from "next/image";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Link from "next/link";
import { url } from "@/app/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await fetch(`${url}api/v1/users`, {
        method: "GET",
      });
      const usersJson = await usersData.json();
      setUsers(usersJson.body);
    };

    fetchUsers();
  }, []);

  const deleteUser = async (e, userId) => {
    e.preventDefault();
    // console.log("delete user", userId);
    const res = await fetch(`${url}api/v1/users/${userId}`, {
      method: "DELETE",
    });
    router.push("/dashboard");
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, key) => (
              <tr key={key}>
                <td>
                  <div className={styles.user}>
                    <Image
                      src={user.img}
                      width={40}
                      height={40}
                      className={styles.userImage}
                      alt="User Image"
                    />
                    {user.username}
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toString().slice(4, 16)}</td>
                <td>{user.isAdmin ? "Admin" : "Not Admin"}</td>
                <td>{user.isActive ? "online" : "offline"}</td>
                <td>
                  <Link href={`/dashboard/users/${user.username}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <button
                    className={`${styles.button} ${styles.delete}`}
                    onClick={(e) => deleteUser(e, user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPage;
