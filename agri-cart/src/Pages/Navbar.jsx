import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, Navigate, useNavigate } from "react-router";

function Navbar() {
  const navigate = useNavigate()
  return (
    <div>
      <nav>
        <div>
          <img src="src/assets/logo.png" alt="" />
        </div>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
            <li>
            <Link to="/Sample_Categore">Products</Link>
          </li>
          <li>
            <Link to="/blog">Blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <IconButton onClick={() => navigate("/AddCart")}>
            <ShoppingCartIcon />
          </IconButton>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </ul>
      </nav>
    </div>
  );
}

export { Navbar };
