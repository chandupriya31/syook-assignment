import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetDishes } from "../../actions/dishAction";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

function DishList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userDispatch, userState } = useContext(UserContext);
  const [votes, setVotes] = useState([])

  const loggedInUserId = userState.user.id

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      dispatch(startGetDishes())
      const storedVotes = JSON.parse(localStorage.getItem(userState.user.name)) || []
      setVotes(storedVotes)
    }
  }, [dispatch, userState.user.name])

  useEffect(() => {
    localStorage.setItem(userState.user.name, JSON.stringify(votes))
  }, [votes, userState.user.name])

  const handleVotes = (dishId, points) => {
    setVotes((prev) => {
      let updatedVotes;
  
      const existingIndex = prev.findIndex((vote) => vote.dishId === dishId);
      const sameRank = prev.findIndex((vote) => vote.points === points);
  
      if (existingIndex !== -1) {
        updatedVotes = [...prev];
        updatedVotes[existingIndex].points = points;
  
        if (sameRank !== -1 && sameRank !== existingIndex) {
          updatedVotes[sameRank].points = 0;
        }
  
        if (points === 0) {
          updatedVotes.splice(existingIndex, 1)
        }
      } else {
        if (sameRank !== -1) {
          prev[sameRank].points = 0;
          prev.push({ dishId, points });
          updatedVotes = prev;
        } else {
          const ranksCount = prev.filter((vote) => vote.points !== 0).length
          if (ranksCount < 3) {
            updatedVotes = [...prev, { dishId, points }]
          }
        }
      }

      const filteredVotes = updatedVotes.filter((vote) => vote.points !== 0)
      return filteredVotes.slice(0, 3)
    });
  };

  const handleVoteSubmit = (e) => {
    e.preventDefault()
    const currPoints = JSON.parse(localStorage.getItem("dishPoints")) || []
    votes.forEach((vote) => {
      const { dishId, points } = vote
      const index = currPoints.findIndex((ele) => ele.id === dishId)
      if (index !== -1) {
        currPoints[index].points = points
      } else {
        currPoints.push({ id: dishId, points: points })
      }
    })

    localStorage.setItem("dishPoints", JSON.stringify(currPoints))
    const newPoints = votes.reduce((sum, vote) => sum + vote.points, 0)
    userDispatch({ type: "UPDATE_USER_POINTS", payload: newPoints })

    const formData = {
      votes
    }

    userDispatch({ type: "UPDATE_VOTES", payload: formData })
    localStorage.setItem(userState.user.name, JSON.stringify(votes))
    navigate("/result")
  }

  const dishes = useSelector((state) => state?.dish?.dishes)

  return (
    <Container style={{ maxWidth: "1200px" }}>
      <Row>
        <Col>
          <h3>Dishes List</h3>
        </Col>
        <Col className="text-left">
          <Button variant="success" onClick={handleVoteSubmit}>
            Submit
          </Button>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4">
        {dishes &&
          dishes.map((dish) => (
            <Col key={dish.id} xs={12} sm={6} md={4} lg={3}>
              <Card style={{ height: "100%" }}>
                <Card>
                  <img
                    src={dish.image}
                    alt={dish.dishName}
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                </Card>
                <Card.Body>
                  <Card.Title>{dish.dishName}</Card.Title>
                  <Card.Text>{dish.description}</Card.Text>
                  <input
                    type="radio"
                    value={30}
                    id={`${dish.id}rank1`}
                    checked={votes.some((vote) => vote.dishId === dish.id && vote.points === 30)}
                    onChange={() => handleVotes(dish.id, 30)}
                  />
                  <label htmlFor={`${dish.id}rank1`}>
                    <b>Rank1</b>
                  </label>
                  <br />
                  <input
                    type="radio"
                    value={20}
                    id={`${dish.id}rank2`}
                    checked={votes.some((vote) => vote.dishId === dish.id && vote.points === 20)}
                    onChange={() => handleVotes(dish.id, 20)}
                  />
                  <label htmlFor={`${dish.id}rank2`}>
                    <b>Rank2</b>
                  </label>
                  <br />
                  <input
                    type="radio"
                    value={10}
                    id={`${dish.id}rank3`}
                    checked={votes.some((vote) => vote.dishId === dish.id && vote.points === 10)}
                    onChange={() => handleVotes(dish.id, 10)}
                  />
                  <label htmlFor={`${dish.id}rank3`}>
                    <b>Rank3</b>
                  </label>
                  <br />
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default DishList;
