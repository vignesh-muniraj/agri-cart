// import { useEffect, useState } from "react";
// import { API } from "./Global";
// import CircularProgress from "@mui/material/CircularProgress";
// import LinearProgress, {
//   linearProgressClasses,
// } from "@mui/material/LinearProgress";
// import { styled } from "@mui/material/styles";
// import PersonIcon from "@mui/icons-material/Person";
// import { IconButton } from "@mui/material";
// import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
// import BusinessIcon from "@mui/icons-material/Business";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import { useNavigate } from "react-router-dom";

// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//   height: 10,
//   borderRadius: 5,
//   width: 1000,
//   [`&.${linearProgressClasses.colorPrimary}`]: {
//     backgroundColor: theme.palette.grey[200],
//     ...theme.applyStyles("dark", {
//       backgroundColor: theme.palette.grey[800],
//     }),
//   },
//   [`& .${linearProgressClasses.bar}`]: {
//     borderRadius: 5,
//     backgroundColor: "#279040d2",
//     ...theme.applyStyles("dark", {
//       backgroundColor: "#308fe8",
//     }),
//   },
// }));

// function OrdersTaken() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [updatingId, setUpdatingId] = useState(null);
//   const user_id = localStorage.getItem("id");
//   const navigate = useNavigate();

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API}/orders/seller/${user_id}`);
//       const data = await response.json();
//       setOrders(data);
//     } catch (error) {
//       console.error("Fetch orders error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const updateOrderStatus = async (orderId, status) => {
//     setUpdatingId(orderId);

//     let delivery_date = null;
//     if (status === "completed") {
//       delivery_date = new Date().toISOString(); // ✅ current timestamp
//     }

//     setOrders((prev) =>
//       prev.map((o) => (o.id === orderId ? { ...o, status, delivery_date } : o))
//     );

//     try {
//       const response = await fetch(`${API}/orders/${orderId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status, delivery_date }),
//       });
//       if (!response.ok) {
//         console.error("Failed to update status on server");
//         fetchOrders();
//       }
//     } catch (error) {
//       console.error("Update status error:", error);
//       fetchOrders();
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   // ✅ Order counts
//   const totalOrders = orders.length;
//   const completedOrders = orders.filter((o) => o.status === "completed").length;
//   const pendingOrders = orders.filter((o) => o.status === "pending").length;

//   const completedPercent = totalOrders
//     ? (completedOrders / totalOrders) * 100
//     : 0;

//   return (
//     <div className="orderstaken">
//       <div className="orders-page">
//         <div>
//           <h2>Orders Received</h2>
//           <div className="order-summary">
//             <p>
//               <strong>Total Orders</strong> {totalOrders}
//             </p>
//             <p>
//               <strong>Completed:</strong> {completedOrders}
//             </p>
//             <BorderLinearProgress
//               color="success"
//               variant="determinate"
//               value={completedPercent}
//             />
//           </div>
//         </div>

//         <div>
//           {loading ? (
//             <div className="loading">
//               <CircularProgress color="success" />
//             </div>
//           ) : orders.length === 0 ? (
//             <p className="no-orders">No orders yet.</p>
//           ) : (
//             orders.map((o) => (
//               <div key={o.id} className="order-taken-card">
//                 <div className="oid-status">
//                   <p>
//                     <strong style={{color:"green"}}>Order ID </strong># {o.id}
//                        {/* ✅ Ordered Date */}
//                 <p className="ordered-date" style={{color:"green"}}>
//                   {new Date(o.created_at + "Z").toLocaleString("en-IN", {
//                     day: "2-digit",
//                     month: "short",
//                     year: "numeric",
//                     hour: "2-digit",
//                     minute: "2-digit",
//                     hour12: true,
//                     timeZone: "Asia/Kolkata",
//                   })}
//                 </p>
//                   </p>

//                   <div className="status-row">
//                     <select
//                       className="status-select"
//                       value={o.status}
//                       disabled={updatingId === o.id}
//                       onChange={(e) => updateOrderStatus(o.id, e.target.value)}
//                     >
//                       <option value="pending">Pending</option>
//                       <option value="completed">Completed</option>
//                       <option value="cancelled">Cancelled</option>
//                     </select>
//                     {/* ✅ Delivery Date */}
//                     {o.status === "completed" && o.delivery_date && (
//                       <p className="delivery-date" style={{color:"green"}}>
//                         {new Date(o.delivery_date).toLocaleString("en-IN", {
//                           day: "2-digit",
//                           month: "short",
//                           year: "numeric",
//                           hour: "2-digit",
//                           minute: "2-digit",
//                           hour12: true,
//                           timeZone: "Asia/Kolkata",
//                         })}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {o.status === "pending" && (
//                   <p className="delivery-pending"></p>
//                 )}

