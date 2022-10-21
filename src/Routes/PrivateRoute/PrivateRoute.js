import React, { useContext } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // (part-3.1) & (part-3.2 is inside the <Navigate state={{from: location}} replace>)
  const location = useLocation();

  // (part- 2.6)
  if (loading) {
    return <Spinner animation="border" variant="primary"></Spinner>;
  }

  // jodi user Na thake tahole navigate kore login page e niye jabe r jodi user thake tahole take children e niye jabe. (part-1.1)
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default PrivateRoute;

/*
Private route er 3 ta kaj thake
-------------------------------
1. Only allow authenticated user to visit the route
2. Set Loading
3. Redirect user to the route they wanted to go before login


PRIVATE ROUTE BASIC
====================
# ekhetre amra Routes.js file e <News> route ta ke private route er moddhe pathiye dibo. Sample (part-1.2)
{
    path: "/news/:id",
    element: (
        <PrivateRoute>
            <News></News>
        </PrivateRoute>
    ),
    loader: ({ params }) =>
        fetch(`http://localhost:5000/news/${params.id}`),
},

ekhon amra jodi UI theke kono news er Read More porte jai shekhetre amader 'login' page e niye jabe. ekhon jodi amra email, password diye login kori tahole amader (jei page dekhte chaisilam sekhane na niye) 'Home' page e niye asbe.
karon login page a amra agei declare kore rakhsilam je user jodi right information diye login kore tahole user k 'Home' page e niye jabe.

LOADING
==========
# (part- 2.1) in AuthProvider.js file
const [loading, setLoading] = useState(true);

# (part- 2.2) in AuthProvider.js file. 
jekhane jekhane login, logout, google sign in, create user ache sob jaygay setLoading(true); kore dite hobe.
setLoading(true);

# (part- 2.3) in AuthProvider.js file.
useEffect er moddhe setLoading(false) kore dite hobe.
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("inside auth state changed", currentUser);
      setUser(currentUser);
      setLoading(false); // Private Route (part- 2.2)
});

# (part- 2.4) in AuthProvider.js file.
authInfo te loading pass kore dite hobe.
const authInfo = { user, loading, providerLogin, logOut, createUser, signIn };

# (part- 2.5) in PrivateRoute.js file.
object ta k receive korte hobe.
const { user, loading } = useContext(AuthContext);

# (part- 2.6) in PrivateRoute.js file.
  if (loading) {
    return <Spinner animation="border" variant="primary"></Spinner>;
  }




REDIRECT
=========
# (part- 3.3) in Login.js file
const location = useLocation();
const from = location.state?.from?.pathname || "/";

# (part-3.4) in Login.js file
navigate(from, { replace: true });

Akhon amra jekhane jete chaisilam login korar pore thik sei page/link e amader pathiye dibe.
*/
