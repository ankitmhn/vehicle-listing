import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const useVehicleSearch = (pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [moreData, setMoreData] = useState(true);

  let cancelCallback;
  useEffect(() => {
    //TODO: Better implementation would be to move this into a Thunk action
    axios({
      method: "GET",
      url: "http://localhost:8000/vehicles",
      params: { _page: pageNumber, _limit: 5 }, //limit to only 5 vehicles per fetch
      cancelToken: new axios.CancelToken((c) => (cancelCallback = c)), // cancel previous request if new generated
    })
      .then((res) => {
        //append to the list
        setVehicles((prevList) => {
          return [...prevList, ...res.data];
        });
        //response empty => exhausted the list on the DB
        if (res.data.length === 0) setMoreData(false);
        setLoading(false);
        console.log(res.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return; //do nothing if error due to cancellation
        setError(true);
      });
    return () => cancelCallback();
  }, [pageNumber]);
  return { error, loading, vehicles, moreData };
};

export default useVehicleSearch;
