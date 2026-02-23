import { useEffect, useState } from "react";

// Environment variables are crucial for Phase 1 vs Phase 3 (Kubernetes)
// During local Docker Compose, it will default to localhost
const API_BASE = import.meta.env.VITE_API_BASE || "";
const ML_BASE = import.meta.env.VITE_ML_BASE || "http://localhost:5000";

export default function App() {
  const [products, setProducts] = useState([]);
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch Products from Backend (Postgres + Redis Cache)
    fetch(`${API_BASE}/products`)
      .then(r => r.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error("Backend error:", err))
      .finally(() => setLoading(false));

    // 2. Fetch Recommendations from ML Service
    fetch(`${ML_BASE}/recommendations/42`)
      .then(r => r.json())
      .then(d => setRecs(d.recommendations || []))
      .catch(err => console.error("ML error:", err));
  }, []);

  return (
    <main style={{ fontFamily: "sans-serif", maxWidth: 720, margin: "2rem auto", padding: "1rem", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h1 style={{ color: "#2563eb" }}>ShopMicro Dashboard</h1>
      
      <section>
        <h2>Product Catalog</h2>
        {loading ? <p>Loading products...</p> : (
          <ul>
            {products.length > 0 ? products.map(p => (
              <li key={p.id} style={{ marginBottom: "0.5rem" }}>
                <strong>{p.name}</strong> — ${p.price}
              </li>
            )) : <p>No products found. Check your DB seeds!</p>}
          </ul>
        )}
      </section>

      <hr />

      <section>
        <h2>AI Recommendations for You</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          {recs.map(r => (
            <span key={r} style={{ background: "#f3f4f6", padding: "5px 12px", borderRadius: "15px", fontSize: "0.9rem" }}>
              {r}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
