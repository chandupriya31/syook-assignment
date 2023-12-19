import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetDishes } from "../../actions/dishAction";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

function DishList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const dishData = useSelector((state)=>{
  //   return state?.dish?.dishes
  // })
  const { userDispatch,userState } = useContext(UserContext);
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(startGetDishes());
    }
  }, [dispatch])

  const handleVotes = (dishId, points) => {
    setVotes((prev) => {
      const existing = prev.findIndex((vote) => vote.dishId === dishId);
      if (existing !== -1) {
        const updated = [...prev]
        updated[existing].points = points
        const pts = updated[existing].points
        updated.forEach((vote, i) => {
          if (i !== existing && vote.points === pts) {
            updated[i].points = 0
          }
        })
        return updated
      } else {
        const sameRank = prev.findIndex((vote) => vote.points === points)
        if (sameRank !== -1) {
          const updated = [...prev]
          updated[sameRank].points = 0
          updated.push({ dishId, points })
          return updated
        } else {
          return [...prev, { dishId, points }]
        }
      }
    });
  };

  const handleVoteSubmit = (e) => {
    e.preventDefault()

    const currentDishPoints = JSON.parse(localStorage.getItem("dishPoints")) || []
    votes.forEach((vote) => {
      const { dishId, points } = vote;
      const index = currentDishPoints.findIndex(ele => ele.id === dishId);
      if (index !== -1) {
        currentDishPoints[index].points = (currentDishPoints[index].points || 0) + points;
      } else {
        currentDishPoints.push({ id: dishId, points: points });
      }
    })
    localStorage.setItem("dishPoints", JSON.stringify(currentDishPoints))
    const formData = {
      votes
    }
    // const data = JSON.parse(localStorage.getItem('votes'))
    if(!localStorage.getItem(userState.user.name)===null){
      const prevVotes = JSON.parse(localStorage.getItem(userState.user.name))
      const pts = JSON.parse(localStorage.getItem('dishPoints'))
      let arr = []
      for(let i=0;i<=prevVotes.length-1;i++){
        for(let j = 0;j<=votes.length-1;j++){
          if(prevVotes[i].points === votes[j].points){
            arr.push(prevVotes[i])
            prevVotes[i]=votes[j]
          }
        }
      }
      console.log(arr,prevVotes,'prev')
      for(let i=0;i<=arr.length-1;i++){
        for(let j=0;j<=pts.length-1;i++){
          if(arr[i].dishId==pts[j].id){
            pts[j].points -= arr[i].points
          }
        }
      }
      for(let i=0;i<=votes.length-1;i++){
        for(let j=0;j<=pts.length-1;i++){
          if(votes[i].dishId == pts[j].id){
            pts[j].points += votes[i].points
          }
        }
      }
      // localStorage.setItem(userState.user.name,JSON.stringify(votes))
    }
    userDispatch({ type: "UPDATE_VOTES", payload: formData })
    localStorage.setItem(userState.user.name,JSON.stringify(votes))
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
