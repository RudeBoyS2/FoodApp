import Dish from "./Dish";
import { Container, Row } from "react-bootstrap";

const Menu = (props) => {
  const { menu, onDeleteDishFromMenu } = props;

  // Function for calculating the price of the menu
  const price = () => {
    if (menu.length > 0) {
      let priceOfEachDish = [];
      let sumOfAllDishes;
      menu.map((dish) => priceOfEachDish.push(dish.pricePerServing));
      sumOfAllDishes = priceOfEachDish.reduce((acc, pl) => acc + pl);
      return sumOfAllDishes;
    }
  };

  // Function for calculating the healthScore of the menu
  const healthScore = () => {
    if (menu.length > 0) {
      let healthScoreOfEachDish = [];
      let averageOfHealthScore;
      menu.map((dish) => healthScoreOfEachDish.push(dish.healthScore));
      averageOfHealthScore = healthScoreOfEachDish.reduce(
        (acc, pl) => acc + pl
      );
      return averageOfHealthScore / healthScoreOfEachDish.length;
    }
  };

  // Function for calculating the price of the menu
  const cookingTime = () => {
    if (menu.length > 0) {
      let cookingTimeOfEachDish = [];
      let averageOfCookingTime;
      menu.map((plato) => cookingTimeOfEachDish.push(plato.readyInMinutes));
      averageOfCookingTime = cookingTimeOfEachDish.reduce(
        (acc, pl) => acc + pl
      );
      return averageOfCookingTime / cookingTimeOfEachDish.length;
    }
  };

  return (
    <Container
      fluid
      className="menu home mt-5 d-flex flex-column justify-content-between"
    >
      <Row className="d-flex justify-content-center align-items-center">
        {menu.length < 1 ? (
          <h1 className="text-center mt-2">Menu</h1>
        ) : (
          menu.map((dish) => (
            <Dish
              dish={dish}
              key={dish.id}
              image={dish.image}
              healthScore={dish.healthScore}
              price={dish.pricePerServing}
              title={dish.title}
              time={dish.readyInMinutes}
              onDeleteDishFromMenu={onDeleteDishFromMenu}
            />
          ))
        )}
      </Row>
      {menu.length >= 1 && (
        <Row className="d-flex flex-column text-center mt-5 mb-3">
          <p>
            Total Price:<span> ${price()}.</span>
          </p>

          <p>
            Average HealthScore:<span> {healthScore()} Points.</span>
          </p>

          <p>
            Cooked in approximately:<span> {cookingTime()} Minutes.</span>
          </p>
        </Row>
      )}
    </Container>
  );
};

export default Menu;
