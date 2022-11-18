const Button = (props) => {
  // button styling/CSS
  const buttonStyle = {
    border: "1px solid var(--saukko-main-black)",
    borderRadius: "5px",
    padding: "8px 12px",
  };

  return (
    <>
      {/* button and props properties */}
      <button
        onClick={props.onClick}
        type={props.type}
        style={buttonStyle}
        onSubmit={props.onSubmit}
      >
        {/* text displayed on button */}
        {props.text}
      </button>
    </>
  );
};

export default Button;
