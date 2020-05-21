import React from "react";
import { useSelector } from "react-redux";

//functional components do not accepts ref so wrapped in React.forwardRef
//React.forwardRef accepts only two params
const VehicleCard = React.forwardRef((props, ref) => {
  const { id, make, year, model, engineCapacity } = props.vehicle;
  const selectedVehicleId = useSelector(
    (state) => state.leftPane.selectedVehicleId
  );
  const isSelected = selectedVehicleId === id;
  return (
    <div
      className={`shadow rounded-lg m-4 p-2 h-50 cursor-pointer text-gray-700 ${
        isSelected ? "bg-green-500" : "bg-green-200"
      }`}
      onClick={() => props.selectCallback(id)}
      ref={ref || null}
    >
      <p>{id}</p>
      <p>{make}</p>
      <p>{model}</p>
      {/* <p>{year}</p>
      <p>{engineCapacity}</p> */}
    </div>
  );
});

export default VehicleCard;
