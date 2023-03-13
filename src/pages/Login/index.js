import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Login.module.scss';
import useAuth from '../../hooks/useAuth';
import request from '../../utils/request';
import { checkIcon, xIcon } from '../../assets/icons';

const LOGIN_URL = '/auth';
const cx = classNames.bind(styles);

function LoginPage() {
   const [auth, setAuth] = useAuth();
   const userInputRef = useRef();

   const navigate = useNavigate();
   const location = useLocation();

   console.log('location = ', location);
   const from = location?.state?.from?.pathname || '/';

   // console.log(setAuth);

   const [user, setUser] = useState('');
   const [password, setPassword] = useState('');
   const [errMsg, setErrorMsg] = useState('');

   useEffect(() => {
      userInputRef.current.focus();
   }, []);

   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('submit');

      try {
         const response = await request.post(
            LOGIN_URL,
            JSON.stringify({ username: user, password: password }),
            {
               headers: { 'Content-Type': 'application/json' },
            }
         );
         console.log(response);
         // handleClear();

         const accessToken = response?.data?.accessToken;
         const role = response?.data?.role;
         if (response?.data) {
            setAuth({ user, password, accessToken, role });
            navigate(from, { replace: true });
         }
      } catch (error) {
         if (!error?.response) {
            setErrorMsg('No server response');
         } else if (error?.response.status === 400) {
            setErrorMsg('Thiếu tên hoặc mật khẩu');
         } else {
            setErrorMsg('Đăng nhâp thất bại');
         }
      }

   };
   return (
      <div className="wrap">
         <form className={cx('login-form')} onSubmit={handleSubmit}>
            {errMsg && <h2 className={cx('error-msg')}>{errMsg}</h2>}
            <h1>Đăng nhập</h1>
            <div className={cx('form-group')}>
               <label htmlFor="name" autoComplete="off">
                  Tài khoản
               </label>
               <input
                  ref={userInputRef}
                  autoComplete="off"
                  type="text"
                  value={user}
                  onChange={(e) =>
                     setUser(e.target.value.trim() && e.target.value)
                  }
               />
            </div>
            <div className={cx('form-group')}>
               <label htmlFor="image">Mật khẩu</label>
               <input
                  type="text"
                  autoComplete="off"
                  value={password}
                  onChange={(e) =>
                     setPassword(e.target.value.trim() && e.target.value)
                  }
               />
            </div>

            {/* <div className={cx("login-with")}>
            <a href="/auth/facebook" className={cx("login-facebook", "login-option")}>
               Facebook
            </a>
            <a href="/auth/facebook" className={cx("login-google", "login-option")}>
               Google
            </a>
         </div> */}

            <button className={cx('login-form-btn')} type="submit">
               Đăng nhập
            </button>
            <span className={cx('register-text')}>
               Chưa có tài khoản?
               <Link to="/register"> Đăng ký ngay</Link>
            </span>
         </form>
      </div>
   );
}
export default LoginPage;
