import s from "./Button.module.css";

function Button({ label, value, currentFilter, onClick, className }) {
  const isActive = currentFilter === value;
  return (
    <button
      className={`${s.button} ${isActive ? s.active : ""} ${className || ""}`}
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );
}

export default Button;
