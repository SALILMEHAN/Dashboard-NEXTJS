"use client";
import { url } from "@/app/lib/utils";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SingleUserPage = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    isAdmin: false,
    isActive: true,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await fetch(`${url}api/v1/users/${id}`, {
          method: "GET",
        });
        const userData = await userResponse.json();
        if (userData.body) {
          setUser(userData.body);
          setFormData({
            username: userData.body.username || "",
            email: userData.body.email || "",
            password: "",
            phone: userData.body.phone || "",
            address: userData.body.address || "",
            isAdmin: userData.body.isAdmin || false,
            isActive: userData.body.isActive || true,
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value === "true",
    }));
  };

  const patchUser = async (e) => {
    e.preventDefault();
    // console.log('patch user function called');

    try {
      const res = await fetch(`${url}api/v1/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push("/dashboard/users");
      } else {
        console.error("Failed to update the user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image
            src={user.img || "/default-avatar.png"}
            alt="User Image"
            fill
          />
        </div>
        {user.username.toUpperCase()}
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={patchUser} className={styles.form}>
          <input type="hidden" name="id" value={id} />
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="password"
            required
          />
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          ></textarea>
          <label>Is Admin?</label>
          <select
            name="isAdmin"
            value={formData.isAdmin}
            onChange={handleSelectChange}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <label>Is Active</label>
          <select
            name="isActive"
            value={formData.isActive}
            onChange={handleSelectChange}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
