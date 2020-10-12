import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withAuthSync } from "../utils/auth";
const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(0)
  }
}));

const Home = () => {
  const classes = useStyles();
  return (
      <div className={classes.root}>
        <div>Home</div>
        <div>{process.env.NODE_ENV}</div>
        <div>{process.env.STAGING}</div>
        <div>{process.env.API_URL}</div>
      </div>
  );
};
export default withAuthSync(Home);
