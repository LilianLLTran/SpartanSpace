// import React, { useState, useEffect } from "react";
// import "./Login.css";
// import { Link } from "react-router-dom";
// import { auth } from "./firebase";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

//   // Array of background images for the carousel
//   const backgroundImages = [
//     '/images/1photo.jpg',
//     '/images/2photo.jpg',
//     '/images/3photo.jpg',
//     '/images/4photo.jpg'
//   ];

//   // Effect hook to change the background image every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentBackgroundIndex(prevIndex => (prevIndex + 1) % backgroundImages.length); // Cycle through background images
//     }, 15000); // Change image every 3 seconds

//     // Cleanup interval on component unmount
//     return () => clearInterval(interval);
//   }, []);

//   const signIn = (e) => {
//     e.preventDefault();
//     signInWithEmailAndPassword(auth, email, password)
//       .then((auth) => {
//         console.log("User signed in:", auth);
//       })
//       .catch((error) => alert(error.message));
//   };

//   const register = (e) => {
//     e.preventDefault();
//     createUserWithEmailAndPassword(auth, email, password)
//       .then((auth) => {
//         console.log("User registered:", auth);
//       })
//       .catch((error) => alert(error.message));
//   };

//   return (
//     <div className="login">
//       {/* Background image with dynamic changing */}
//       <div className="login__background">
//         <img
//           className="login__backgroundImage"
//           src={backgroundImages[currentBackgroundIndex]}
//           alt="background"
//         />
//       </div>

//       <Link to="/">
//         <img className="login__logo" src="/images/sjsu.png" alt="logo" />
//       </Link>

//       <div className="login__container">
//         <h1>Sign-In</h1>

//         <form>
//           <h5>E-mail</h5>
//           <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

//           <h5>Password</h5>
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

//           <button type="submit" onClick={signIn} className="login__signInButton">
//             Sign In
//           </button>
//         </form>

//         <p>
//           By signing-in you agree to Spartan-Space's Conditions of Use & Sale. Please see our Privacy Notice, our
//           Cookies Notice and our Interest-Based Ads Notice.
//         </p>

//         <button onClick={register} className="login__registerButton">
//           Create New Account
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Login;





// import React, { useState, useEffect } from "react";
// import "./Login.css";
// import { Link, useHistory } from "react-router-dom";
// import { auth } from "./firebase";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

// function Login() {
//     const history = useHistory();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

//     const backgroundImages = [
//         "/images/1photo.jpg",
//         "/images/2photo.jpg",
//         "/images/3photo.jpg",
//         "/images/4photo.jpg",
//     ];

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentBackgroundIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
//         }, 15000);

//         return () => clearInterval(interval);
//     }, []);

//     const isSjsuEmail = (email) => email.endsWith("@sjsu.edu");

//     const signIn = (e) => {
//         e.preventDefault();

//         if (!isSjsuEmail(email)) {
//             alert("You must use an @sjsu.edu email address to sign in.");
//             return;
//         }

//         signInWithEmailAndPassword(auth, email, password)
//             .then((authUser) => {
//                 if (authUser.user.emailVerified) {
//                     console.log("User signed in:", authUser);
//                     history.push("/");
//                 } else {
//                     alert("Please verify your email before signing in.");
//                 }
//             })
//             .catch((error) => alert(error.message));
//     };

//     const register = (e) => {
//         e.preventDefault();

//         if (!isSjsuEmail(email)) {
//             alert("You must use an @sjsu.edu email address to register.");
//             return;
//         }

//         createUserWithEmailAndPassword(auth, email, password)
//             .then((authUser) => {
//                 console.log("User registered:", authUser);

//                 // Send email verification
//                 sendEmailVerification(authUser.user)
//                     .then(() => {
//                         alert("Verification email sent! Please check your inbox.");
//                         history.push("/"); // Optionally redirect after account creation
//                     })
//                     .catch((error) => {
//                         console.error("Error sending verification email:", error);
//                         alert("Failed to send verification email. Please try again.");
//                     });
//             })
//             .catch((error) => alert(error.message));
//     };

//     return (
//         <div className="login">
//             <div className="login__background">
//                 <img
//                     className="login__backgroundImage"
//                     src={backgroundImages[currentBackgroundIndex]}
//                     alt="background"
//                 />
//             </div>

//             <Link to="/">
//                 <img className="login__logo" src="/images/sjsu.png" alt="logo" />
//             </Link>

//             <div className="login__container">
//                 <div className="login__signInText">
//                     <img className="login__signInLogo" src="/images/sjsu.png" alt="logo" />
//                     <h1>Sign-In</h1>
//                 </div>

