


import "./index.scss";

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M14.75 2.0625L9.3125 7.5L14.75 12.9375L12.9375 14.75L7.5 9.3125L2.0625 14.75L0.25 12.9375L5.6875 7.5L0.25 2.0625L2.0625 0.25L7.5 5.6875L12.9375 0.25L14.75 2.0625Z" fill="black"/>
  </svg>
);

const ModalHeader = ({
  text,
  handleClose,
}) => {
  return (
    <div className="modal__header">
      <p className="header__title">{ text }</p>
      <button className="header__close-button">
        <CloseIcon />
      </button>
    </div>
  );
}

const Modal = ({
  open = false,
  handleClose = () => {},
  children = [],
  title = "",
}) => {
  return (
    <div className="modal">
      <ModalHeader text={title}/>
      <div className="modal__children">
        { children }
      </div>
    </div>
  )
}

export default Modal