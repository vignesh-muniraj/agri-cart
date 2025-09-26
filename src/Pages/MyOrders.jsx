
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
  if (status === "cancelled") {
    // cancelled always shows red
    return <CheckCircleIcon style={{ color: "red", height: 20, width: 20 }} />;
  }

  if (status === "completed" && step === "delivered") {
    return <CheckCircleIcon style={{ color: "green", height: 20, width: 20 }} />;
  }

  if (status === "pending" && step === "delivered") {
    return <CheckCircleIcon style={{ color: "orange", height: 20, width: 20 }} />;
  }

  // confirmed or other steps
  return <CheckCircleIcon style={{ color: "green", height: 20, width: 20 }} />;
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
// import { useEffect, useState } from "react";
// import { API } from "./Global";
// import { useNavigate } from "react-router-dom";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
// } from "@mui/material";

// // MUI X Date Pickers
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// function MyOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
//   const [changeDateDialogOpen, setChangeDateDialogOpen] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [cancelReason, setCancelReason] = useState("");
//   const [newDeliveryDate, setNewDeliveryDate] = useState(null);

//   const navigate = useNavigate();
//   const userId = localStorage.getItem("id");

//   useEffect(() => {
//     fetchOrders();
//   }, [userId]);

//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API}/orders/${userId}`);
//       const data = await res.json();
//       setOrders(data);
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//     } finally {
//       setLoading(false);
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

//   const getStepIcon = (status, step) => {
//     if (status === "cancelled") {
//       return <CheckCircleIcon style={{ color: "red", height: 20, width: 20 }} />;
//     }
//     if (status === "completed" && step === "delivered") {
//       return <CheckCircleIcon style={{ color: "green", height: 20, width: 20 }} />;
//     }
//     if (status === "pending" && step === "delivered") {
//       return <CheckCircleIcon style={{ color: "orange", height: 20, width: 20 }} />;
//     }
//     return <CheckCircleIcon style={{ color: "green", height: 20, width: 20 }} />;
//   };

//   // Cancel Order
//   const handleOpenCancelDialog = (order) => {
//     setSelectedOrder(order);
//     setCancelReason("");
//     setCancelDialogOpen(true);
//   };

//   const handleCancelOrder = async () => {
//     try {
//       await fetch(`${API}/orders/${selectedOrder.id}/cancel`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ reason: cancelReason }),
//       });
//       setCancelDialogOpen(false);
//       fetchOrders();
//     } catch (err) {
//       console.error("Cancel failed:", err);
//       alert("Failed to cancel order.");
//     }
//   };

//   // Change Delivery Date
//   const handleOpenChangeDateDialog = (order) => {
//     setSelectedOrder(order);
//     setNewDeliveryDate(order.delivery_date ? new Date(order.delivery_date) : null);
//     setChangeDateDialogOpen(true);
//   };

//   const handleChangeDeliveryDate = async () => {
//     try {
//       await fetch(`${API}/orders/${selectedOrder.id}/change-date`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ delivery_date: newDeliveryDate }),
//       });
//       setChangeDateDialogOpen(false);
//       fetchOrders();
//     } catch (err) {
//       console.error("Change date failed:", err);
//       alert("Failed to update delivery date.");
//     }
//   };

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
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <div className="order-history-container">
//         <h2>My Orders</h2>

//         {orders.length === 0 ? (
//           <p>No past orders found.</p>
//         ) : (
//           orders.map((order) => (
//             <Card
//               key={order.id}
//               className={`order-card ${getStatusClass(order.status)}`}
//               style={{ marginBottom: "20px" }}
//             >
//               <CardContent>
//                 <h3>
//                   Order-id: {order.id}
//                   <span
//                     className={`status-label ${getStatusClass(order.status)}`}
//                     style={{ marginLeft: "10px" }}
//                   >
//                     {order.status}
//                   </span>
//                 </h3>

