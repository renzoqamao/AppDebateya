import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import ResQuestion from "./ResQuestion";
const ModalWindow = ({ question }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const input = () => {
    localStorage.setItem("question", JSON.stringify(question));
  };
  const output = () => {
    localStorage.removeItem("question");
  };
  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          handleShow();
          input();
        }}
      >
        Do it
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose one option</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ResQuestion />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              output();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalWindow;
