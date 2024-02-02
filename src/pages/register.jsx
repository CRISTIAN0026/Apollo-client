import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Stack, Alert } from "@mui/material";

const REGISTER_USER = gql`
  mutation Mutation($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      username
      email
      token
    }
  }
`;

function Register(props) {
  const context = useContext(AuthContext);
  let navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  async function registerUserCallback() {
    console.log("CallBack hit");
    await registerUser();
  }

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registerUser] = useMutation(REGISTER_USER,{
    update(proxy, { data: { registerUser: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
   variables: { registerInput: values },
  });

  return (
    <Container spacing={2} maxWidth="sm">
      <h3>Register</h3>
      <p>This is register page, register below to create an account!</p>
      <Stack spacing={2} paddingBottom={2}>
        <TextField label="Username" name="username" onChange={onChange} />
        <TextField label="Email" name="email" onChange={onChange} type="email"/>
        <TextField label="Password" name="password" onChange={onChange} type="password"/>
        <TextField label="Confirm password" name="confirmPassword" onChange={onChange} type="password" />
      </Stack>
      {errors?.map((error)=>{
        console.log(error)
        return(
            <Alert severity="error" key={error.message}>
                {error.message}
            </Alert>
        );
      })}
      <Button variant="contained" onClick={onSubmit}>Register</Button>
    </Container>
  );
}

export default Register;
