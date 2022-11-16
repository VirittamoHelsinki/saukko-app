const Button = (props) => {
  const buttonStyle = {
    border: "1px solid var(--saukko-main-black)",
    borderRadius: "5px",
    padding: "8px 12px",
  };

  return (
    <>
      <button
        onClick={props.onClick}
        type={props.type}
        style={buttonStyle}
        onSubmit={props.onSubmit}
      >
        {props.text}
      </button>
    </>
  );
};

export default Button;
