'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/ui/dashboard/products/products.module.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { url } from '@/app/lib/utils';

const ProductPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProd = async () => {
      const prodData = await fetch(`${url}api/v1/products`, {
        method: 'GET',
      });
      const prodJson = await prodData.json();
      setProducts(prodJson.body);
    };

    fetchProd();
  }, []);

  const deleteProduct = async (prodId) => {
    try {
      const res = await fetch(`${url}api/v1/products/${prodId}`, {
        method: 'DELETE',
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Error deleting the product:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Link href="/dashboard/products/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Created At</td>
            <td>Stock</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
              <tr key={product._id}>
                <td>
                  <div className={styles.product}>
                    <Image src={product.img} alt="Product img" height={40} width={40} />
                    {product.title}
                  </div>
                </td>
                <td>{product.desc}</td>
                <td>${product.price}</td>
                <td>{new Date(product.createdAt).toDateString()}</td>
                <td>{product.stock}</td>
                <td>
                  <Link href={`/dashboard/products/${product.title}`}>
                    <button className={`${styles.button} ${styles.view}`}>View</button>
                  </Link>
                  <button
                    className={`${styles.button} ${styles.delete}`}
                    onClick={() => deleteProduct(product._id)}
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

export default ProductPage;
