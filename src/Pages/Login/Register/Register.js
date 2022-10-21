import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const Register = () => {
  // declare setError (part-1)
  const [error, setError] = useState("");

  // check box terms
  const [accepted, setAccepted] = useState(false);

  // received from AuthProvider.js
  const { createUser, updateUserProfile, verifyEmail } =
    useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, photoURL, email, password);

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError(""); // setError (part-3)
        form.reset();
        handleUpdateUserProfile(name, photoURL);
        handleEmailVerification();
        toast.success("Please verify your email address.");
      })
      .catch((error) => {
        console.error(error);
        setError(error.message); // setError (part-2)
      });
  };

  const handleUpdateUserProfile = (name, photoURL) => {
    const profile = {
      displayName: name,
      photoURL: photoURL,
    };
    updateUserProfile(profile)
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const handleEmailVerification = () => {
    verifyEmail()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const handleAccepted = (event) => {
    setAccepted(event.target.checked);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Your Name</Form.Label>
        <Form.Control name="name" type="text" placeholder="Your Name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Photo URL</Form.Label>
        <Form.Control name="photoURL" type="text" placeholder="Photo URL" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          name="email"
          type="email"
          placeholder="Enter email"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          placeholder="Password"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          onClick={handleAccepted}
          label={
            <>
              Accept <Link to="/terms">Terms and Conditions</Link>
            </>
          }
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={!accepted}>
        Register
      </Button>
      {/* setError (part-4) */}
      <Form.Text className="text-danger">{error}</Form.Text>
    </Form>
  );
};

export default Register;

/*
Module: 62-3
============
Accept Terms and Conditions update name and photo

1. TermsAndCondition.js file create in src. Some code
return (
    <div>
      <h3>Here is out Terms and Conditions</h3>
      <p>
        Go back to: <Link to="/register">Register</Link>
      </p>
    </div>
  );

2. Set route in Routes.js file
{
    path: "/terms",
    element: <TermsAndConditions></TermsAndConditions>,
},

3. Register.js file
<Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check
      type="checkbox"
      label={
        <>
          Accept <Link to="/terms">Terms and Conditions</Link>
        </>
      }
    />
</Form.Group>


4. akhon amra chacchi user jodi check box e click kore tahole Register button active korbo, r jodi na kore tahole button disable thakbe. declare a state

const [accepted, setAccepted] = useState(false);

4.1 create a onclick function in the check box div
<Form.Check
    type="checkbox"
    onClick={handleAccepted}
    label={
      <>
        Accept <Link to="/terms">Terms and Conditions</Link>
      </>
    }
/>

4.2 make function
const handleAccepted = (event) => {
    setAccepted(event.target.checked);
};

4.3 Now we make disable 'Register' button. jokhon check box click kora hobe tokhoni btn active hobe, check box e check na korle disabled thakbe.
<Button variant="primary" type="submit" disabled={!accepted}>
        Register
</Button>

5. Update user name and photo
-------------------------------
make a function In AuthProvider.js file

const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
};

5.1 send from authInfo
const authInfo = {
    user,
    loading,
    providerLogin,
    logOut,
    createUser,
    signIn,
    updateUserProfile,
  };

5.2 receive in Register.js file
const { createUser, updateUserProfile } = useContext(AuthContext);

5.3 make a function in Register.js file
const handleUpdateUserProfile = (name, photoURL) => {
    const profile = {
      displayName: name,
      photoURL: photoURL,
    };
    updateUserProfile(profile)
      .then(() => {})
      .catch((error) => console.error(error));
  };

5.4 call that function from
createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError(""); // setError (part-3)
        form.reset();
        handleUpdateUserProfile(name, photoURL);
      })

*/

/*
Module: 62-4 & 62-5
=====================
Send email verification email
Enforce email verification and debug warning

1. make a function In AuthProvider.js file
const verifyEmail = () => {
    return sendEmailVerification(auth.currentUser);
  };

2. send from authInfo
const authInfo = {
    user,
    loading,
    providerLogin,
    logOut,
    createUser,
    signIn,
    updateUserProfile,
    verifyEmail,
  };

3. receive in Register.js file
const { createUser, updateUserProfile, verifyEmail } =
    useContext(AuthContext);

4. make a function in Register.js file
const handleEmailVerification = () => {
    verifyEmail()
      .then(() => {})
      .catch((error) => console.error(error));
  };

5. call that function from
createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError(""); // setError (part-3)
        form.reset();
        handleUpdateUserProfile(name, photoURL);
        handleEmailVerification();
      })

6. Install react hot toast in cmd: npm install react-hot-toast
6.1 set <Toaster> in App.js
return (
    <div>
      <RouterProvider router={routes}></RouterProvider>
      <Toaster></Toaster>
    </div>
  );

6.2 use toast.succedd in Register.js file
createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError(""); // setError (part-3)
        form.reset();
        handleUpdateUserProfile(name, photoURL);
        handleEmailVerification();
        toast.success("Please verify your email address.");
      })

6.3 amra chai je email address jodi verify na kore tahole amara login korte dibo na.
in Login.js file

signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
        setError(""); // setError clear (part-3)
        // navigate(from, { replace: true }); // use navigate (part-2) & private route (part-3.4)
        if (user.emailVerified) {
          navigate(from, { replace: true });
        } else {
          toast.error("Your email is not verified. Please verify email.");
        }
      })

6.4 in AuthProvider.js file
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("inside auth state changed", currentUser);
      if (currentUser === null || currentUser.emailVerified) {
        setUser(currentUser);
      }
      setLoading(false); // Private Route (part- 2.2)
    });

6.5 to stop spinner loading
In AuthProvider.js file send setLoading
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

6.6 receive setLoading in Login.js file
const { signIn, setLoading } = useContext(AuthContext);

6.7 set .finally() in Login.js file
.catch((error) => {
        console.error(error);
        setError(error.message); // setError message (part-2)
      })
      .finally(() => {
        setLoading(false);
      });
*/
