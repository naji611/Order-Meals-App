import Modal from "../UI/Modal";
import { useContext } from "react";
import userProgressContext from "../store/userProgressContext.jsx";
import Button from "../UI/Button.jsx";
export default function Error() {
  const ctxUserProgress = useContext(userProgressContext);

  function handleCloseError() {
    ctxUserProgress.hideError();
  }
  return (
    <Modal
      open={ctxUserProgress.progress === "error"}
      onClose={ctxUserProgress.progress === "error" ? handleCloseError : null}
    >
      <h2>Ops... </h2>
      <p>Something went wrong</p>
      <p className="modal-actions">
        <Button
          onClick={() => {
            ctxUserProgress.hideError();
          }}
        >
          Close
        </Button>
      </p>
    </Modal>
  );
}
