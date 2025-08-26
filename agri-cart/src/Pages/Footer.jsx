import { Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import IconButton from "@mui/material/IconButton";
import BusinessIcon from '@mui/icons-material/Business';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
function Footer() {
  return (
    <div className="footer-main">
      <div className="footer-contact">
        <h3>Contact Us</h3>
        <p>
          <IconButton
          >
            <EmailIcon />
            </IconButton>
            support@agricart.in
        </p>
        <p>
          {" "}
          <IconButton>
            <LocalPhoneIcon />
            </IconButton>{" "}
            +91-777876409
        </p>
        <p>
          <IconButton>
            <BusinessIcon />
            </IconButton>
            Porur, Gerugampakam near to max,
        </p>
        <p>
          <IconButton>
            <AddLocationAltIcon />
            </IconButton>
           Chennai
        </p>
      </div>
      <div>
        <h3>Company</h3>
        <ul>
          <li>
            <Link to="/contact">About</Link>
          </li>
          <li>
            <Link to="/contact">Products</Link>
          </li>
          <li>
            <Link to="/contact">Blog</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="footer-location">
        <h3>Location</h3>
        <p>Chennai</p>
        <p>Coimbatore</p>
        <p>Bangalore</p>
      </div>
    </div>
  );
}
export { Footer };
