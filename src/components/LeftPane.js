import React, { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchMoreVehicles,
  setPage,
  onVehicleSelect,
} from "../store/leftPaneSlice";
import TopBar from "./TopBar";
import VehicleCard from "./VechicleCard";

//custom hook to fetch data
const useVehicleSearch = (page) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMoreVehicles(page));
  }, [page, dispatch]);
};

//React functional component
const LeftPane = () => {
  //pull out data from the redux store
  const page = useSelector((state) => state.leftPane.page);
  const error = useSelector((state) => state.leftPane.error);
  const loading = useSelector((state) => state.leftPane.loading);
  const vehicles = useSelector((state) => state.leftPane.vehicles);
  const moreData = useSelector((state) => state.leftPane.moreData);

  const dispatch = useDispatch();
  const observer = useRef();
  const lastVehicleCard = useCallback(
    (node) => {
      // do not trigger data fetch again if loading
      if (loading) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("Last card is now visible... fetch more data");
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  useVehicleSearch(page);
  return (
    <div className="flex flex-col w-1/3 m-2 m-2 bg-white">
      <TopBar />
      <div className="flex flex-col pt-8 h-full" style={{ overflow: "scroll" }}>
        {vehicles.map((vehicle, index) => {
          return (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              selectCallback={(selectedId) =>
                dispatch(onVehicleSelect(selectedId))
              }
              //MAGIC happens here - get reference to last card
              {...(vehicles.length === index + 1
                ? { ref: lastVehicleCard }
                : null)}
            />
          );
        })}
      </div>
      {loading && <div>Loading ...</div>}
      {error && <div>Error ...</div>}
      {!moreData && <div>End of list.</div>}
    </div>
  );
};

export default LeftPane;
