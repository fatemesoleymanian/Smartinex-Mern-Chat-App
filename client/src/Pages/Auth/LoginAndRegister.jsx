import Logo from '../../Images/live-chat2.png'
import FormControl from '@mui/material/FormControl';
import {
    Button, IconButton, InputAdornment, InputLabel,
    OutlinedInput, TextField, CircularProgress
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../Styles/login.css'
import { AnimatePresence, motion } from 'framer-motion';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Toaster from '../../Components/Toaster';

const LoginAndRegister = () => {
    const Navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
            Navigate("/inbox/welcome")
        }
    })

    const [log_or_reg, setLog_or_reg] = useState(false)

    const lightTheme = useSelector((state) => state.themeKey);
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [loginStatus, setLoginStatus] = useState({ message: "", key: Math.random() })
    const [signupStatus, setSignupStatus] = useState({ message: "", key: Math.random() })

    const loginHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                }
            };
            const response = await axios.post("http://localhost:4000/api/user/auth/login",
                data,
                config
            )
            setLoginStatus({ message: "Success", key: Math.random() })
            setLoading(false)
            localStorage.setItem('user', JSON.stringify(response.data));
            Navigate('/inbox/welcome')

        } catch (error) {
            setLoginStatus({
                message: "Invalid username or password",
                key: Math.random()
            })

        }
        setLoading(false)

    }

    const signupHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                },
            };

            const response = await axios.post(
                "http://localhost:4000/api/user/auth/signup",
                data,
                config
            );
            console.log(response);
            setSignupStatus({ message: "Success", key: Math.random() });
            setLoading(false)
            localStorage.setItem('user', JSON.stringify(response.data));
            Navigate('/inbox/welcome')
        } catch (error) {
            if (error.response.status === 400) {
                console.log("error")

                setSignupStatus({
                    message: "Email or username already taken.choose another please.",
                    key: Math.random()
                })
            }
        }
        setLoading(false)

    }

    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (e) => {
        e.preventDefault();

    }

    return (

        <AnimatePresence>
            <motion.div initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 1, scale: 1 }}
                transition={{
                    ease: "anticipate",
                    duration: "0.4"
                }}
                className={"login-wrapper dark:bg-stone:950 dark:text-gray-100" + (lightTheme ? "" : " dark")}>
                {/* left side start */}
                <div className="image-container">
                    <img src={Logo} alt="logo" className="welcome-logo" />
                </div>
                {/* left side end */}
                {/* right side start */}
                {/* 
login */}
                {
                    log_or_reg && <div className='login-box dark:bg-stone-800 dark:text-gray-100'>
                        <h2 className='login-text dark:text-teal-600 font-lg'>
                            Login to your account
                        </h2>
                        <TextField id="standard-basic" label="Username :" variant="outlined"
                            inputProps={{ style: { color: (lightTheme ? "black" : " grey") } }}
                            onChange={(e) => setData({ ...data, name: e.target.value })} />
                        <FormControl sx={{ m: 1, width: '26ch', color: 'grey' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password :</InputLabel>
                            <OutlinedInput

                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                            />
                        </FormControl>
                        <Button variant="outlined"
                            onClick={loginHandler} >Login</Button>
                        <h4 className='switch-auth-text'>
                            Don't have an account?
                            <b className='switch-auth' onClick={() => { setLog_or_reg(!log_or_reg) }}>
                                Sign Up
                            </b>

                        </h4>
                        {
                            loginStatus.message ? (
                                <Toaster key={loginStatus.key} message={loginStatus.message} />
                            ) : null
                        }

                    </div>
                }
                {/* login */}
                {/* signup */}
                {
                    !log_or_reg && <div className='login-box dark:bg-stone-800 dark:text-gray-100'>
                        <h2 className='login-text dark:text-teal-600 font-lg'>
                            Create your account
                        </h2>
                        <TextField id="standard-basic" label="Username :" variant="outlined"
                            inputProps={{ style: { color: (lightTheme ? "black" : " grey") } }}
                            onChange={(e) => setData({ ...data, name: e.target.value })} />
                        <TextField id="standard-basic" label="Email :" variant="outlined"
                            inputProps={{ style: { color: (lightTheme ? "black" : " grey") } }}
                            onChange={(e) => setData({ ...data, email: e.target.value })} />
                        <FormControl sx={{ m: 1, width: '26ch', color: 'grey' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password :</InputLabel>
                            <OutlinedInput

                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                onChange={(e) => setData({ ...data, password: e.target.value })}

                            />
                        </FormControl>
                        <Button variant="outlined" onClick={signupHandler}>Sign Up</Button>
                        <h4 className='switch-auth-text'>
                            Already have an account?
                            <b className='switch-auth' onClick={() => { setLog_or_reg(!log_or_reg) }}>
                                Sign In
                            </b>
                        </h4>
                        {
                            signupStatus.message ? (
                                <Toaster key={signupStatus.key} message={signupStatus.message} />
                            ) : null
                        }

                    </div>
                }
                {/* signup */}
                {/* right side end */}

            </motion.div>
        </AnimatePresence>
    )

}
export default LoginAndRegister;