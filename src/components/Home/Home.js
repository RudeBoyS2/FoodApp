import { useState } from "react";
import { Row, Container, Navbar, FormControl, Button } from "react-bootstrap";
import Dish from "./Dish";
import Menu from "../Home/Menu";
import "./Home.css";
import axios from "../../api/axios";
import { API_KEY } from "../../api/spoonacularAPI";

const Home = (props) => {
  // State
  const [dishes, setDishes] = useState([]);
  const [timeoutId, setTimeoutId] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [menu, setMenu] = useState([]);
  const [veganMenu, setVeganMenu] = useState(0);
  const [notVegan, setNotVegan] = useState(0);

  // Function to fetch the data from spoonacular API
  const getDishesData = async (e) => {
    try {
      // setSearchTerm(e.target.value);
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=3&query=${searchTerm}&diet=${searchTerm}&addRecipeInformation=true&addRecipeNutrition=true`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setDishes(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearTimeout(timeoutId);
    // setSearchTerm(e.target.value);
    const timeout = setTimeout(() => {
      getDishesData(e.target.value);
    }, 1000);
    setTimeoutId(timeout);
  };

  //Function for adding dish to menu
  const onAddDishToMenu = (dishAdded) => {
    if (menu.length < 4) {
      // Vegan dish logic //
      if (
        (dishAdded.vegan === true) &
        (veganMenu <= 2) &
        !menu.find((dish) => dish.id === dishAdded.id)
      ) {
        if (veganMenu < 2) {
          setVeganMenu((current) => current + 1);
        } else if (veganMenu >= 2) {
          alert("Can't add more than 2 vegan dishes");
          return;
        }

        if (menu.find((dish) => dish.id === dishAdded.id)) {
          // setVeganMenu((current) => current - 1);
          return;
        }

        setMenu((current) => [...current, dishAdded]);
      }
      // Vegan dish logic //

      // notVegan dish logic //
      if (
        (dishAdded.vegan === false) &
        (notVegan <= 2) &
        !menu.find((dish) => dish.id === dishAdded.id)
      ) {
        if (notVegan < 2) {
          setNotVegan((current) => current + 1);
        } else if (notVegan >= 2) {
          alert("Can't add more than 2 no-vegan dishes");
          return;
        }

        if (menu.find((dish) => dish.id === dishAdded.id)) {
          return;
        }

        setMenu((current) => [...current, dishAdded]);
      }
      // notVegan dish logic //
    } else {
      alert("Max number of dishes in menu is 4");
    }
  };

  // Function to delete dishes from menu
  const onDeleteDishFromMenu = (deletedDish) => {
    const filteredMenu = menu.filter((dish) => dish.id !== deletedDish.id);
    setMenu(filteredMenu);

    if ((deletedDish.vegan === true) & (veganMenu >= 1)) {
      setVeganMenu((current) => current - 1);
    } else {
      setNotVegan((current) => current - 1);
    }
  };

  return (
    <main className="home">
      <Navbar className="bg-dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand className="text-light">
            <img
              src="https://i.ibb.co/3rqfKRX/hamburger.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="logo"
            />{" "}
            Alkemy Challenge
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <form onSubmit={handleSubmit} className="d-flex">
              <FormControl
                type="search"
                placeholder="Add a dish..."
                className="me-2"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline-warning" type="submit">
                Search
              </Button>
            </form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
      >
        <Row className="first-row d-flex justify-content-center align-items-center">
          {dishes.length < 1 ? (
            <h1 className="text-white text-center mt-5">
              Search for a dish...
            </h1>
          ) : (
            dishes.map((dish) => (
              <Dish
                dish={dish}
                key={dish.id}
                image={dish.image}
                healthScore={dish.healthScore}
                price={dish.pricePerServing}
                title={dish.title}
                time={dish.readyInMinutes}
                onAddDishToMenu={onAddDishToMenu}
                menu={menu}
                glutenFree={dish.glutenFree}
                vegan={dish.vegan}
                sourceUrl={dish.sourceUrl}
              />
            ))
          )}
        </Row>
      </Container>
      <Menu menu={menu} onDeleteDishFromMenu={onDeleteDishFromMenu} />
    </main>
  );
};

export default Home;
