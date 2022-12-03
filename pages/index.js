import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getToken } from '../module/getToken'
import { useFetchGET } from '../module/useFetchGet'
import styles from './index.module.css'
import Link from "next/link";
import Router, { useRouter } from "next/router";
import axios from 'axios'

const RightBox = () => {
  const [products, setProducts] = useState([]);

  const fetch = async () => {
    const url = 'http://54.180.145.47:8002/seller/product/1?page=1&filter=views';
    const {data} = await axios.get(url);
    setProducts(data.sellers_products);
    console.log(data.sellers_products);
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className={styles.rightBox}>
      {products.map((product) => (
        <div key={product.id} className={styles.rightBoxItem}>
          <Image src={product.image}
            alt={product.product_name}
            width={300}
            height={300}
            className={styles.rightBoxImage}
            loading="lazy"
          />
          <div className={styles.rightBoxInfo}>
            <div>{product.product_group_name}</div>
            <div>{product.product_name}</div>
            <div>{product.price.toLocaleString()}</div>
            <div>조회수 {product.views}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

const LeftBox = () => {
  return (
    <div className={styles.leftBox}>
      <div className={styles.leftBoxTitle}>모아구독 판매자 센터</div>
      <button className={styles.leftMenuButton}>상품조회</button>
      <button className={styles.leftMenuButton}>상품등록</button>
      <button className={styles.leftMenuButton}>통계관리</button>
    </div>
  )
}

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loading__text}>Loading...</div>
    </div>
  )
}

export default function MainPage() {
  const [loading, setLoading] = useState(true);
  const check = getToken();

  useEffect(() => {
    if (check) {
      setLoading(false)
    } else {
      Router.push('/login')
    }
  }, [])

  return (
    loading ? <Loading /> :
      (
        <div className={styles.container}>
          <LeftBox />
          <RightBox />
        </div>
      )
  )
}
