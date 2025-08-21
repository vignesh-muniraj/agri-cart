import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";

function Navbar() {
  return (
    <div>
      <nav>
        <div>
          <img src="src/assets/logo.png" alt="" />
        </div>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Products</li>
          <li>Blogs</li>
          <li>Contact</li>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </ul>
      </nav>
    </div>
  );
}

export { Navbar };
