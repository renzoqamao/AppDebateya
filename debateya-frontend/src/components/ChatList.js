import ContactMailIcon from "@material-ui/icons/ContactMail";
import { useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import Loader from "./Loader";
import { urls } from "../helpers/config";
/* MATERIAL UI*/
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
/* import StarIcon from "@material-ui/icons/Star"; */
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

/*Traer todos los usuarios que tienen su auth en true*/
const ChatList = () => {
  const [dbuser, setDbuser] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(urls.url_chat_list, {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("user")).token,
        },
      })
      .then((res) => {
        if (!res.err) {
          setDbuser(res);
        } else {
          setDbuser(null);
        }
      });
    setLoading(false);
  }, []);

  return (
    <>
      <List className={classes.root} aria-label="contacts">
        {loading && <Loader />}
        {dbuser.length > 0 &&
          dbuser.map((user) => (
            <ListItem button key={user._id}>
              <ListItemIcon>
                <ContactMailIcon />
              </ListItemIcon>
              <ListItemText primary={user.name} />
            </ListItem>
          ))}
      </List>
    </>
  );
};

export default ChatList;
