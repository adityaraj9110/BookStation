import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useUserAuth } from "../pages/UserAuthContextProvider";
const Navbar = () => {

  const { logOut } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          Book Station
        </Link>
      </span>
      <div className="search__bar">
        <SearchBar />
      </div>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
        <Button variant="contained" href="/home/addtocart">
          Cart
        </Button>
      </Stack>
    </div>
  );
};

export default Navbar;
