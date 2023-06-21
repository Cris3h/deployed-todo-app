import { useState } from "react";
import { headerJSON } from "../helpers";
import { useCookies } from 'react-cookie'

const Auth = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  
  const data = { email, password };


  console.log('cookies --> ',cookies)

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      setError("make sure passwords match!");
      return;
    } //register or enter...
    const response = await fetch(
      `${process.env.REACT_APP_SERVERURL}/${endpoint}`,
      {
        method: "POST",
        headers: headerJSON,
        body: JSON.stringify({ email, password }),
      }
    );

    const responseData = await response.json();
    console.log('respondeData --> ',responseData)
    
    
    if(responseData.detail){
      setError(responseData.detail)
    }
    
    if(!responseData.detail){
      setCookie('Email', responseData.email);
      setCookie('AuthToken', responseData.token);
      window.location.reload();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          {isLogin ? "log in" : "sign up"}
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input
            type="submit"
            className="create"
            onClick={(e) => handleSubmit(e, isLogin ? "login" : "signup")}
            value='submit'
          />
          {error && <p style={{color: 'red'}}>something happend!: {error}</p>}
        </form>

        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{
              backgroundColor: !isLogin
                ? "rgb(255, 255, 255)"
                : "rgb(188,188,188)",
            }}
          >
            sign up
          </button>
          <button
            onClick={() => viewLogin(true)}
            style={{
              backgroundColor: isLogin
                ? "rgb(255, 255, 255)"
                : "rgb(188,188,188)",
            }}
          >
            log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
