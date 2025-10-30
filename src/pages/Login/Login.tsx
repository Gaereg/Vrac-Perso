import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { supabase } from "@clientSupabase";
import styles from "./Login.module.css";

const Login = ({
  setIsLog,
}: {
  setIsLog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (res.data.session?.access_token) {
      setIsLog(true);
    }
  };

  return (
    <Box className={styles.wrapper} sx={{ boxShadow: 3 }}>
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          className={styles.input}
          required
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          margin="normal"
          slotProps={{
            htmlInput: {
              type: "email",
            },
          }}
        />
        <TextField
          className={styles.input}
          type="password"
          required
          id="password"
          name="password"
          label="Mot de passe"
          variant="outlined"
          margin="normal"
        />
        <Button type="submit" variant="contained" sx={{ mt: "10px" }}>
          Se Connecter
        </Button>
      </form>
    </Box>
  );
};

export default Login;
