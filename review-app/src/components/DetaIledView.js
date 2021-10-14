import React, { useState } from "react";
import { Modal, Form, Button, Alert, Card, Row, Col } from "react-bootstrap";
import StarRating from "./StarRating";
import { commentExists } from "../utils";
import { ReactComponent as More } from "./more.svg";

const DetailedView = (props) => {
  const review = props.review;
  const [inputValue, updateInputValue] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [postedView, setPostedView] = useState(
    commentExists(props.comments, review.id)
  );

  const findExistingComment = (id) => {
    let result = props.comments.find((item) => {
      return item.id === id;
    });
    return result.comment;
  };
  const editComment = () => {
    setIsEditing(true);
    setPostedView(false);
    updateInputValue(findExistingComment(review.id));
  };
  const cancelEdit = () => {
    setPostedView(true);
    setIsEditing(false);
  };
  const handleEditSubmit = (arr) => {
    if (inputValue.length > 0) {
      let updatedComments = props.comments.map((item) =>
        item.id === review.id ? { ...item, comment: inputValue } : item
      );
      props.setComment(updatedComments);
      setShowWarning(false);
      setPostedView(true);
    } else {
      setShowWarning(true);
    }
  };
  const handleSubmit = () => {
    if (inputValue.length > 0) {
      props.setComment([
        ...props.comments,
        { id: review.id, comment: inputValue },
      ]);
      setShowWarning(false);
      setPostedView(true);
      updateInputValue("");
    } else {
      setShowWarning(true);
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      data-testid="detail"
    >
      <Modal.Header closeButton>
        <Modal.Title>{review.place}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <StarRating rating={review.rating} />
        <br />
        <p>{review.content}</p>
        {postedView ? (
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <p data-testid="posted_comment">
                    {findExistingComment(review.id)}
                  </p>
                </Col>
                <Col>
                  <More
                    data-testid="three_dot"
                    className="float-end"
                    onClick={() => editComment()}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ) : (
          <Form>
            <Form.Group>
              <Form.Label>Comments</Form.Label>
              {showWarning && (
                <Alert variant="danger">Cannot post empty comment!</Alert>
              )}
              <Form.Control
                className="float-start"
                id="comment"
                as="textarea"
                row={3}
                value={inputValue}
                onChange={(e) => updateInputValue(e.target.value)}
                data-testid="text_input"
              />
              <Button
                className="float-end mt-2"
                onClick={() =>
                  isEditing ? handleEditSubmit(props.comments) : handleSubmit()
                }
              >
                Submit
              </Button>
              {isEditing && (
                <Button
                  className="float-start mt-2"
                  onClick={() => cancelEdit()}
                >
                  Cancel
                </Button>
              )}
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default DetailedView;
