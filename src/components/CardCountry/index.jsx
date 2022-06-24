import React from "react";
import "./cardComponent.css";
import PropTypes from "prop-types";

function CardComponent({
  country,
  image,
  capital,
  currencie,
  type,
  language,
  add,
  delet,
  id,
}) {
  // console.log(Object.values(currencie).map(element=>element.name));
  const currencies = Object.values(currencie);
  const len = Object.values(language);
  return (
    <div className="container-card">
      <img src={image} alt={country} />
      <div className="container-card_paragraph">
        <h2 style={{margin: '0 auto'}}>{country}</h2>
        <p>Capital: {capital}</p>
        <p>lenguajes
        {len.map((element) => (
          <strong style={{margin: '0 auto'}}><br/>{element}</strong>
        ))}

        </p>
        {currencies.map((element) => (
          <p> Moneda:{element.name}</p>
        ))}
      </div>
      {type ? (
        <button onClick={() => add(id)}>agregar</button>
      ) : (
        <button onClick={() => delet(id)}>quitar</button>
      )}
    </div>
  );
}

export default CardComponent;

CardComponent.defaultProps = {
  currencie: [],
  language: [],
};
