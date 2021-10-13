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
  const [editView, setEditView] = useState(
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
    setEditView(false);
    updateInputValue(findExistingComment(review.id));
  };
  const handleEditSubmit = (arr) => {
    let updatedComments = props.comments.map((item) =>
      item.id === review.id ? { ...item, comment: inputValue } : item
    );
    props.setComment(updatedComments);
    setEditView(true);
  };
  const handleSubmit = () => {
    if (inputValue.length > 0) {
      props.setComment([
        ...props.comments,
        { id: review.id, comment: inputValue },
      ]);
      setShowWarning(false);
      setEditView(true);
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
    >
      <Modal.Header closeButton>
        <Modal.Title>{review.place}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <StarRating rating={review.rating} />
        <br />
        <p>{review.content}</p>
        {editView ? (
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <p>{findExistingComment(review.id)}</p>
                </Col>
                <Col>
                  <More className="float-end" onClick={() => editComment()} />
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
              />
              <Button
                className="float-end mt-2"
                onClick={() =>
                  isEditing ? handleEditSubmit(props.comments) : handleSubmit()
                }
              >
                Submit
              </Button>
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default DetailedView;
