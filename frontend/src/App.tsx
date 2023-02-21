import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="py-3">
        <Container>

        <Outlet />

        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
