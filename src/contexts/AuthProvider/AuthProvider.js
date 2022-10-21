import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../../firebase/firebase.config";

// To create Context API
export const AuthContext = createContext();

// to create Google Auth (step-1)
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Private Route (part- 2.1)
  const [loading, setLoading] = useState(true);

  // Google Auth (step-2)
  const providerLogin = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // to create user with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // to sign in
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // update user profile
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  // verify email
  const verifyEmail = () => {
    return sendEmailVerification(auth.currentUser);
  };

  // log out
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // set observer (spy)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("inside auth state changed", currentUser);
      if (currentUser === null || currentUser.emailVerified) {
        setUser(currentUser);
      }
      setLoading(false); // Private Route (part- 2.2)
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    setLoading,
    providerLogin,
    logOut,
    createUser,
    signIn,
    updateUserProfile,
    verifyEmail,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

/*
Authentication
===============
first step holo: firebase e ekta project create kore sign in method gulo on kora

ekhane context baniye export kore amra onno jekono file theke import kore use korbo.
jehetu onno jekono file theke eta use korbo tai children likhe dite hobe.

R ei <AuthContext.Provider> amra use korbo 'index.js file er moddhe', jate kore project er jekono jayga theke use kora jay.


Basic AuthProvider.js file sample
===================================
At first create a folder in src 'contexts' -> another folder 'AuthProvider' -> 'AuthProvider.js' file

import React, { createContext } from 'react';

// To create Context API
export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const user = {displayName: 'Batash Ali'};

    const authInfo = {user};

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;


Basic index.js file sample
============================
<React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
</React.StrictMode>


Ekhon amra chai ei 'user' er name and photo (jodi thake) Header.js file theke acess korbo.

Basic Header.js file sample
============================
const Header = () => {
  const {user} = useContext(AuthContext);
  return (
    <div>
        <Nav.Link href="#deets">
            {user?.displayName}
        </Nav.Link>
        <Nav.Link eventKey={2} href="#memes">
              {user?.photoURL ? (
                <Image
                  style={{ height: "30px" }}
                  roundedCircle
                  src={user.photoURL}
                ></Image>
              ) : (
                <FaUser></FaUser>
              )}
        </Nav.Link>
    </div>
  )

Now UI shows user name "Batash Ali"
*/

/*
Google Auth Sign in
===================
Amra google auth create kortesi context er moddhe r eta use korbo onno jekono file er moddhe taka button er majhe onClick method er sahajje 'Google SignIn' button ti UI te onno jekono jaygay thakte pare.

Basic AuthProvider.js file sample
===================================
import React, { createContext } from 'react';
import {getAuth, signInWithPopup} from 'firebase/auth';
import app from '../../firebase/firebase.config';

// To create Context API
export const AuthContext = createContext();

// to create Google Auth (step-1)
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const user = {displayName: 'Batash Ali'};

    // Google Auth (step-2)
    const providerLogin = (provider) => {
        return signInWithPopup(auth, provider);
    }

    const authInfo = {user, providerLogin};

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;


Basic RightSideNav.js file sample
===================================
import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FaGoogle, FaGithub, FaFacebook, FaTwitter, FaWhatsapp, FaTwitch } from "react-icons/fa";
import ListGroup from 'react-bootstrap/ListGroup';
import BrandCarousel from '../BrandCarousel/BrandCarousel';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';

const RightSideNav = () => {
    const {providerLogin} = useContext(AuthContext);

    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        providerLogin(googleProvider)
        .then((result) => {
            const user = result.user;
            console.log(user);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    return (
        <div>
            <Button onClick={handleGoogleSignIn} className='mb-2' variant="outline-primary"> <FaGoogle></FaGoogle> Login with Google</Button>
        </div>
    )



Basic AuthProvider.js file sample
===================================
amra ekhon user name 'Batash Ali' hard coded na likhe ekta 'useState' set kore dibo jate kore kon user google sign in method diye login korlo tar user name UI dekhte pabo,  and

tar pore ekta observer (spy) (onAuthStateChanged) lagiye dibo jate user er jekono interation (singin/signout) se nojor rakhte pare.
Remember: 'onAuthStateChanged' use korte hobe 'useEffect' er moddhe.

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
*/
