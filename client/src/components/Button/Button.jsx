import { Icon } from "@iconify/react";

const Button = (props) => {
  return (
    <>
      {/* button and props properties */}
      <button
        className="button__container"
        onClick={props.onClick}
        type={props.type}
        style={props.style}
        iconeStyle={props.iconeStyle}
        onSubmit={props.onSubmit}
      >
        {/* text displayed on button */}
        <div className="button__text">{props.text}</div>
        {/* icon displayed on button */}
        <Icon icon={props.icon} className="button__icon" />
      </button>
    </>
  );
};

export default Button;