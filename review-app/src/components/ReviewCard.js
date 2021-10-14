import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import StarRating from "./StarRating";
import DetailedView from "./DetailedView";
import { ReactComponent as Replies } from "./replies.svg";
import { commentExists } from "../utils";

const ReviewCard = (props) => {
  const reviews = props.reviews;
  const [detailedView, setDetailedView] = useState(false);
  const [selectedReview, setSelectedReview] = useState({});
  const [comments, setComment] = useState([]);

  const handleCardClick = (review, index) => {
    setDetailedView(true);
    setSelectedReview({ ...review, id: index });
  };
  const truncateString = (str) => {
    if (str.length > 120) {
      return str.slice(0, 120) + "...";
    } else {
      return str;
    }
  };
  const formatDateString = (str) => {
    let date = new Date(str).toLocaleDateString("en-US");
    return date;
  };

  return (
    <Container>
      <DetailedView
        key={selectedReview.id}
        review={selectedReview}
        show={detailedView}
        onHide={() => setDetailedView(false)}
        comments={comments}
        setComment={setComment}
      />
      <Row className="mt-2">
        {reviews.map((review, index) => (
          <Col key={index} className="mt-2">
            <Card
              key={index}
              style={{ width: "25rem" }}
              onClick={() => handleCardClick(review, index)}
              data-testid="card"
            >
              <Card.Body>
                <Card.Title>{review.place}</Card.Title>
                <StarRating rating={review.rating} />
                <Card.Text>{truncateString(review.content)}</Card.Text>
                <Row>
                  <Col>
                    <p>{review.author}</p>
                  </Col>
                  <Col>
                    <p data-testid="date">
                      {formatDateString(review.published_at)}
                    </p>
                  </Col>
                  <Col>
                    {commentExists(comments, index) && (
                      <Replies
                        data-testid="replies_icon"
                        className="float-end"
                        fill="#0d6efd"
                      />
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ReviewCard;
