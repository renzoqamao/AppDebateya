import Graph from "./Graph";

const StadisticsWindow = ({ dashboard }) => {
  return (
    <div>
      <label>{dashboard.title}</label>
      <p>{dashboard.description}</p>
      <Graph
        data={
          dashboard.data !== undefined ? Object.values(dashboard.data) : [0, 0]
        }
        labels={dashboard.options}
      />
    </div>
  );
};

export default StadisticsWindow;
