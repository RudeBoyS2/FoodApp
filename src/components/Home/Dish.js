import { Card, Button, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import { useState } from "react";

const Dish = (props) => {
  const {
    dish,
    menu,
    image,
    title,
    price,
    healthScore,
    time,
    glutenFree,
    vegan,
    sourceUrl,
    onAddDishToMenu,
    onDeleteDishFromMenu,
  } = props;

  // State
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        <Button variant="warning mx-2" onClick={handleShow}>
          See details...
        </Button>
        <Modal variant="warning" show={show} onHide={handleClose} className="text-center">
          <Modal.Header closeButton className="d-flex flex-column-reverse">
            <Modal.Title>
              {title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Dish price is: ${price}.
            <br />
            Dish cooking time is: {time} minutes.
            <br />
            Dish Health Score is: {healthScore}.
            <br />
            Gluten free: {glutenFree.toString().toUpperCase()}.
            <br />
            Vegan: {vegan.toString().toUpperCase()}.
            <br />
            <a className="modal-a" href={sourceUrl}>See Recipe</a>
            <br />
            <img className="modal-img" src={image} alt="Dish" />
          </Modal.Body>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default Dish;
