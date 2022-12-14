import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { userSchema } from "../schema/userForm";
import { UserFormData } from "../types/form";
import { useAppDispatch, useAppSelector } from "../hooks/reactHooks";
import { UserLoginCredential } from "../types/user";
import { authenticate } from "../redux/reducers/users";

const SignUp = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(userSchema),
  });

  const login = async (loginData: UserLoginCredential) => {
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        loginData
      );
      const token = response.data;
      localStorage.setItem("token", token.access_token);
      dispatch(authenticate(token.access_token));
    } catch (e) {
      console.log(e);
    }
  };

  const registrate = async (regData: UserFormData) => {
    try {
      await axios
        .post("https://api.escuelajs.co/api/v1/users/", regData)
        .then((responce) => {
          const input: UserLoginCredential = {
            email: responce.data.email,
            password: responce.data.password,
          };
          login(input);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data: UserFormData) => {
    data["avatar"] = "https://api.lorem.space/image/face?w=640&h=480&r=4491";
    registrate(data);
  };

  const navigate = useNavigate();
  const user = useAppSelector((state) => state.usersReducer.currentUser);
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="lastName"
                {...register("name")}
                label="Name"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                {...register("email")}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                {...register("password")}
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/profile" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
