"use client";
import styles from "@/app/ui/dashboard/products/singleProduct/singleProduct.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { url } from "@/app/lib/utils";

const SingleProduct = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    price: 0,
    stock: 0,
    color: "",
    size: "",
    category: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const prod = await fetch(`${url}api/v1/products/${id}`, {
        method: "GET",
      });
      const prodData = await prod.json();
      setProduct(prodData.body);
      setFormData({
        title: prodData.body.title,
        desc: prodData.body.desc,
        price: prodData.body.price,
        stock: prodData.body.stock,
        color: prodData.body.color,
        size: prodData.body.size,
        category: prodData.body.category,
      });
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const patchProduct = async (e) => {
    e.preventDefault();
    // console.log('patch product function called');

    const res = await fetch(`${url}api/v1/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      router.push("/dashboard/products");
    } else {
      console.error("Failed to update the product");
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={product.img || "/avatar.png"} alt="Product image" fill />
        </div>
        <h2>{product.title}</h2>
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={patchProduct}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Product Title"
          />
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="$999"
          />
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            placeholder="99"
          />
          <label>Color</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
            placeholder="Black"
          />
          <label>Size</label>
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleInputChange}
            placeholder="14"
          />
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="kitchen">Kitchen</option>
            <option value="computer">Computer</option>
          </select>
          <label>Description</label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
            placeholder="Product Description"
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleProduct;
