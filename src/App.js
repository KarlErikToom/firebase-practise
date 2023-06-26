import React from "react";
import "./App.css";
import { auth } from "./firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUser(user);
      }
    });
  }, []);

  function register() {
    console.log("register");
    createUserWithEmailAndPassword(auth, "email@email.com", "test123")
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, "email@email.com", "test123")
      .then(({ user }) => {
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
    userBtn.classList.toggle("invalid");
    loginBtn.classList.toggle("invalid");
    registerBtn.classList.toggle("invalid");
  }
  const loginBtn = document.querySelector(".login");
  const registerBtn = document.querySelector(".register");

  const userBtn = document.querySelector(".user");
  function logout() {
    signOut(auth);
    setUser({});
    userBtn.classList.toggle("invalid");
    loginBtn.classList.toggle("invalid");
    registerBtn.classList.toggle("invalid");
  }

  function firstLetter() {
    if (user && user.email) {
      return user.email[0].toUpperCase();
    }
  }

  return (
    <div className="App">
      <nav>
        <button onClick={login} className="btn login">
          Login
        </button>
        <button onClick={register} className="btn register">
          Register
        </button>
        <button onClick={logout} className="btn user invalid">
          {firstLetter()}
        </button>
      </nav>
    </div>
  );
}

export default App;
