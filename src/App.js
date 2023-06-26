import React from "react";
import "./App.css";
import { auth, db } from "./firebase/init";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  async function updatePost() {
    const hardCodedId = "V5f77cLXO3LwdfnCO9D1";
    const postRef = doc(db, "posts", hardCodedId);
    const post = await getPostById(hardCodedId);
    console.log(post);
    const newPost = {
      ...post,
      title: "Land a 600k job",
    };
    console.log(newPost);
    updateDoc(postRef, newPost);
  }

  function deletePost() {
    const hardCodedId = "V5f77cLXO3LwdfnCO9D1";
    const postRef = doc(db, "posts", hardCodedId);
    deleteDoc(postRef);
  }

  function createPost() {
    const post = {
      title: "Finish interview section",
      description: "do FES",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post);
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map((elem) => ({ ...elem.data(), id: elem.id }));
    console.log(posts);
  }

  async function getPostById(id) {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    return postSnap.data();
  }

  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    );
    const { docs } = await getDocs(postCollectionRef);
    console.log(docs.map((doc) => doc.data()));
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUser(user);
      }
    });
  }, []);

  function register() {
    createUserWithEmailAndPassword(auth, "email@email.com", "test123")
      .then((user) => {})
      .catch((error) => {});
  }

  function login() {
    signInWithEmailAndPassword(auth, "email@email.com", "test123")
      .then(({ user }) => {
        setUser(user);
      })
      .catch((error) => {});
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
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPosts}>get all posts</button>
      <button onClick={getPostById}>get post by id</button>
      <button onClick={getPostByUid}>get post by uid</button>
      <button onClick={updatePost}>Update post</button>
      <button onClick={deletePost}>Delete post</button>
    </div>
  );
}

export default App;
