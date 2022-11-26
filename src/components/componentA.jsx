import React, { useState, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  FormGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";

export default function ComponentA(props) {
  const { transformDataForTree, postData } = props || {};
  const [maskedPath, setMaskedPath] = useState("");
  const [openDialog, toggleOpenDialog] = useState(false); // rename
  const [nodePath, setnodePath] = useState("");
  const [dialogValue, setDialogValue] = useState("");

  const inputRef = useRef();

  const handleMaskedPath = () => {
    setMaskedPath(maskedPath.replace(/\s/g, "/"));
  };

  const handleDialog = () => {
    setDialogValue("");
    toggleOpenDialog(!openDialog);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const [key, value] = dialogValue.replace(/\s/g, "").split(":");
    const property = { [key]: value };
    postData(nodePath, property);
    toggleOpenDialog(false);
  };

  // To Do: revisit assumptions of how input and API calls should work together, consider using autocomplete to give user feedback and enforce structure
  const handleChange = (props) => {
    const value = props.target.value;
    setnodePath(value);
    if (transformDataForTree(value) !== undefined) {
      transformDataForTree(value);
    }
  };

  // To Do: set styles with MUI useStyles instead of through .css classNames
  return (
    <div className="input-box">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={(props) => handleSubmit(props)}
      >
        <FormGroup className="form-group" row align="center">
          <Grid
            container
            spacing={2}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <TextField
                id="standard-basic"
                className="form-field"
                label="Node path"
                variant="outlined"
                margin="dense"
                onChange={(props) => handleChange(props)}
                placeholder='Enter path e.g. "Rocket/Stage1"'
                onKeyUp={handleMaskedPath}
                defaultValue={maskedPath}
                size="small"
                inputRef={inputRef}
                sx={{ width: 260 }}
              />
            </Grid>
            <Grid item style={{ display: "flex" }}>
              <Button
                onClick={handleDialog}
                variant="outlined"
                className="form-button"
                margin="dense"
                size="small"
                sx={{
                  height: 40,
                  color: "#FFFFFF",
                  backgroundColor: "#688dc0",
                  borderColor: "#777777",
                  "&:hover": { backgroundColor: "#FFFFFF", color: "#000000" },
                }}
              >
                Add Property
              </Button>
            </Grid>
          </Grid>

          <Dialog open={openDialog} onClose={handleDialog}>
            <form onSubmit={handleSubmit}>
              <DialogTitle>Add Property to {nodePath}</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  placeholder="e.g. foo: 20.2"
                  margin="dense"
                  id="name"
                  value={dialogValue}
                  onChange={(event) => {
                    setDialogValue(event.target.value);
                  }}
                  label="Key: Value"
                  type="text"
                  variant="outlined"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialog}>Cancel</Button>
                <Button type="submit">Add</Button>
              </DialogActions>
            </form>
          </Dialog>
        </FormGroup>
      </Box>
    </div>
  );
}