//                 {/* Customer Info */}
//                 <p>
//                   <IconButton>
//                     <PersonIcon />
//                   </IconButton>{" "}
//                   {o.name}
//                 </p>
//                 <p>
//                   <IconButton>
//                     <PhoneEnabledIcon />
//                   </IconButton>{" "}
//                   {o.phone}
//                 </p>
//                 <p>
//                   <IconButton>
//                     <BusinessIcon />
//                   </IconButton>{" "}
//                   {o.address}
//                 </p>
//                 <p>{o.locality}</p>
//                 <p>{o.city}</p>
//                 <p>
//                   {o.state}, {o.pincode}
//                 </p>

//                 {o.landmark && (
//                   <p>
//                     <strong>Landmark:</strong> {o.landmark}
//                   </p>
//                 )}
//                 {o.altphone && (
//                   <p>
//                     <strong>Alt Phone:</strong> {o.altphone}
//                   </p>
//                 )}

//                 {/* Order Items */}
//                 <div className="order-taken-drop">
//                   <div className="items-list">
//                     {o.items.map((item) => (
//                       <div key={item.id} className="item-row">
//                         <img src={item.poster} alt={item.product_name} />
//                         <span>
//                           {item.product_name} x {item.quantity} (₹{item.price})
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//           <IconButton onClick={() => navigate("/sellerpage")}>
//             <ArrowBackIosIcon />
//           </IconButton>
//         </div>
//       </div>
//     </div>
//   );
// }

// export { OrdersTaken };

import { useEffect, useState } from "react";
import { API } from "./Global";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import BusinessIcon from "@mui/icons-material/Business";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  width: "100%",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#279040d2",
  },
}));

function OrdersTaken() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const user_id = localStorage.getItem("id");
  const navigate = useNavigate();

  // Fetch seller orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/orders/seller/${user_id}`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Fetch orders error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    setUpdatingId(orderId);
    const delivery_date =
      status === "completed" ? new Date().toISOString() : null;

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status, delivery_date } : o))
    );

    try {
      const res = await fetch(`${API}/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, delivery_date }),
      });
      if (!res.ok) fetchOrders();
    } catch (err) {
      console.error("Update status error:", err);
      fetchOrders();
    } finally {
      setUpdatingId(null);
    }
  };

  const totalOrders = orders.length;
  const completedOrders = orders.filter((o) => o.status === "completed").length;
  const completedPercent = totalOrders
    ? (completedOrders / totalOrders) * 100
    : 0;

  return (
    <div className="orderstaken">
      <div className="orders-page">
        <h2>Orders Received</h2>

        <div className="order-summary">
          <p>
            <strong>Total Orders:</strong> {totalOrders}
          </p>
          <p>
            <strong>Completed:</strong> {completedOrders}
          </p>
          <BorderLinearProgress
            variant="determinate"
            value={completedPercent}
          />
        </div>

        {loading ? (
          <div className="loading">
            <CircularProgress color="success" />
          </div>
        ) : orders.length === 0 ? (
          <p className="no-orders">No orders yet.</p>
        ) : (
          orders.map((o) => {
            const totalAmount = o.items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            return (
              <div key={o.id} className="order-taken-card">
                <div className="oid-status">
                  <p>
                    <strong >Order ID</strong> #{" "}
                    {o.id}
                <p style={{ color: "green" }}>
                    {new Date(o.created_at + "Z").toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                      timeZone: "Asia/Kolkata",
                    })}
                  </p>
                  </p>

                  <div className="status-row">
                    <select
                      value={o.status}
                      disabled={updatingId === o.id}
                      onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  
                    {o.status === "completed" && o.delivery_date && (
                      <p style={{ color: "green" }}>
                        Delivered:{" "}
                        {new Date(o.delivery_date).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                          timeZone: "Asia/Kolkata",
                        })}
                      </p>
                    )}

                    {o.status === "cancelled" && o.cancel_reason && (
                      <p style={{ color: "red" }}>Reason: {o.cancel_reason}</p>
                    )}
                  </div>
                </div>

                {/* Customer Info */}
                <div className="Customer-Info">
                  <div className="amount">
                    <p>
                      <IconButton>
                        <PersonIcon />
                      </IconButton>
                      {o.name}
                    </p>
                    {/* Total Amount */}
                    <p style={{ fontWeight: "bold", color: "#333" }}>
                      Total Amount: ₹{totalAmount}
                    </p>
                  </div>
                  <p>
                    <IconButton>
                      <PhoneEnabledIcon />
                    </IconButton>
                    {o.phone}
                  </p>
                  <p>
                    <IconButton>
                      <BusinessIcon />
                    </IconButton>
                    {o.address}
                  </p>
                  <p>{o.locality}</p>
                  <p>{o.city}</p>
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
                </div>

                {/* Order Items */}
                <div className="order-taken-drop">
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
            );
          })
        )}

        <IconButton onClick={() => navigate("/sellerpage")}>
          <ArrowBackIosIcon />
        </IconButton>
      </div>
    </div>
  );
}

export { OrdersTaken };
