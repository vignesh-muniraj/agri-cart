
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import { ProfileMenu } from "./ProfileMenu";
import { SearchBar } from "./SearchBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";


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
  const user_name = localStorage.getItem("username");

  const isMobile = useMediaQuery("(max-width:768px)");
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const menuItems = [
    { text: "Home", path: "/home" },
    { text: "About", path: "/about" },
    { text: "Products", path: "/ProductList" },
    { text: "ManageStore", path: "/sellerPage" },
  ];

  return (
    <nav>
      <div className="logo">
        <img
          src="https://ik.imagekit.io/vky/agri-cart/logo.png?updatedAt=1757947460881"
          alt="Logo"
        />
      </div>

      {!isMobile && (
        <ul>
          <SearchBar />
          {menuItems.map((item) => (
            <li key={item.text}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "active-link" : ""
                }
              >
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>
      )}

      {/* ✅ Actions */}
      <div className="actions">
        {/* Cart first */}
        <IconButton onClick={() => navigate("/AddCart")} aria-label="cart" >
          <StyledBadge badgeContent={0}>
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>

        {isMobile && (
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        )}

        {!isMobile && (
          <div className="username">
            <p>{user_name ? user_name.toUpperCase() : " "}</p>
            <ProfileMenu />
          </div>
        )}
      </div>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List sx={{ width: 220 }}>
          {/* Profile inside Drawer (mobile) */}
          <ListItem>
            <ProfileMenu />
          </ListItem>

          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  setOpen(false);
                }}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}

          <Divider sx={{ my: 1 }} />
        </List>
      </Drawer>
    </nav>
  );
}

export { Navbar };




