const Button = (props) => {
  return (
    <>
      {/* button and props properties */}
      <button
        className="button__container"
        onClick={props.onClick}
        type={props.type}
        style={props.style}
        onSubmit={props.onSubmit}
      >
        {/* text displayed on button */}
        {props.text}
      </button>
    </>
  );
};

export default Button;
