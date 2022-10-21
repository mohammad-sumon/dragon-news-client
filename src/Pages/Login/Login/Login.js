import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const Login = () => {
  // login korte gele kono error khele seta UI te dekhanor jonno ekta error state declare korbo & seta jekhane jekhan console.error ache sekhane arekta setError set kore dibo.
  // setError declare (part-1)
  const [error, setError] = useState("");

  const { signIn, setLoading } = useContext(AuthContext);

  // login hoye gele user k amra jekhane nite chai setar jonno useNavigate use korte hoy.
  // use navigate (part-1)
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

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
      .catch((error) => {
        console.error(error);
        setError(error.message); // setError message (part-2)
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
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

      <Button variant="primary" type="submit">
        Login
      </Button>
      {/* setError display UI (part-4) */}
      <Form.Text className="text-danger">{error}</Form.Text>
    </Form>
  );
};

export default Login;
