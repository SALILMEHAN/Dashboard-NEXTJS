"use client";
import { url } from "@/app/lib/utils";
import styles from "@/app/ui/dashboard/products/add/addProduct.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddProductPage = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [desc, setDesc] = useState("");

  const addProduct = async (e) => {
    e.preventDefault();
    // console.log('Add product button clicked');

    const res = await fetch(`${url}api/v1/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        price,
        stock,
        color,
        size,
        desc,
      }),
    });

    router.push("/dashboard/products");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={addProduct} className={styles.form}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select
          name="category"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>
            Choose a Category
          </option>
          <option value="kitchen">Kitchen</option>
          <option value="phone">Phone</option>
          <option value="computer">Computer</option>
        </select>
        <input
          type="number"
          placeholder="Price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Stock"
          name="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Color"
          name="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Size"
          name="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        <textarea
          name="description"
          id="description"
          rows="16"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProductPage;
