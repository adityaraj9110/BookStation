import React, { useState, useEffect, useRef } from "react";
import Card from "../components/Card";
import Loader from "../components/Loader/Loader";
const URL = "http://openlibrary.org/search.json?title=*";
const Home = () => {
  const [mydata, setmyData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const loaderRef = useRef(null);

  const getCardData = async () => {
    try {
      const res = await fetch(
        `${URL}&limit=6&page=${page}`
      );
      const resData = await res.json();
      const data = resData.docs;
      console.log(data)
      data.slice(0, 20).map((singlebook)=>{
        console.log(singlebook)
      })
      setmyData((prev) => [...prev, ...data]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCardData();
  }, [page]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);


  return (
    <div className="home">
      {loading && <Loader />}
      {mydata.map((post, index) => (
        <Card post={post} key={index} />
      ))}
      <div ref={loaderRef} style={{ height: "10px" }} />
    </div>
  );
};

export default Home;
