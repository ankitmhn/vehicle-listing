import React from "react";
import { useSelector } from "react-redux";

const RightPane = () => {
  const selectedVehicle = useSelector(
    (state) => state.leftPane.vehicles[state.leftPane.selectedVehicleId]
  );

  return (
    <div className="w-2/3 m-2 bg-white">
      {selectedVehicle ? (
        <>
          <div className="text-blue-900 text-3xl m-3">Details ...</div>
          <div className="shadow-md m-5 p-4 text-gray-600 ">
            {Object.keys(selectedVehicle).map((key) => (
              <p key={key}>
                {key}: {selectedVehicle[key]}
              </p>
            ))}
          </div>
        </>
      ) : (
        <div className="m-5 text-blue-400">
          Select a vehicle on the left...{" "}
        </div>
      )}
    </div>
  );
};

export default RightPane;
