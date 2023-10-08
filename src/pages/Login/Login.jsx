import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebase/firebase.config'
import {  FaGoogle } from 'react-icons/fa';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {
    //react tostify

    const handleApplyJob = () => {
        
        toast('You have Login sucessfully')
    }

    //
    const [loginError, setloginError] = useState('')
///google
    const [user, setUser] = useState(null);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const handleGoogleSignIn = () => {
    // console.log('google mama is coming')
    signInWithPopup(auth, provider)

    .then(result => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        setUser(loggedInUser);

        //navigate after login
        navigate(location?.state ? location.state : '/')
    })

    
    .catch(error =>{
        // console.log('error' , error.message)
        setloginError(error.message)
    })




    
}

//google signout
    const handleSignOut = () => {
        signOut(auth)
        .then(result => {
            console.log(result);
            setUser(null);
        })

        .catch(error =>{
            console.log(error)
        })
    }



///

 const {signIn} = useContext(AuthContext);

 const location = useLocation();
 const navigate = useNavigate();
 console.log("location the login page" , location)


    const handleLogin = e => {
        e.preventDefault();
// console.log(e.currentTarget)
        const form = new FormData(e.currentTarget);

        const email= form.get('email')
        const password= form.get('password')

        console.log(email, password);
        // reset error
        setloginError('');

        
        //validation korbo
        if (password.length < 6) {
            setloginError('please should 6 charaecter');
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setloginError('Your password should have one upper at least chareacters')
            return;

        }

        ////

        signIn(email, password)
        .then(result => {
            console.log(result.user);




//navigate after login
navigate(location?.state ? location.state : '/')




        })
        .catch(error =>{
            console.log(error)
        })

    }






    return (
        <div>
            <Navbar></Navbar>
            <div>
                <h2 className="text-3xl my-10 text-center">Please Login</h2>

                <form onSubmit={handleLogin} className=" md:w-3/4 lg:w-1/2 mx-auto" >


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered" required name="email" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered" required name="password"/>
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button onClick={handleApplyJob} className="btn btn-primary">Login</button>
                    </div>
                </form>

                <p className="text-center mt-4">Dont have an account <Link to="/register" className="text-blue-600 font-bold">Register</Link></p>
            </div>





            {/* google */}
            <div className="btn  btn-success form-control md:w-3/4 lg:w-1/2 mx-auto mt-4 ">
               

                {
                   user ?  <button className="" onClick={handleSignOut}><FaGoogle></FaGoogle>Google Sign Out</button>
                        : <button className="" onClick={handleGoogleSignIn}><FaGoogle></FaGoogle> Login with Google</button> 
                }


                {user && <div>
                    <h3>User: {user?.displayName}</h3>
                </div>

                }
            </div>



            {

               loginError && <p className="text-red-500">{loginError}</p>
            }


            <ToastContainer />
        </div>
    );
};

export default Login;