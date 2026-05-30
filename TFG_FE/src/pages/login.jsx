import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Path to where your hook lives

export default function LoginPage() {
  const { login, role } = useAuth();
  const nav = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

async function onSubmit(e) {
e.preventDefault();
setError("");
setLoading(true);
try {
await login(email, password);
nav("/Dashboard");
}
catch (err) {
setError(err.message);
} finally {
setLoading(false);
}
}
return (
<Container maxWidth="sm" sx={{ mt: 6 }}>
<Paper sx={{ p: 3 }}>
<Typography variant="h4" gutterBottom>Login</Typography>
<Typography variant="body2" sx={{ mb: 2 }}>
Sign in to access the Task Manager
</Typography>
{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
<Stack component="form" spacing={2} onSubmit={onSubmit}>
<TextField
label="Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
autoComplete="email"
fullWidth
/>
<TextField
label="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
type="password"
autoComplete="current-password"
fullWidth
/>
<Button type="submit" variant="contained" disabled={loading}>
{loading ? "Logging in..." : "Login"}
</Button>
</Stack>
</Paper>
</Container>
);
}