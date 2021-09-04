import { Card } from "react-bootstrap";

import ModalWindow from "./ModalWindow";

const QuestionCard = ({ question }) => {
  return (
    <Card className="text-center">
      <Card.Header>{question.title}</Card.Header>
      <Card.Body>
        <Card.Text>{`${question.description.substr(0, 100)}...`}</Card.Text>
      </Card.Body>
      <ModalWindow question={question} />
      <Card.Footer className="text-muted">{question.creation} </Card.Footer>
    </Card>
  );
};

export default QuestionCard;
