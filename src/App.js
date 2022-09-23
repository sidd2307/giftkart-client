import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Carousal from "./components/Carousal";

function App() {
  const [products, setproducts] = useState([]);
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const handleChange = async (value) => {
    try {
      const res = await axios.get(`http://localhost:8800/find/${value}`);
      setproducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const optimizedFn = useCallback(debounce(handleChange), []);

  const [carousalImgs, setcarousalImgs] = useState([]);

  const [allproducts, setallproducts] = useState(null)

  useEffect(() => {
    axios
      .get(`http://localhost:8800/find`)
      .then((response) => setallproducts(response.data));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8800/carousal/find`)
      .then((response) => setcarousalImgs(response.data));
  }, []);

  console.log(products);
  console.log(carousalImgs);
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 10,
          marginBottom: 10
        }}
      >
        <div style={{ fontSize: 30, fontWeight: "800", cursor: 'pointer' }} onClick={() => setproducts([])}>TechStore</div>
        <input
          type="text"
          className="search"
          placeholder="Search Products"
          onChange={(e) => optimizedFn(e.target.value)}
          style={{
            width: "50%",
            height: "30px",
            padding: "10px",
            border: "1px solid black",
            borderRadius: 10,
            fontSize: 20,
          }}
        />
      </div>
      <Carousal images={carousalImgs} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          width: "90%",
          margin: "auto",
          marginTop: 20,
        }}
      >
        {products?.length > 0 && (
          <>
            {products.map((el, i) => (
              <Card el={el} />
            ))}
          </>
        )}
        {products.length === 0 && allproducts?.length > 0 && (
          <>
            {allproducts.map((el, i) => (
              <Card el={el} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
