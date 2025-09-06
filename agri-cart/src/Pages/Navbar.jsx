import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ totalItems }) {
  const navigate = useNavigate();

  return (
    <nav>
      <div>
        <img src="src/assets/logo.png" alt="Logo" />
      </div>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/ProductList">Products</Link>
        </li>
        <li>
          <Link to="/blog">Blogs</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>

        <IconButton onClick={() => navigate("/AddCart")}>
          <ShoppingCartIcon />
          {totalItems > 0 && <span>({totalItems})</span>}
        </IconButton>

        <IconButton onClick={()=> navigate("/Login")}>
          <AccountCircleIcon />

        </IconButton>
      </ul>
    </nav>
  );
}

export { Navbar };
