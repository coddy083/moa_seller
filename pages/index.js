import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getToken } from '../module/getToken'
import styles from './index.module.css'
import Link from "next/link";
import Router, { useRouter } from "next/router";

const products = [
  {
    id: 1,
    name: '컴퓨터',
    price: 10000,
    image: "https://cdn.pixabay.com/photo/2015/01/21/14/14/apple-606761__480.jpg"
  },
  {
    id: 2,
    name: '노트북',
    price: 20000,
    image: "https://cdn.pixabay.com/photo/2015/02/02/11/09/office-620822__480.jpg"
  },
  {
    id: 3,
    name: '마우스',
    price: 30000,
    image: "https://cdn.pixabay.com/photo/2013/07/12/17/41/computer-mouse-152249__480.png"
  },
  {
    id: 4,
    name: '키보드',
    price: 40000,
    image: "https://cdn.pixabay.com/photo/2015/08/13/01/00/keyboard-886462__480.jpg"
  },
  {
    id: 5,
    name: '모니터',
    price: 50000,
    image: "https://cdn.pixabay.com/photo/2013/07/12/15/04/monitor-149362__480.png"
  },
  {
    id: 6,
    name: '신문',
    price: 60000,
    image: "https://cdn.pixabay.com/photo/2014/05/21/22/28/old-newspaper-350376__480.jpg"
  },
  {
    id: 7,
    name: '넷플릭스',
    price: 70000,
    image: "https://cdn.pixabay.com/photo/2020/09/14/17/45/tv-5571609__480.jpg",
  },
  {
    id: 8,
    name: '유튜브',
    price: 70000,
    image: "https://cdn.pixabay.com/photo/2018/03/22/10/54/youtube-icon-3249999__480.jpg",
  },
  {
    id: 9,
    name: '쇼피',
    price: 70000,
    image: "https://cdn.pixabay.com/photo/2015/09/16/08/53/shop-942398__480.jpg",
  },
  {
    id: 10,
    name: '알람',
    price: 70000,
    image: "https://cdn.pixabay.com/photo/2015/01/06/14/28/alarm-clock-590383__480.jpg",
  },
]


export default function MainPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = getToken()
    if (check) {
      setLoading(false)
    } else {
      Router.push('/login')
    }
  }, [])

  const Loading = () => {
    return (
      <div className={styles.loading}>
        <div className={styles.loading__text}>Loading...</div>
      </div>
    )
  }

  return (
    loading ? Loading() :
      (
        <div className={styles.container}>
          <div className={styles.leftBox}>
            <div className={styles.leftBoxTitle}>모아구독 판매자 센터</div>
            <button className={styles.leftMenuButton}>상품조회</button>
            <button className={styles.leftMenuButton}>상품등록</button>
            <button className={styles.leftMenuButton}>통계관리</button>
          </div>
          <div className={styles.rightBox}>
            {products.map((product) => (
              <div key={product.id} className={styles.rightBoxItem}>
                <Image src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className={styles.rightBoxImage}
                  loading="lazy"
                />
                <div className={styles.rightBoxInfo}>{product.name}</div>
              </div>
            ))}
          </div>
        </div>
      )
  )
}
