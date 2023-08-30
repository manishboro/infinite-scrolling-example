import { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";

import ProductCard from "../ProductCard";
import Spinner from "../Spinner";
import MessageBox from "../MessageBox";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

const limit = 9;

const Products = () => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isInitialFetch, setIsInitialFetch] = useState(false);

  const pageRef = useRef(1);
  const [hasMore, setHasMore] = useState(false);

  const fetchPosts = async ({ page, isFetchingFirstTime }) => {
    try {
      setIsError(false);
      isFetchingFirstTime && setIsInitialFetch(true);

      const resPro = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${
          (page - 1) * limit
        }`
      );

      const data = await resPro.json();

      if (data.products) {
        setData((prev) => {
          const newData = [...prev, ...data.products];

          if (newData.length < data.total) {
            setHasMore(true);
          } else setHasMore(false);

          return newData;
        });
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setHasMore(false);
      setIsError(true);
    } finally {
      setIsInitialFetch(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchPosts({ page: pageRef.current, isFetchingFirstTime: true });
  }, []);

  // Infinite scrolling
  const [targetRef, isIntersecting] = useIntersectionObserver({ threshold: 1 });

  useEffect(() => {
    if (hasMore && isIntersecting) {
      pageRef.current = pageRef.current + 1;
      fetchPosts({ page: pageRef.current });
    }
  }, [isIntersecting, hasMore]);

  return (
    <div className={styles.root}>
      {isError ? (
        <MessageBox message="Failed to fetch products. Please try again later." />
      ) : isInitialFetch ? (
        <Spinner text="Loading Products..." />
      ) : (
        <div className={styles.cards_container}>
          {data.map((el) => (
            <ProductCard
              key={el.id}
              image={el.images[0]}
              title={el.title}
              price={el.price}
            />
          ))}
        </div>
      )}

      {hasMore && (
        <div ref={targetRef}>
          <Spinner text="Loading more products..." />
        </div>
      )}
    </div>
  );
};

export default Products;
