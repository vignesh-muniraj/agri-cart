// import { useEffect, useState } from "react";
// import { API } from "./Global";
// import { useNavigate } from "react-router-dom";
// import CircleIcon from '@mui/icons-material/Circle';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// import {
//   Card,
//   CardContent,
//   CircularProgress,
//   Button,
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemAvatar,
//   Avatar,
//   Box,
//   IconButton,
// } from "@mui/material";

// function MyOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("id");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await fetch(`${API}/orders/${userId}`);
//         const data = await res.json();
//         setOrders(data);
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [userId]);

//   // ✅ user-friendly labels
//   const getStatusLabel = (status) => {
//     switch (status) {
//       case "completed":
//         return "Delivered";
//       case "cancelled":
//         return "Cancelled";
//       default:
//         return "Pending";
//     }
//   };

//   const getStatusClass = (status) => {
//     switch (status) {
//       case "completed":
//         return "status-completed";
//       case "cancelled":
//         return "status-cancelled";
//       default:
//         return "status-pending";
//     }
//   };

//   // ✅ Full-screen loader (green)
//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "80vh",
//         }}
//       >
//         <CircularProgress color="success" size={60} />
//       </Box>
//     );
//   }

//   return (
//     <div className="order-history-container">
//       <h2>My Orders</h2>

//       {orders.length === 0 ? (
//         <p>No past orders found.</p>
//       ) : (
//         orders.map((order) => (
//           <Card
//             key={order.id}
//             className={`order-card ${getStatusClass(order.status)}`}
//           >
//             <CardContent>
//               <h3>
//                 Order-id: {order.id}
//                 <span
//                   className={`status-label ${getStatusClass(order.status)}`}
//                 >
//                   {getStatusLabel(order.status)}
//                 </span>
//               </h3>

//               <List dense>
//                 {order.items.map((item) => (
//                   <ListItem key={item.id} className="order-item">
//                     <ListItemAvatar>
//                       <Avatar
//                         src={item.poster ? `${item.poster}` : "/no-image.png"}
//                         alt={item.product_name}
//                         variant="rounded"
//                         sx={{
//                           width: 60,
//                           height: 56,
//                           mr: 1,
//                           objectFit: "cover",
//                         }}
//                       />
//                     </ListItemAvatar>
//                     <ListItemText
//                       primary={`${item.product_name} (x${item.quantity})`}
//                       secondary={`₹${item.price}`}
//                     />
//                   </ListItem>
//                 ))}
//               </List>

//               <Divider className="divider" />

//               <p className="order-total">Total: ₹{order.total_price}</p>
//               <div>
//               <p className="order-date">
//                 <IconButton><CheckCircleOutlineIcon/></IconButton>
//                 <IconButton><MoreVertIcon/></IconButton>
//                 {new Date(order.created_at + "Z").toLocaleString("en-IN", {
//                   day: "2-digit",
//                   month: "short",
//                   year: "numeric",
//                   hour: "2-digit",
//                   minute: "2-digit",
//                   hour12: true,
//                   timeZone: "Asia/Kolkata",
//                 })}
//               </p>
//               {order.status === "completed" && order.delivery_date && (
//                 <p className="delivery-date">
//                   <IconButton><CheckCircleOutlineIcon/></IconButton>
//                   {new Date(order.delivery_date).toLocaleString("en-IN", {
//                     day: "2-digit",
//                     month: "short",
//                     year: "numeric",
//                     hour: "2-digit",
//                     minute: "2-digit",
//                     hour12: true,
//                     timeZone: "Asia/Kolkata",
//                   })}
//                 </p>
//               )}
//               </div>
//             </CardContent>
//           </Card>
//         ))
//       )}

//       <Button className="back-btn" onClick={() => navigate("/")}>
//         Back to Shop
//       </Button>
//     </div>
//   );
// }

// export { MyOrders };
import { useEffect, useState } from "react";
import { API } from "./Global";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
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

  const getStepIcon = (status, step) => {
    if (status === "completed" && step === "delivered") {
      return (
        <CheckCircleIcon style={{ color: "green", height: 20, width: 20 }} />
      );
    }
    if (status === "pending" && step === "delivered") {
      return (
        <CheckCircleIcon style={{ color: "orange", height: 20, width: 20 }} />
      );
    }
    return (
      <CheckCircleIcon style={{ color: "green", height: 20, width: 20 }} />
    ); // confirmed always green
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
            style={{ marginBottom: "20px" }}
          >
            <CardContent>
              <h3>
                Order-id: {order.id}
                <span
                  className={`status-label ${getStatusClass(order.status)}`}
                  style={{ marginLeft: "10px" }}
                >
                  {order.status}
                </span>
              </h3>

              {/* Order items */}
              <List dense>
                {order.items.map((item) => (
                  <ListItem key={item.id} className="order-item">
                    <ListItemAvatar>
                      <Avatar
                        src={item.poster ? `${item.poster}` : "/no-image.png"}
                        alt={item.product_name}
                        variant="rounded"
                        sx={{
                          width: 70,
                          height: 60,
                          mr: 1,
                          objectFit: "cover", // or "contain"
                          borderRadius: 1,
                          display: "block",
                          backgroundColor: "#f9f9f9",
                          boxShadow: 1,
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

              {/* Timeline */}
              <div className="order-timeline">
                {/* Step 1 - Order Confirmed */}
                <div className="order-step">
                  {getStepIcon(order.status, "confirmed")}
                  <span className="step-text">
                    Order Confirmed,{" "}
                    {new Date(order.created_at + "Z").toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                        timeZone: "Asia/Kolkata",
                      }
                    )}
                  </span>
                </div>

                {/* Vertical line */}
                <div className="vertical-line"></div>

                {/* Step 2 - Delivered */}
                <div className="order-step">
                  {getStepIcon(order.status, "delivered")}
                  <span className="step-text">
                    {order.status === "completed" && order.delivery_date
                      ? `Delivered, ${new Date(
                          order.delivery_date
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                        })}`
                      : "24 hrs from you Ordered !"}
                  </span>
                </div>
              </div>
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
