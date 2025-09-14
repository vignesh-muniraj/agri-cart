import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { ProfileMenu } from "./ProfileMenu";
// Styled badge for cart count
const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 5,
    border: "2px solid white",
    padding: "0 4px",
    backgroundColor: "#ff0000 !important",
    color: "white !important",
  },
}));

function Navbar({ totalItems }) {
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
          <Link to="/sellerPage">StartSelling</Link>
        </li>

        {/* ✅ Badge shows total items (all quantities) */}
        <IconButton onClick={() => navigate("/AddCart")} aria-label="cart">
          <StyledBadge badgeContent={0}>
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
