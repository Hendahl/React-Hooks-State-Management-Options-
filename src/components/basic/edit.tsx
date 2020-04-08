import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, {
  ChangeEvent,
  FC,
  ReactElement,
  KeyboardEvent,
  useState,
} from "react";
import TextField from "@material-ui/core/TextField";

interface EditFormProps {
  handleSave: () => void;
  handleEditing: Editing;
  handleEditTitle: Edit;
  todo: Todo;
}

const EditForm: FC<EditFormProps> = ({
  handleSave,
  handleEditTitle,
  handleEditing,
  todo,
}): ReactElement => {
  const [defaultTitle] = useState<string>(todo.title);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    handleEditTitle({
      ...todo,
      title: e.target.value,
    });
  };

  const handleEditTitleOnEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && todo.title !== "" && todo.title !== defaultTitle) {
      handleSave();
    }
  };

  const handleUndo = () => {
    handleEditTitle({
      ...todo,
      title: defaultTitle,
    });
  };

  return (
    <Dialog
      open={true}
      aria-labelledby="editTodo-dialog-title"
      fullWidth={true}
    >
      <DialogTitle id="editTodo-dialog-title">Edit {defaultTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>Change title of the todo ...</DialogContentText>
        <TextField
          autoComplete="off"
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          fullWidth
          value={todo.title}
          onChange={handleTitleChange}
          onKeyPress={handleEditTitleOnEnter}
        />
        <TextField
          disabled={true}
          margin="dense"
          id="id"
          label="Id"
          fullWidth
          value={todo.id}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          disabled={todo.title === defaultTitle}
          onClick={handleUndo}
        >
          Reset
        </Button>
        <Button color="primary" onClick={() => handleEditing(todo)}>
          Cancel
        </Button>
        <Button
          color="primary"
          disabled={todo.title === "" || todo.title === defaultTitle}
          onClick={() => handleSave()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditForm;