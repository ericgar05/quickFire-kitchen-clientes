import "./PaymentMethod.css";

export function PaymentMethod({
  name,
  icon,
  description,
  isSelected,
  onClick,
}) {
  return (
    <section
      className={isSelected ? "payment-card-active" : "payment-card-inactive"}
      onClick={onClick}
    >
      <section className="payment-info-container">
        {icon}
        <div>
          <p className="payment-name">{name}</p>
          <p className="payment-description">{description}</p>
        </div>
      </section>
      <section>
        <div className="payment-radio"></div>
      </section>
    </section>
  );
}
