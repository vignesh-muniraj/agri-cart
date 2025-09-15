import { useEffect, useState } from "react";
import { API } from "./Global";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton } from "@mui/material";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import BusinessIcon from "@mui/icons-material/Business";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  width: 1000,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#279040d2",
    ...theme.applyStyles("dark", {
      backgroundColor: "#308fe8",
    }),
  },
}));


function OrdersTaken() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null); // track which order is updating
  const user_id = localStorage.getItem("id");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API}/orders/seller/${user_id}`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Fetch orders error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    setUpdatingId(orderId);
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );

    try {
      const response = await fetch(`${API}/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        console.error("Failed to update status on server");
        fetchOrders();
      }
    } catch (error) {
      console.error("Update status error:", error);
      fetchOrders();
    } finally {
      setUpdatingId(null);
    }
  };

  // ✅ Order counts
  const totalOrders = orders.length;
  const completedOrders = orders.filter((o) => o.status === "completed").length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const cancelledOrders = orders.filter((o) => o.status === "cancelled").length;

  const completedPercent = totalOrders
    ? (completedOrders / totalOrders) * 100
    : 0;
  const pendingPercent = totalOrders ? (pendingOrders / totalOrders) * 100 : 0;
  const cancelledPercent = totalOrders
    ? (cancelledOrders / totalOrders) * 100
    : 0;
const navigate = useNavigate()
  return (
    <div className="orderstaken">
      <div className="orders-page">
        <div>
          <h2>Orders</h2>
          <div className="order-summary">
            <p>
              <strong>Total Orders</strong> {totalOrders}
            </p>
            <p>
              <strong>Completed:</strong> {completedOrders}
            </p>
            <BorderLinearProgress
              color="success"
              variant="determinate"
              value={completedPercent}
            />
           
            {/*<p>
              <strong>Cancelled:</strong> {cancelledOrders}
            </p>*/}
          </div>
        </div>
        <div>
          {loading ? (
            <div className="loading">
              <CircularProgress color="success" />
            </div>
          ) : orders.length === 0 ? (
            <p className="no-orders">No orders yet.</p>
          ) : (
            orders.map((o) => (
              <div key={o.id} className="order-taken-card">
                <div className="oid-status">
                  <p>
                    <strong>Order ID# </strong> {o.id}
                  </p>
                  <div className="status-row">
                    <select
                      className="status-select"
                      value={o.status}
                      disabled={updatingId === o.id} // disable when updating
                      onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                <p>
                  <strong>
                    <IconButton>
                      <PersonIcon />
                    </IconButton>
                  </strong>{" "}
                  {o.name}
                </p>
                <p>
                  <strong>
                    <IconButton>
                      <PhoneEnabledIcon />
                    </IconButton>
                  </strong>{" "}
                  {o.phone}
                </p>
                <p>
                  <strong>
                    <IconButton>
                      <BusinessIcon />
                    </IconButton>
                  </strong>
                  {o.address}.
                  
                </p>
                <p>
                  {o.locality}
                </p>
                <p>
                  {o.city}
                </p>
                <p>
                  {o.state}, {o.pincode}
                </p>
              
                {o.landmark && (
                  <p>
                    <strong>Landmark:</strong> {o.landmark}
                  </p>
                )}
                {o.altphone && (
                  <p>
                    <strong>Alt Phone:</strong> {o.altphone}
                  </p>
                )}

                {/*<p>
                  <strong>Status:</strong>{" "}
                  <span className={`status-badge ${o.status}`}>{o.status}</span>
                </p>*/}

                <div className="order-taken-drop">
                  <div className="items-list">
                  
                    {o.items.map((item) => (
                      <div key={item.id} className="item-row">
                        <img src={item.poster} alt={item.product_name} />
                        <span>
                          {item.product_name} x {item.quantity} (₹{item.price})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
          <IconButton onClick={() => navigate("/sellerpage")}><ArrowBackIosIcon/></IconButton>
        </div>
      </div>

    </div>
  );
}

export { OrdersTaken };
