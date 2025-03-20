import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:7197/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Username: username,
          Email: email,
          Password: password,
        }),
      });

      if (response.ok) {
        navigate("/login"); // Перенаправление на страницу входа
      } else {
        const data = await response.json();
        alert(data || "Ошибка регистрации");
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <div className="page register">
      <form className="register-form" onSubmit={handleRegister}>
        <h1>Регистрация</h1>
        <input
          className="form-input"
          type="text"
          placeholder="Никнейм"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="form-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form-input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="submit-button" type="submit">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default Register;
