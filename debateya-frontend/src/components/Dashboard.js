import StadisticsWindow from "./StadisticsWindow";
import { useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import Loader from "./Loader";
import { urls } from "../helpers/config";
import PaginationRounded from "./PaginationRounded";
let styles = {
  backgroundColor: "white",
};
const size = 3;
const Dashboard = () => {
  const [dbstadistics, setdbStadistics] = useState({});
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(urls.url_dashboard);
  const changeUrl = (page = 0, size = 3) => {
    setUrl(`${urls.url_dashboard}?page=${page}&size=${size}`);
  };
  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(url, {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("user")).token,
        },
      })
      .then((res) => {
        if (!res.err) {
          setdbStadistics(res);
        }
      });
    setLoading(false);
  }, [url]);

  return (
    <div className="col-md-8" style={styles}>
      {loading && <Loader />}
      {dbstadistics.list &&
        dbstadistics.list.map((element) => (
          <StadisticsWindow key={element._id} dashboard={element} />
        ))}

      <PaginationRounded
        count={
          dbstadistics.list === undefined
            ? 1
            : Math.ceil(dbstadistics.count / size)
        }
        changeUrl={changeUrl}
        size={size}
      />
    </div>
  );
};

export default Dashboard;
