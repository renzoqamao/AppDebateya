import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import { Button } from "react-bootstrap";

import Loader from "./Loader";
import PaginationRounded from "./PaginationRounded";

import { urls } from "../helpers/config";
import QuestionForm from "./QuestionForm";
import { helpHttp } from "../helpers/helpHttp";
import "../css/Card.css";
const size = 3;

const Questions = () => {
  const [modalShow, setModalShow] = useState(false);
  const [dbQuestions, setdbQuestions] = useState({});
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(urls.url_questions);

  const changeUrl = (page = 0, size = 3) => {
    setUrl(`${urls.url_questions}?page=${page}&size=${size}`);
  };
  useEffect(() => {
    setLoading(true);

    helpHttp()
      .get(url, {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("user")).token,
        },
      })
      .then((res) => {
        console.log(res);
        if (!res.err) {
          setdbQuestions(res);
        }
      });
    setLoading(false);
  }, [url]);
  return (
    <div className="col-md-8 questions">
      {loading && <Loader />}
      {dbQuestions.list &&
        dbQuestions.list.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}

      <div className="creator">
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Create a Question
        </Button>

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          component={QuestionForm}
          title={"Create a question "}
        />
      </div>
      <PaginationRounded
        count={
          dbQuestions.list === undefined
            ? 1
            : Math.ceil(dbQuestions.count / size)
        }
        changeUrl={changeUrl}
        size={size}
      />
    </div>
  );
};

export default Questions;
