import { useLocation } from "react-router";
import { useEffect, useState } from "react";

const URL = "https://openlibrary.org/works/";

const Post = () => {
  const [postData,setPostData] = useState()
  const location = useLocation();
  // console.log(location)
  const pathname = location.pathname;
  const bookKey = pathname.split("/")[2];
  console.log(bookKey)

  console.log(bookKey); 
  const getDesc = async (key) => {
    try {
      const res = await fetch(`${URL}${key}.json`);
      if (!res.ok) {
        throw new Error("Failed to fetch book description");
      }
      const data = await res.json();

      console.log(data);
      setPostData(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
  
    getDesc(bookKey);
  }, [bookKey]);


  return (
    <div className="post">
      <h1 className="postTitle">{postData?.title}</h1>
      <h1 className="postTitle">Data which is coming from this api is not sufficient to display detailed review of book</h1>
      <p className="postDesc">{postData?.description?.value}</p>
    </div>
  );
};

export default Post;
