import React from "react";
import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data), console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}`)
      .then((res) => {
        if (res.status === 204) {
          alert("Note Deleted.");
        } else {
          alert("Failed to Delete Note.");
        }
        getNotes();
      })
      .catch((err) => alert(err));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { title, content })
      .then((res) => {
        if (res.status === 201) {
          alert("Note Created.");
        } else {
          alert("Failed to Create Note");
        }
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <h2>Notes</h2>
      {notes.map((note) => (
        <Note key={note.id} note={note} onDelete={deleteNote} />
      ))}
      <div>
        <h2>Create a note</h2>
        <form onSubmit={createNote}>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <label htmlFor="content">Content:</label>
          <br />
          <textarea
            type="text"
            id="content"
            name="content"
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
          />
          <br />
          <button type="submit">Create Note</button>
        </form>
      </div>
    </div>
  );
}
