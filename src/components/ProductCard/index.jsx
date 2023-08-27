import React from "react";
import styles from "./style.module.css";

const ProductCard = ({ image, title, price }) => {
  return (
    <div className={styles.root}>
      <div className={styles.image_container}>
        <img className={styles.product_image} src={image} alt={title} />
      </div>

      <div className={styles.description_container}>
        <div className={styles.title}>{title}</div>
        <div className={styles.price}>${price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