//                 <List dense>
//                   {order.items.map((item) => (
//                     <ListItem key={item.id} className="order-item">
//                       <ListItemAvatar>
//                         <Avatar
//                           src={item.poster ? `${item.poster}` : "/no-image.png"}
//                           alt={item.product_name}
//                           variant="rounded"
//                           sx={{
//                             width: 70,
//                             height: 60,
//                             mr: 1,
//                             objectFit: "cover",
//                             borderRadius: 1,
//                             display: "block",
//                             backgroundColor: "#f9f9f9",
//                             boxShadow: 1,
//                           }}
//                         />
//                       </ListItemAvatar>
//                       <ListItemText
//                         primary={`${item.product_name} (x${item.quantity})`}
//                         secondary={`₹${item.price}`}
//                       />
//                     </ListItem>
//                   ))}
//                 </List>

//                 <Divider className="divider" />
//                 <p className="order-total">Total: ₹{order.total_price}</p>

//                 <div className="order-timeline">
//                   <div className="order-step">
//                     {getStepIcon(order.status, "confirmed")}
//                     <span className="step-text">
//                       Order Confirmed,{" "}
//                       {new Date(order.created_at + "Z").toLocaleDateString("en-IN", {
//                         day: "2-digit",
//                         month: "short",
//                         year: "numeric",
//                         hour: "2-digit",
//                         minute: "2-digit",
//                         hour12: true,
//                         timeZone: "Asia/Kolkata",
//                       })}
//                     </span>
//                   </div>
//                   <div className="vertical-line"></div>
//                   <div className="order-step">
//                     {getStepIcon(order.status, "delivered")}
//                     <span className="step-text">
//                       {order.status === "completed" && order.delivery_date
//                         ? `Delivered, ${new Date(order.delivery_date).toLocaleDateString(
//                             "en-IN",
//                             { day: "2-digit", month: "short" }
//                           )}`
//                         : "24 hrs from you Ordered !"}
//                     </span>
//                   </div>
//                 </div>

//                 {order.status !== "completed" && order.status !== "cancelled" && (
//                   <div className="order-actions" style={{ marginTop: "10px" }}>
//                     <Button
//                       variant="outlined"
//                       color="error"
//                       size="small"
//                       onClick={() => handleOpenCancelDialog(order)}
//                       style={{ marginRight: "10px" }}
//                     >
//                       Cancel Order
//                     </Button>

//                     <Button
//                       variant="outlined"
//                       color="primary"
//                       size="small"
//                       onClick={() => handleOpenChangeDateDialog(order)}
//                     >
//                       Change Delivery Date
//                     </Button>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           ))
//         )}

//         <Button className="back-btn" onClick={() => navigate("/")}>
//           Back to Shop
//         </Button>

//         {/* Cancel Dialog */}
//         <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)}>
//           <DialogTitle>Cancel Order</DialogTitle>
//           <DialogContent>
//             <TextField
//               label="Reason for cancellation"
//               fullWidth
//               multiline
//               rows={3}
//               value={cancelReason}
//               onChange={(e) => setCancelReason(e.target.value)}
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setCancelDialogOpen(false)}>Cancel</Button>
//             <Button variant="contained" color="error" onClick={handleCancelOrder}>
//               Confirm Cancel
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Change Delivery Date Dialog */}
//         <Dialog open={changeDateDialogOpen} onClose={() => setChangeDateDialogOpen(false)}>
//           <DialogTitle>Change Delivery Date</DialogTitle>
//           <DialogContent>
//             <DatePicker
//               label="New Delivery Date"
//               value={newDeliveryDate}
//               onChange={(date) => setNewDeliveryDate(date)}
//               renderInput={(params) => <TextField {...params} fullWidth />}
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setChangeDateDialogOpen(false)}>Cancel</Button>
//             <Button variant="contained" color="primary" onClick={handleChangeDeliveryDate}>
//               Update Date
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </div>
//     </LocalizationProvider>
//   );
// }

// export { MyOrders };

