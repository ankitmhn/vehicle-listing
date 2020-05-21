import React from "react";

//functional components do not accepts ref so wrapped in React.forwardRef
//React.forwardRef accepts only two params
const VehicleCard = React.forwardRef((props, ref) => {
  const { id, make, year, model, engineCapacity } = props.vehicle;
  return (
    <div
      className="shadow rounded-lg m-4 p-2 bg-green-200 cursor-pointer"
      onClick={() => props.selectCallback(id)}
      ref={ref || null}
    >
      <p>{id}</p>
      <p>{make}</p>
      <p>{model}</p>
      <p>{year}</p>
      <p>{engineCapacity}</p>
    </div>
  );
});

export default VehicleCard;
