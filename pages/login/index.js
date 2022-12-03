import styles from './index.module.css'
import { useState, useEffect } from 'react';
import { useInput } from '../../module/useInput';
import { useFetchPost } from '../../module/useFetchPost';
import { tokenSave } from '../../module/tokenSave';
import { getToken } from '../../module/getToken';

export default function Home() {
  const email = useInput("");
  const password = useInput("");
  const [loading, setLoading] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);
  const [loginStatus, setLoginStatus] = useState("notLoading");

  const buttonBg = {
    loading: "gray",
    notLoading: "#2ecc71",
    fail: "red",
  };

  const login = async () => {
    const emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (!emailReg.test(email.value)) {
      alert("이메일 형식이 아닙니다.");
      return;
    }
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
      setLoading(false);
    } else {
      setLoginStatus("fail");
      setTimeout(() => {
        setLoginStatus("notLoading");
        setLoading(false);
      }, 1000);
    }
  }

  useEffect(() => {
    setLoginCheck(getToken());
    loginCheck ? window.location.href = "/products" : null;
  }, []);

  useEffect(() => {
    loginCheck ? window.location.href = "/" : null;
  }, [loginCheck]);

  return (
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