//                 <form>
//                     <h5>E-mail</h5>
//                     <input
//                         type="text"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />

//                     <h5>Password</h5>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />

//                     <button
//                         type="submit"
//                         onClick={signIn}
//                         className="login__signInButton"
//                     >
//                         Sign In
//                     </button>
//                 </form>

//                 <p>
//                     By signing-in you agree to Spartan-Space's Conditions of Use & Sale. Please see our Privacy
//                     Notice, our Cookies Notice, and our Interest-Based Ads Notice.
//                 </p>

//                 <button onClick={register} className="login__registerButton">
//                     Create New Account
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default Login;


import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail
} from "firebase/auth";

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
    const [isForgotPassword, setIsForgotPassword] = useState(false); // Track if user is on Forgot Password screen

    const backgroundImages = [
        "/images/1photo.jpg",
        "/images/2photo.jpg",
        "/images/3photo.jpg",
        "/images/4photo.jpg",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBackgroundIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    const isSjsuEmail = (email) => email.endsWith("@sjsu.edu");

    const signIn = (e) => {
        e.preventDefault();

        if (!isSjsuEmail(email)) {
            alert("You must use an @sjsu.edu email address to sign in.");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((authUser) => {
                if (authUser.user.emailVerified) {
                    console.log("User signed in:", authUser);
                    history.push("/");
                } else {
                    alert("Please verify your email before signing in.");
                }
            })
            .catch((error) => alert(error.message));
    };

    const register = (e) => {
        e.preventDefault();

        if (!isSjsuEmail(email)) {
            alert("You must use an @sjsu.edu email address to register.");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((authUser) => {
                console.log("User registered:", authUser);

                // Send email verification
                sendEmailVerification(authUser.user)
                    .then(() => {
                        alert("Verification email sent! Please check your inbox.");
                        history.push("/"); // Optionally redirect after account creation
                    })
                    .catch((error) => {
                        console.error("Error sending verification email:", error);
                        alert("Failed to send verification email. Please try again.");
                    });
            })
            .catch((error) => alert(error.message));
    };

    // Forgot Password function
    const handleForgotPassword = (e) => {
        e.preventDefault();

        if (!isSjsuEmail(email)) {
            alert("You must use an @sjsu.edu email address to reset your password.");
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Password reset email sent! Please check your inbox.");
                setIsForgotPassword(false); // Hide the Forgot Password form after sending email
            })
            .catch((error) => {
                console.error("Error sending password reset email:", error);
                alert("Failed to send password reset email. Please try again.");
            });
    };

    return (
        <div className="login">
            <div className="login__background">
                <img
                    className="login__backgroundImage"
                    src={backgroundImages[currentBackgroundIndex]}
                    alt="background"
                />
            </div>

            <Link to="/">
                <img className="login__logo" src="/images/sjsu.png" alt="logo" />
            </Link>

            <div className="login__container">
                <div className="login__signInText">
                    <img className="login__signInLogo" src="/images/sjsu.png" alt="logo" />
                    <h1>Sign-In</h1>
                </div>

                {/* Show Forgot Password form if state is true */}
                {isForgotPassword ? (
                    <div className="login__forgotPassword">
                        <h3>Forgot Password</h3>
                        <p>Enter your email to receive a password reset link:</p>
                        <form>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                            <button
                                type="submit"
                                onClick={handleForgotPassword}
                                className="login__forgotPasswordButton"
                            >
                                Send Password Reset Email
                            </button>
                        </form>
                        <button onClick={() => setIsForgotPassword(false)} className="login__backButton">
                            Back to Sign-In
                        </button>
                    </div>
                ) : (
                    <form>
                        <h5>E-mail</h5>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <h5>Password</h5>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            type="submit"
                            onClick={signIn}
                            className="login__signInButton"
                        >
                            Sign In
                        </button>
                    </form>
                )}

                <p>
                    By signing-in you agree to Spartan-Space's Conditions of Use & Sale. Please see our Privacy
                    Notice, our Cookies Notice, and our Interest-Based Ads Notice.
                </p>

                {/* Only show register button when not on Forgot Password screen */}
                {!isForgotPassword && (
                    <button onClick={register} className="login__registerButton">
                        Create New Account
                    </button>
                )}

                {/* Forgot Password link */}
                {!isForgotPassword && (
                    <p>
                        <button
                            className="login__forgotPasswordLink"
                            onClick={() => setIsForgotPassword(true)}
                        >
                            Forgot your password?
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
}

export default Login;
