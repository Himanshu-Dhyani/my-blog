import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogCards from './components/BlogCards';
import BlogDetail from './components/BlogDetail';

function App() {

  // States
  const [activeList, setActiveList] = useState([])
  const [activePage, setActivePage] = useState(1)


  // onChange page number
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  }

  // fetch api
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${activePage}`)
      .then((res) => res.json())
      .then((json) => setActiveList(json))
  }, [activePage])

  return (
    <>
      <Router>

        <Routes>
          <Route
            exact path='/my-blog'
            element={
              <BlogCards exact path="/my-blog" activePage={activePage} activeList={activeList} handlePageChange={handlePageChange} />
            }
          />

          <Route
            exact path='/my-blog/blogDetail/:id'
            element={
              <BlogDetail />
            }
          />

        </Routes>
      </Router>
    </>
  );
}

export default App;
