import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationRounded({ size, count, changeUrl }) {
  const classes = useStyles();

  const handleChange = (e, page) => {
    changeUrl(page - 1, size);
  };
  return (
    <div className={classes.root}>
      <Pagination
        count={count}
        /*variant="outlined"*/
        shape="rounded"
        color="primary"
        onChange={handleChange}
      />
    </div>
  );
}
