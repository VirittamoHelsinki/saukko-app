import "./_fieldvaluecard.scss";

const FieldValueCard = ({ title, value }) => {
  return (
    <div className="field-value-card">
      <p className="field-value-card__title">{title}</p>
      <p className="field-value-card__value">{value}</p>
    </div>
  );
};

export default FieldValueCard;