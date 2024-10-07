import "./index.scss";

const Input = ({ label, value, onChange, type, placeholder, required }) => {
  return (
    <div className="input">
      <label className="input__label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

const Textarea = ({ label, value, onChange, placeholder, required }) => {
  return (
    <div className="input">
      <label className="input__label">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export {
  Input,
  Textarea
}