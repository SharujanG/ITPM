import React, {useState} from 'react'
import axios from 'axios';
import css from '../styles/Login.module.css';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    async function login(e) {
        e.preventDefault();

        const user = {
            email,
            password
        }

        await axios.post("http://localhost:5001/user/login",user)
        .then(() => {
            alert("User Logged Successfully");
            navigate('/add-appoinment');
        })
        .catch(err => {
            alert(err);
        })
    }

    return (
        <div className={css.wrapper}>
            {/* <span className={css.icon_close}><ion-icon name="close"></ion-icon></span> */}
            <div className={css.form_box}>
                <h2>Login</h2>
                <form onSubmit={login}>
                    <div className={css.input_box}>
                        <span className ={css.icon}><ion-icon name="mail"></ion-icon>
                        </span>
                        <input type="email" required onChange={(e) => {setEmail(e.target.value)}}/>
                        <label>Email</label>
                    </div>
                    <div className={css.input_box}>
                        <span className ={css.icon}><ion-icon name="lock-closed"></ion-icon></span>
                        <input type="Password" required onChange={(e) => {setPassword(e.target.value)}}/>
                        <label>Password</label>
                    </div>
                    <div>
                        <div className={css.remember_forgot}>
                            <label><input type="checkbox"/>Remember me</label>
                            <a href="#">Forgot Password?</a>
                        </div>
                        <button type="submit" className={css.btn}>Login</button>
                        <div className={css.login_register}>
                            <p>Don't have an account?<a href="#" className={css.register_link}> Register</a></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login