import { useEffect, useState } from "react";
import { API } from "./Global";

function OrdersTaken() {
  const [orders, setOrders] = useState([]);
  const user_id = localStorage.getItem("id");

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API}/orders/seller/${user_id}`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Fetch orders error:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await fetch(`${API}/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error("Update status error:", error);
    }
  };

  return (
    <div className="orders-page">
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((o) => (
          <div key={o.id} className="order-card">
            <p><strong>Order ID:</strong> {o.id}</p>
            <p><strong>User:</strong> {o.name} ({o.phone})</p>
            <p>
              <strong>Address:</strong> {o.address}, {o.locality}, {o.city} - {o.pincode}, {o.state}
            </p>
            {o.landmark && <p><strong>Landmark:</strong> {o.landmark}</p>}
            {o.altphone && <p><strong>Alt Phone:</strong> {o.altphone}</p>}
            <p>
              <strong>Status:</strong>
              <select
                value={o.status}
                onChange={(e) => updateOrderStatus(o.id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </p>
            <div>
              <strong>Items:</strong>
              {o.items.map((item) => (
                <div key={item.id} style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                  <img src={item.poster} alt={item.product_name} width="50" />
                  <span>{item.product_name} x {item.quantity} (₹{item.price})</span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export { OrdersTaken };
