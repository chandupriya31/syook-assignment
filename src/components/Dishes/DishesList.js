import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserContext } from "../../App";
import Table from 'react-bootstrap/Table';

function DishRanking() {
  const { userState } = useContext(UserContext);
  const dishes = useSelector((state) => state?.dish.dishes);
  const votes = JSON.parse(localStorage.getItem("dishPoints"));

  const getPointsForDish = (dishId) => {
    const vote = votes.find((ele) => ele.id === dishId);
    return vote ? vote.points : 0;
  }

  const loggedInUserId = userState.user.id;

  const sortedDishes = [...dishes].sort(
    (a, b) => getPointsForDish(b.id) - getPointsForDish(a.id)
  )

  const vote = Array.isArray(userState?.myVotes) ? userState.myVotes.map(ele => ele?.dishId) : []

  const [selectedDishId, setSelectedDishId] = useState(vote)

  useEffect(() => {
    setSelectedDishId(vote)
  }, [loggedInUserId, vote])

  const handleSelectDish = (dishId) => {
    setSelectedDishId(dishId)
  }

  const isSelected = (dishId) => {
    return selectedDishId.includes(dishId)
  }

  return (
    <div>
      <h3>Result Page</h3>
      <Table striped bordered hover responsive style={{width:'700px'}} className="mx-auto">
        <thead>
          <tr>
            <th>Id</th>
            <th>Dishname</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {sortedDishes.length > 0 &&
            sortedDishes.map((ele) => (
              <tr
                key={ele.id}
                className={isSelected(ele.id) ? "user-selection" : ""}
                onClick={() => handleSelectDish(ele.id)}
              >
                <td>{ele.id}</td>
                <td>{ele.dishName}</td>
                <td>{getPointsForDish(ele.id)}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default DishRanking;
