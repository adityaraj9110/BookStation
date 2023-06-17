import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import  { useCart } from "../../CartContext";

const Searchbookcard = ({ post }) => {
  const [desc, setDesc] = useState("");
  const keyforDesc = post.key.split("/")[2];
  const getBookImageUrl = (coverId) =>
    `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;

  const getDesc = async (key) => {
    try {
      const res = await fetch(`https://openlibrary.org/works/${key}.json`);
      if (!res.ok) {
        throw new Error("Failed to fetch book description");
      }
      const data = await res.json();
      // console.log(data.description.value);
      setDesc(data.description.value);
    } catch (error) {
      console.log(error.message);
    }
  };

  const [cartData, setCartData] = useState({
    title: post.title,
    description: desc,
    authorname: post.author_name,
    publish: post.publish_year,
    img: getBookImageUrl(post.cover_i)
  });
  const { addToCart } = useCart();
  useEffect(() => {
    const keyforDesc = post.key.split("/")[2];
    getDesc(keyforDesc);
  }, [keyforDesc]);
  
  const navigate = useNavigate();
  
  const handleClick = () => {
    setCartData({
      title: post.title,
      description: desc,
      authorname: post.author_name,
      publish: post.first_publish_year,
      img: getBookImageUrl(post.cover_i)
    });

    
    addToCart(cartData);
    const updatedCartItems = JSON.parse(localStorage.getItem("borrowItems")) || [];
    updatedCartItems.push(cartData);
    localStorage.setItem("borrowItems", JSON.stringify(updatedCartItems));

    navigate("/addtocart",{state:cartData});
  };


  useEffect(() => {
    // console.log(post.key.split([2]))\
    // console.log(post.key.split("/")[2]);
    const keyforDesc = post.key.split("/")[2];
    getDesc(keyforDesc);
  }, [keyforDesc]);

  return (
    <div className="card">
      
        <span className="title"><strong>Title: </strong>{post.title}</span>
        <img src={getBookImageUrl(post.cover_i)} alt="" className="img" />
        <p className="desc"><strong>Description: </strong>{desc ? desc : "Sorry No Description Available"}</p>
        <p className="authorname"><strong>Author Name: </strong> {post.author_name}</p>
        <p className="authorname"><strong>Publish Year: </strong> {post.first_publish_year}</p>
        <br />
        <Link className="link" to={`/post/${keyforDesc}`}> <button className="cardButton">Read More</button></Link>
        <button className="addtocartbtn" onClick={handleClick}>
          Click to borrow
        </button>
      
    </div>
  );
};

export default Searchbookcard;


{/* <Link className="link" to={`/post/${keyforDesc}`}>
        <span className="title"><strong>Title: </strong>{post.title}</span>
        <img src={getBookImageUrl(post.cover_i)} alt="" className="img" />
        <p className="desc"><strong>Description: </strong>{desc ? desc : "Sorry No Description Available"}</p>
        <p className="authorname"><strong>Author Name: </strong> {post.author_name}</p>
        <p className="authorname"><strong>Publish Year: </strong> {post.first_publish_year}</p>
        <br />
        <button className="cardButton">Read More</button>
      </Link> */}