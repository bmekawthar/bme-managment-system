import { useNavigate } from "react-router-dom";
import "./Card.css";

function Card({ title, description, icon, to }) {
  const navigate = useNavigate();

  return (
    <button
      className="dashboard-card"
      type="button"
      onClick={() => navigate(to)}
    >
      <span className="card-icon" aria-hidden="true">
        {icon}
      </span>

      <h2>{title}</h2>

      <p>{description}</p>
    </button>
  );
}

export default Card;