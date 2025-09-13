import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Menu, MenuItem, Divider } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem("id"); // check if logged in

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOrders = () => {
    handleClose();
    navigate("/myorders");
  };

  const handleLogout = () => {
    handleClose();
    localStorage.clear();
    navigate("/login");
  };

  const handleLogin = () => {
    handleClose();
    navigate("/login");
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <AccountCircleIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: { mt: 1.5, borderRadius: 2, minWidth: 180 },
        }}
      >
        {userId ? (
             <div>
            <MenuItem onClick={handleOrders}>My Orders</MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </div>
        ) : (
          <MenuItem onClick={handleLogin}>Login</MenuItem>
        )}
      </Menu>
    </div>
  );
}

export { ProfileMenu };
