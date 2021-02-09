import React from 'react'
import { Collapse, IconButton, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab"
import HighlightOffIcon from '@material-ui/icons/HighlightOff';




const AlertBar = ({msg, handleShow, severity}) => {
    const [open, setOpen] = React.useState(true);

    return(
      <div className="toast-top-center">

        {/* <Collapse in={open}> */}
            <Alert severity={severity}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={handleShow}
                >
                  <HighlightOffIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {msg.msg}
            </Alert>
        {/* </Collapse> */}
    </div>
    )
}

export default AlertBar