import { Modal, Button } from "react-bootstrap";

const MyVerticallyCenteredModal = ({ component: Component, ...props }) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Component />
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.onHide();
            props.output && props.output();
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default MyVerticallyCenteredModal;
