import Modal from "../Modal/Modal";
import css from "./LogoutModal.module.css";
//! TEMPORARY ТИМЧАСОВА МОДАЛКА
function LogoutModal() {
  return (
    <Modal>
      <p className={css.description}>Are you sure you want to log out?</p>
      <button className={`${css.btn} ${css.logout}`}>Log out</button>
      <button className={`${css.btn} ${css.cancel}`}>Cancel</button>
    </Modal>
  );
}

export default LogoutModal;
