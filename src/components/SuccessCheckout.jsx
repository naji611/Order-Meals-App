import Modal from "../UI/Modal";
import { useContext } from "react";
import userProgressContext from "../store/userProgressContext.jsx";
import Button from "../UI/Button.jsx";
export default function SuccessCheckout() {
  const ctxUserProgress = useContext(userProgressContext);

  function handleCloseSuccess() {
    ctxUserProgress.hideSuccess();
  }
  return (
    <Modal
      open={ctxUserProgress.progress === "success"}
      onClose={
        ctxUserProgress.progress === "success" ? handleCloseSuccess : null
      }
    >
      <h2>Thank you for ordering </h2>
      <p className="modal-actions">
        <Button
          onClick={() => {
            ctxUserProgress.hideSuccess();
          }}
        >
          Close
        </Button>
      </p>
    </Modal>
  );
}
