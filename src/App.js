import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Register from "./components/Registration/Register";
import Login from "./components/Login/Login";
import Anime from "./components/Anime/Anime";
function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  // useEffect(() => {
  //   fetch("https://localhost:7197/api/check-auth", {
  //     method: "GET",
  //     credentials: "include", // Отправляем куки
  //   })
  //     .then((res) => {
  //       console.log("Response status:", res.status); // Логируем статус ответа
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log("Response data:", data); // Логируем данные ответа
  //       setUser(data.user);
  //     })
  //     .catch((error) => {
  //       console.error("Ошибка авторизации:", error);
  //       setUser(null);
  //       navigate("/login");
  //     });
  // }, []);

  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/anime/title/:title" element={<Anime />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
