import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../Login/Login.module.scss';
import request from '../../utils/request';
import { checkIcon, xIcon } from '../../assets/icons';

const REGISTER_URL = '/auth/register';
const cx = classNames.bind(styles);

const USER_REGEX = /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
const PWD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

function Register() {
   const navigate = useNavigate()
   const userInputRef = useRef();
   const prevUser = useRef('')

   const [user, setUser] = useState('');
   const [validName, setValidName] = useState(false);
   const [userFocus, setUserFocus] = useState(false)

   const [password, setPassword] = useState('');
   const [validPwd, setValidPwd] = useState(false);
   const [passwordFocus, setPasswordFocus] = useState(false)

   const [matchPwg, setMatchPwg] = useState('');
   const [validMatchPwg, setValidMatchPwg] = useState(false);
   const [matchPwgFocus, setMatchPwgFocus] = useState(false)

   const [errMsg, setErrorMsg] = useState('');
   const [success, setSuccess] = useState(false);

   useEffect(() => {
      userInputRef.current.focus();
   }, []);

   const handleClear = () => {
      setUser('');
      setPassword('');
   };

   // validate username
   useEffect(() => {
      const result = USER_REGEX.test(user);

      setValidName(result);
   }, [user]);

   // validate password
   useEffect(() => {
      const result = USER_REGEX.test(password);
      setValidPwd(result);
      let match = password === matchPwg;

      if (!password) match = false
      setValidMatchPwg(match);

   }, [password, matchPwg]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      //  if submit with js tool
      const test1 = USER_REGEX.test(user)
      const test2 = USER_REGEX.test(password)

      if (!test1 || !test2) {
         setErrorMsg("missing payload")
         return
      }

      try {
         const response = await request.post(
            REGISTER_URL,
            JSON.stringify({ username: user, password: password }),
            {
               headers: { 'Content-Type': 'application/json' },
            }
         );

         handleClear();
         navigate("/login")
      } catch (error) {
         if (!error?.response) {
            setErrorMsg('No server response');
         } else if (error?.response.status === 409) {
            setErrorMsg('T??n t??i kho???n ???? t???n t???i');
            prevUser.current = user
         } else {
            setErrorMsg('????ng k?? th???t b???i');
         }
      }
   };

   // console.log(prevUser.current === user);
   return (
      <div className="wrap">
         <form className={cx('login-form')} onSubmit={handleSubmit}>
            { errMsg && <h2 className={cx("error-msg")}>{errMsg}</h2>}
            <h1>????ng k??</h1>
            <div className={cx('form-group')}>
               <label htmlFor="username" autoComplete="off">
                  T??n t??i kho???n
                  <span className={validName ? '' : 'hide'}>
                     {checkIcon}
                  </span>
                  <span className={validName || !user ? 'hide' : ''}>
                     {xIcon}
                  </span>
               </label>
               <input
                  id="username"
                  ref={userInputRef}
                  autoComplete="off"
                  type="text"
                  value={user}
                  aria-describedby="note"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  onChange={(e) =>
                     setUser(e.target.value.trim() && e.target.value)
                  }
               />
               <p id="note" className={cx(userFocus && user && !validName ? 'instruction' : 'hide')}>
                  4 - 24 k?? t??? <br />
                  Ph???i b???t ?????u b???ng ch??? c??i <br />
                  Cho ph??p ch??? Hoa, g???ch ch??n, s???
               </p>
            </div>
            <div className={cx('form-group')}>
               <label htmlFor="password">
                  M???t kh???u
                  <span className={validPwd ? '' : 'hide'}>
                     {checkIcon}
                  </span>
                  <span className={validPwd || !password ? 'hide' : ''}>
                     {xIcon}
                  </span>
               </label>
               <input
                  type="text"
                  id="password"
                  autoComplete="off"
                  value={password}
                  aria-describedby="note"
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                  onChange={(e) =>
                     setPassword(e.target.value.trim() && e.target.value)
                  }
               />
               <p id="note" className={cx(passwordFocus && password && !validPwd ? 'instruction' : 'hide')}>
                  6 - 24 k?? t??? <br />
                  Ph???i c?? ch???a ch??? hoa, ch??? th?????ng, s??? v?? k?? t??? ?????c bi???t
               </p>
            </div>
            <div className={cx('form-group')}>
               <label htmlFor="password-confirm">
                  Nh???p l???i m???t kh???u
                  <span className={ validMatchPwg && validPwd ? '' : 'hide'}>
                     {checkIcon}
                  </span>  
                  <span className={validMatchPwg && validPwd || !matchPwg ? 'hide' : ''}>
                     {xIcon}
                  </span>
               </label>
               <input
                  type="text"
                  id="password-confirm"
                  autoComplete="off"
                  value={matchPwg}
                  onChange={(e) =>
                     setMatchPwg(e.target.value.trim() && e.target.value)
                  }
               />
            </div>
            <span className={cx('messgae-container')}></span>
            {/* <div className={cx("login-with")}>
            <a href="/auth/facebook" className={cx("login-facebook", "login-option")}>
               Facebook
            </a>
            <a href="/auth/facebook" className={cx("login-google", "login-option")}>
               Google
            </a>
         </div> */}
            <button className={cx('login-form-btn', (!validName || !validPwd || !validMatchPwg || prevUser.current === user) ? "disable" : "")} type="submit">
               ????ng k??
            </button>
            <span className={cx('register-text')}>
               ???? c?? t??i kho???n?
               <Link className={cx('switch')} to="/login">
                  {' '}
                  ????ng nh???p
               </Link>
            </span>
         </form>
      </div>
   );
}
export default Register;
