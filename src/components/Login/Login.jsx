import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    setError("");

    try {
      const response = await fetch("https://localhost:7197/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username: nickname, password }),
      });
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Ошибка входа");
      }
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login page">
      <div className="login-form">
        <h1>Войти</h1>
        <input
          className="form-input"
          type="text"
          placeholder="Никнейм"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          className="form-input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="submit-button" type="submit" onClick={handleLogin}>
          Войти
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
