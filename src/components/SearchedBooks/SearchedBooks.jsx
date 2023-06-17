import { useLocation } from "react-router-dom";
import Searchbookcard from "./Searchbookcard";

const SearchedBooks = () => {
    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const transferData = JSON.parse(searchParams.get("data"));
  console.log(location)

  console.log("Transfered datan is",transferData); 
  
  return (
    <>
    <h1 className="search_title">Searched Result: {transferData.length}  </h1>
    <div className="home">
       
        {
            transferData?.map((post,index)=>(
                <Searchbookcard post={post} key={index} />
            ))
        }
    </div>
    </>
  );
};

export default SearchedBooks;
