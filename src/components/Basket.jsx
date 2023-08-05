import React, { useState } from "react";
import "../css/basket.css";
const Basket = ({ sepet, setSepet, totalAmout, setTotalAmout }) => {
  const [aktif, setAktif] = useState(true);

  const removeFromCart = (index, price, quantity) => {
    setTotalAmout(totalAmout - price * quantity);
    const updatedSepet = [...sepet];
    updatedSepet.splice(index, 1);
    setSepet(updatedSepet);

    if (!aktif) {
      setTotalAmout(totalAmout - price * 0.8);
      setAktif(false);
    }

    if (updatedSepet.length === 0) {
      setAktif(true);
      setTotalAmout(0);
    }
  };

  const indirim = () => {
    totalAmout = totalAmout * 0.8;
    setTotalAmout(totalAmout);
    setAktif(false);

    if (totalAmout === 0) {
      alert("Sepetinizde urun olmadigi icin indirim uygulanamaz!!!");
      setAktif(true);
    }
  };

  const fakeDataPost = (data) => {
    console.log("POST Data: ", data);
  };

  const alisverisTamam = () => {
    if (totalAmout === 0) {
      alert("Sepetinizde herhangi bir urun bulunmamaktadir!!!");
    } else {
      alert(`Toplam odenen tutar: ${totalAmout}`);
    }

    //? Alisveris tamamlandiktan sonra fiyat degerini 0ladik
    setTotalAmout(0);

    //? Alisveris tamamlandiktan sonra sepetimizi bosalttik.
    setSepet([]);

    //? Alisverisi tamamladiktan sonra uygulanan indirimi sifirladik.
    setAktif(true);

    const dataToSend = { sepet: sepet, totalAmout: totalAmout };
    fakeDataPost(dataToSend);
  };

  return (
    <div>
      <div className="bg-warning">
        <h4 className="basket-header">Toplam Fiyat: {totalAmout}$</h4>
        <div className="basket-content">
          {sepet.map((product, index) => {
            // console.log(product);
            return (
              <div key={index} className="basket-item">
                <img src={product.img} alt={product.description} />
                <p>Price: {product.price}$</p>
                <p>Stock: {product.stock}</p>
                <button
                  className="btn btn-dark"
                  onClick={() =>
                    removeFromCart(index, product.price, product.quantity)
                  }
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>

        <div className="basket-button-div text-end">
          {aktif ? (
            <button onClick={indirim} className="btn btn-danger m-2">
              20% Indirim
            </button>
          ) : (
            <span className="basket-span">Indirim Uygulandi</span>
          )}

          <button onClick={alisverisTamam} className="btn btn-success">
            Alisverisi Tamamla
          </button>
        </div>
      </div>
    </div>
  );
};

export default Basket;
