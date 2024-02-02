import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Stack, Alert } from "@mui/material";


const LOGIN_USER = gql`
mutation Mutation($loginInput: LoginInput){
  loginUser(loginInput: $loginInput) {
    username
    email
    token
  }
}
`

export const PERSON_LOGIN = gql`
subscription {
  personLogin {
    email
    username
  }
}
`

function Login(props) {
    let navigate = useNavigate();
    const context = useContext(AuthContext);
    const [ errors, setErrors ] = useState([])

    function loginUserCallback() {
        loginUser();
    }

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        email: '',
        password: ''
    });

    const [loginUser] = useMutation(LOGIN_USER, {
        update(proxy, { data: { loginUser: userData}}) {
            context.login(userData);
            navigate('/');
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors)
        },
        variables: { loginInput: values }
    })

    return (
        <Container spacing={2} maxWidth="sm">
        <h3>Login</h3>
        <p>This is login page, login below!</p>
        <Stack spacing={2} paddingBottom={2}>
          <TextField label="Email" name="email" onChange={onChange} type="email"/>
          <TextField label="Password" name="password" onChange={onChange} type="password"/>
        </Stack>
        {errors?.map((error)=>{
          console.log(error)
          return(
              <Alert severity="error" key={error.message}>
                  {error.message}
              </Alert>
          );
        })}
        <Button variant="contained" onClick={onSubmit}>Login</Button>
      </Container>
    )
}

export default Login;