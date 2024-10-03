import { default as MUIModal } from "@mui/material/Modal";
import "./index.scss";

const Modal = ({
  children = [],
  title = "",
  open,
  setOpen,
}) => {
  return (
    <MUIModal
      open={open}
      onClose={() => setOpen(false)}
    >

      <div className="modal">
        <div className="modal__header">
          <p className="modal__title">{ title }</p>

          <svg onClick={() => onClose(false)} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M12 1.5L7.5 6L12 10.5L10.5 12L6 7.5L1.5 12L0 10.5L4.5 6L0 1.5L1.5 0L6 4.5L10.5 0L12 1.5Z" fill="black" />
          </svg>
        </div>

        <div className="modal__body">
          { children }
        </div>

      </div>

    </MUIModal>
  )
}

export default Modal