import Logo from '../../Images/live-chat2.png'
import FormControl from '@mui/material/FormControl';
import {
    Button, IconButton, InputAdornment, InputLabel,
    OutlinedInput, TextField, CircularProgress
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import '../../Styles/login.css'
import { AnimatePresence, motion } from 'framer-motion';

const LoginAndRegister = () => {

    const [log_or_reg, setLog_or_reg] = useState(false)

    const lightTheme = useSelector((state) => state.themeKey);
    const [showPassword, setShowPassword] = useState(false)

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
                            inputProps={{ style: { color: (lightTheme ? "black" : " grey") } }} />
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
                            />
                        </FormControl>
                        <Button variant="outlined" >Login</Button>
                        <h4 className='switch-auth-text'>
                            Don't have an account?
                            <b className='switch-auth' onClick={() => { setLog_or_reg(!log_or_reg) }}>
                                Sign Up
                            </b>

                        </h4>


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
                            inputProps={{ style: { color: (lightTheme ? "black" : " grey") } }} />
                        <TextField id="standard-basic" label="Email :" variant="outlined"
                            inputProps={{ style: { color: (lightTheme ? "black" : " grey") } }} />
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

                            />
                        </FormControl>
                        <Button variant="outlined" >Sign Up</Button>
                        <h4 className='switch-auth-text'>
                            Don't have an account?
                            <b className='switch-auth' onClick={() => { setLog_or_reg(!log_or_reg) }}>
                                Sign Up
                            </b>

                        </h4>

                    </div>
                }
                {/* signup */}
                {/* right side end */}

            </motion.div>
        </AnimatePresence>
    )

}
export default LoginAndRegister;