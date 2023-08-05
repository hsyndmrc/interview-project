import productJson from "../product.json";
import "../css/product.css";
import { useState } from "react";
import Basket from "./Basket";

const Product = () => {
  const { products } = productJson;

  const [totalAmout, setTotalAmout] = useState(0);

  const [sepet, setSepet] = useState([]);

  const addCart = (product) => {
    // price = Number(price);

    const productInCartIndex = sepet.findIndex(
      (item) => item.price === product.price
    );

    if (productInCartIndex !== -1) {
      const updatedSepet = [...sepet];
      updatedSepet[productInCartIndex].quantity += 1;
      setSepet(updatedSepet);
      console.log(totalAmout);
    } else {
      setSepet([...sepet, { ...product, quantity: 1 }]);
    }
    setTotalAmout(totalAmout + Number(product.price));
  };

  return (
    <div>
      <Basket
        sepet={sepet}
        setSepet={setSepet}
        totalAmout={totalAmout}
        setTotalAmout={setTotalAmout}
      />

      <div className="products-list">
        {Object.keys(products[0]).map((product, index) => {
          const { price, stock, img, size, description } = products[0][product];
          return (
            <div className="product" key={index}>
              <h2>{product}</h2>
              <img src={img} />
              <p className="product-p">Price: {price}</p>
              <p className="product-p">Stock: {stock}</p>
              <p className="product-p">Size: {size}</p>
              {/* <p className="product-p"> Description: {description}</p> */}
              <button
                onClick={() => addCart(products[0][product])}
                className="product-btn btn btn-warning"
              >
                Sepete Ekle
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Product;
