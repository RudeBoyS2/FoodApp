import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";

const Dish = (props) => {
  const {
    dish,
    menu,
    image,
    title,
    price,
    healthScore,
    time,
    onAddDishToMenu,
    onDeleteDishFromMenu,
  } = props;

  return (
    <Card
      border="dark rounded"
      className="mt-4 mb-4 mx-auto p-0"
      style={{ width: "20rem" }}
    >
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title className="text-center">
          {title.substring(0, 25)}...
        </Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>Costs: ${price}</ListGroupItem>
        <ListGroupItem>Ready in: {time}'</ListGroupItem>
        <ListGroupItem>Health Score:{healthScore}</ListGroupItem>
      </ListGroup>
      <Card.Body className="d-flex justify-content-center">
        {menu ? (
          <Button onClick={() => onAddDishToMenu(dish)} variant="warning">
            Add to menu
          </Button>
        ) : (
          <Button onClick={() => onDeleteDishFromMenu(dish)} variant="warning">
            Delete from menu
          </Button>
        )}
        <Button variant="warning mx-2">See details...</Button>
      </Card.Body>
    </Card>
  );
};

export default Dish;
