import s from "./Button.module.css";

interface ButtonProps {
  label: string;
  value: string;
  currentFilter: string;
  onClick: (value: string) => void;
  className?: string;
}

function Button({
  label,
  value,
  currentFilter,
  onClick,
  className,
}: ButtonProps) {
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
