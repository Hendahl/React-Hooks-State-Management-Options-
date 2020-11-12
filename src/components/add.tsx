import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import * as t from "../ts/types";

const AddComponent: FC<{ add: t.Add }> = (props) => {
  const [stateTitle, setStateTitle] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setStateTitle(e.target.value);
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && stateTitle !== "") {
      props.add(stateTitle);
      setStateTitle("");
    }
  };

  return (
    <ListItem>
      <TextField
        autoComplete="off"
        fullWidth
        id="title"
        label="What needs to be done?"
        onChange={handleChange}
        onKeyPress={handleEnter}
        type="text"
        value={stateTitle}
        variant="outlined"
      />
    </ListItem>
  );
};

export default AddComponent;
