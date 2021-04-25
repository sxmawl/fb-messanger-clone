import React, { useState, useEffect } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import Message from "./Message";
import "./App.css";
import db from "./firebase";
import FlipMove from "react-flip-move";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

function App() {
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([
    { username: "Gilfoyle", message: "Check this out" },
    { username: "Nany", message: "Great Job" },
  ]);

  function setValue(event) {
    setInput(event.target.value);
  }

  useEffect(() => {
    db.collection("messages")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("enter your name"));
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    db.collection("messages").add({
      message: input,
      username: username,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="App">
      <div className="header">
        <img
          alt="logo-img"
          className="logo"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.freebiesupply.com%2Flogos%2Fthumbs%2F2x%2Ffacebook-messenger-logo.png&f=1&nofb=1"
        ></img>
        <h1>Hello</h1>
      </div>
      <form className="appForm">
        <FormControl className="inputForm">
          <Input value={input} onChange={setValue} />
          <InputLabel>Enter A Message</InputLabel>
          <Button
            disabled={!input}
            type="submit"
            variant="contained"
            color="primary"
            onClick={sendMessage}
          >
            Send message
          </Button>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ message, id }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
