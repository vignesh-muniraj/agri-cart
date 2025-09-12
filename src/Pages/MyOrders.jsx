import { useEffect, useState } from "react";
import { API } from "./Global";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
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

  if (loading) return <CircularProgress sx={{ m: 4 }} />;

  return (
    <div className="order-history-container">
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography>No past orders found.</Typography>
      ) : (
        orders.map((order) => (
          <Card key={order.id} className="order-card">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order #{order.id} - {order.status.toUpperCase()}
              </Typography>

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

              <Typography variant="subtitle1" className="order-total">
                Total: ₹{order.total_price}
              </Typography>
              <Typography variant="body2" className="order-date">
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
              </Typography>
            </CardContent>
          </Card>
        ))
      )}

      <Button
        variant="contained"
        className="back-btn"
        onClick={() => navigate("/")}
      >
        Back to Shop
      </Button>
    </div>
  );
}
export { MyOrders };
