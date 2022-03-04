import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import axios from "../../api/axios";
import { LOGIN_URL } from "../../api/login-url";
import swal from "sweetalert";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";

const Login = () => {
  // Context
  const { setAuth } = useAuth();

  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setAuth({ email, password });
      localStorage.setItem("token", response.data.token);

      // Timeout for mimicking the time it takes for a response to be sent from a server.
      setTimeout(() => {
        setSuccess(true);
      }, 2000);
    } catch (err) {
      if (err.response.status === 401) {
        swal({
          title: "Invalid Credentials",
          text: "Please, enter a valid email and password.",
          icon: "warning",
          button: "Ok",
        });
        setLoading(false);
      }
    }
  };

  return (
    <>
      {!success ? (
        <Container>
          <h1 className="shadow-lg text-success mt-5 p-3 text-center rounded">
            Login
          </h1>
          <Row className="mt-5">
            <Col
              lg={5}
              md={6}
              sm={12}
              className="p-3 m-auto shadow-lg rounded-lg"
            >
              <form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="p-1">
                    Enter your email address:
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label className="pt-3 p-1">
                    Enter your password:
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </Form.Group>
                <Row className="pt-4 m-auto">
                  {!loading ? (
                    <Button variant="success btn-block" type="submit">
                      Login
                    </Button>
                  ) : (
                    <Button variant="success" disabled>
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      Loading...
                    </Button>
                  )}
                </Row>
              </form>
            </Col>
          </Row>
          <h6 className="fs-5 mt-5 p-5 text-center fw-bold text-success">
            Alkemy Challenge | By Gaspar
          </h6>
        </Container>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Login;
