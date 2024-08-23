import { Modal } from "@mui/material"
import { Icon } from "@iconify/react";


const NotificationModal = ({ isOpen, onClose, notification }) => {
  if (!notification) {
    return null
  }

  return (
    <Modal
    open={isOpen}
    onClose={onClose}
    >

      <div
        className="notification-modal"
      >
        <div className="notification-modal__header">
          <svg onClick={() => onClose(false)} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M12 1.5L7.5 6L12 10.5L10.5 12L6 7.5L1.5 12L0 10.5L4.5 6L0 1.5L1.5 0L6 4.5L10.5 0L12 1.5Z" fill="black"/>
          </svg>
        </div>

        <div className="notification-modal__body">
          <h3 className="notification__title">{ notification.title }</h3>
          <p className="notification__body">{ notification.body.trim() }</p>
        </div>

        <div className="notification-modal__footer">
          <button
            className='notification-modal__footer__button'
          >
            <span>Tarkastele suoritusta</span>
            <Icon icon="bx:right-arrow-alt" />
          </button>
        </div>
      </div>

    </Modal>
  )
}

export default NotificationModal