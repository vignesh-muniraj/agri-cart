import { useEffect, useState } from "react";
import { API } from "./Global";
import CircularProgress from "@mui/material/CircularProgress";

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

  return (
    <div className="orderstaken">
      <div className="orders-page">
        <h2>Orders</h2>

        {loading ? (
          <div className="loading">
            <CircularProgress color="success" />
           
          </div>
        ) : orders.length === 0 ? (
          <p className="no-orders">No orders yet.</p>
        ) : (
          orders.map((o) => (
            <div key={o.id} className="order-card">
              <p><strong>Order ID:</strong> {o.id}</p>
              <p><strong>User:</strong> {o.name} ({o.phone})</p>
              <p>
                <strong>Address:</strong> {o.address}, {o.locality}, {o.city} -{" "}
                {o.pincode}, {o.state}
              </p>
              {o.landmark && <p><strong>Landmark:</strong> {o.landmark}</p>}
              {o.altphone && <p><strong>Alt Phone:</strong> {o.altphone}</p>}

              <p>
                <strong>Status:</strong>{" "}
                <span className={`status-badge ${o.status}`}>{o.status}</span>
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
                {updatingId === o.id && (
                  <CircularProgress size={20} color="success" />
                )}
              </div>

              <div className="items-list">
                <strong>Items:</strong>
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
          ))
        )}
      </div>
    </div>
  );
}

export { OrdersTaken };
