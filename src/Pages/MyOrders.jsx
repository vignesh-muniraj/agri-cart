import { useEffect, useState } from "react";
import { API } from "./Global";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CircularProgress,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box,
} from "@mui/material";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API}/orders/${userId}`);
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  // ✅ user-friendly labels
  const getStatusLabel = (status) => {
    switch (status) {
      case "completed":
        return "Delivered";
      case "cancelled":
        return "Cancelled";
      default:
        return "Pending";
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "status-completed";
      case "cancelled":
        return "status-cancelled";
      default:
        return "status-pending";
    }
  };

  // ✅ Full-screen loader (green)
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress color="success" size={60} />
      </Box>
    );
  }

  return (
    <div className="order-history-container">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        orders.map((order) => (
          <Card
            key={order.id}
            className={`order-card ${getStatusClass(order.status)}`}
          >
            <CardContent>
              <h3>
                Order-id: {order.id}
                <span
                  className={`status-label ${getStatusClass(order.status)}`}
                >
                  {getStatusLabel(order.status)}
                </span>
              </h3>

              <List dense>
                {order.items.map((item) => (
                  <ListItem key={item.id} className="order-item">
                    <ListItemAvatar>
                      <Avatar
                        src={item.poster ? `${item.poster}` : "/no-image.png"}
                        alt={item.product_name}
                        variant="rounded"
                        sx={{
                          width: 60,
                          height: 56,
                          mr: 1,
                          objectFit: "cover",
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${item.product_name} (x${item.quantity})`}
                      secondary={`₹${item.price}`}
                    />
                  </ListItem>
                ))}
              </List>

              <Divider className="divider" />

              <p className="order-total">Total: ₹{order.total_price}</p>
              <p className="order-date">
                Date:{" "}
                {new Date(order.created_at + "Z").toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                  timeZone: "Asia/Kolkata",
                })}
              </p>
            </CardContent>
          </Card>
        ))
      )}

      <Button className="back-btn" onClick={() => navigate("/")}>
        Back to Shop
      </Button>
    </div>
  );
}

export { MyOrders };
