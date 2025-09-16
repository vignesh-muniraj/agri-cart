import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { ProfileMenu } from "./ProfileMenu";
import { SearchBar } from "./SearchBar";
// Styled badge for cart count

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 3,
    border: "2px solid white",
    padding: "0 4px",
    width: "2px",
    backgroundColor: "#ff0000 !important",
    color: "white !important",
  },
}));

function Navbar() {
  const navigate = useNavigate();

  const user_id = localStorage.getItem("id");
  const user_name = localStorage.getItem("username");
  const handleLogout = () => {
    localStorage.clear();
    // setUser({ id: null, username: null });
    navigate("/Login");
  };

  return (
    <nav>
      <div>
        <img
          src="https://ik.imagekit.io/vky/agri-cart/logo.png?updatedAt=1757947460881"
          alt="Logo"
        />
      </div>
      <ul>
        <SearchBar/>
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
          <Link to="/sellerPage">ManageStore</Link>
        </li>

        {/* ✅ Badge shows total items (all quantities) */}
        <IconButton onClick={() => navigate("/AddCart")} aria-label="cart">
          <StyledBadge badgeContent={12}>
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
        <div className="username">
          <p>{user_name ? user_name.toLocaleUpperCase() : " "}</p>
          <ProfileMenu />
        </div>
        {/*<div>
        {user_id ? (
          <IconButton onClick={handleLogout} aria-label="cart">
          <StyledBadge>
          <LogoutIcon />
          </StyledBadge>
          </IconButton>
        ) : (
          <IconButton onClick={() => navigate("/Login")}>
          <AccountCircleIcon />
          </IconButton>
        )}
        </div>*/}
      </ul>
    </nav>
  );
}

export { Navbar };

