import styles from './index.module.css'
import { useState, useEffect } from 'react';
import { useInput } from '../module/useInput';
import { useFetchPost } from '../module/useFetchPost';
import { tokenSave } from '../module/tokenSave';
import { getToken } from '../module/getToken';

export default function Home() {
  const email = useInput("");
  const password = useInput("");
  const [loading, setLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState("notLoading");
  const [loginCheck, setLoginCheck] = useState(null);

  const buttonBg = {
    loading: "gray",
    notLoading: "#2ecc71",
    fail: "red",
  };

  const login = async () => {
    setLoading(true);
    setLoginStatus("loading");
    const url = 'http://54.180.145.47:8000/user/login'
    const req = { email: email.value, password: password.value, is_seller: 1 };
    const data = await useFetchPost(url, req);
    const { access, refresh } = data;
    if (access && refresh) {
      tokenSave(access, refresh);
      setLoginStatus("notLoading");
      setLoginCheck(true);
    } else {
      setLoginStatus("fail");
      setTimeout(() => {
        setLoginStatus("notLoading");
      }, 1000);
    }
    setLoading(false);
  }

  useEffect(() => {
    setLoginCheck(getToken());

  }, []);

  return (
    loginCheck ? window.location.assign("/mainpage") :
      <div className={styles.container}>
        <div className={styles.loginBox}>
          <div className={styles.loginBoxTitle}>모아구독 판매자 센터</div>
          <input type='text' placeholder='이메일' {...email} />
          <input type="password" placeholder='비밀번호' {...password} />
          <button disabled={loading} style={{ background: buttonBg[loginStatus] }} onClick={login} className={styles.loginButton}>
            {loginStatus === "loading" && "로딩중..."}
            {loginStatus === "notLoading" && "로그인"}
            {loginStatus === "fail" && "로그인 실패"}
          </button>
        </div>
      </div>
  );
}
