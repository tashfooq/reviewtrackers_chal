import React, { useState } from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap'
import StarRating from './StarRating'
import {ReactComponent as Replies} from './replies.svg'

const ReviewCard = (props) => {
    const reviews = props.reviews;
    const [detailedView, setDetailedView] = useState(false);
    const [selectedReview, setSelectedReview] = useState({});

    const handleCardClick = (review) => {
        setDetailedView(true)
        setSelectedReview(review)
    }

    return (
        <Container>
            {detailedView && <DetailedView review={selectedReview} />}
            <Row className='mt-2'> 
                {reviews.map(review => (
                    <Col className="mt-2">
                        <Card style={{width: '25rem'}} onClick={() => handleCardClick(review)}>
                            <Card.Body>
                                <Card.Title>{review.place}</Card.Title>
                                <StarRating rating={review.rating} />
                                <Card.Text>{review.content}</Card.Text>
                                <Row>
                                    <Col>
                                        <p>{review.author}</p>
                                    </Col>
                                    <Col>
                                        <p>{new Date(review.published_at).toLocaleDateString('en-US')}</p>
                                    </Col>
                                    <Col>
                                        <Replies className="float-end" fill="#0d6efd" />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default ReviewCard;