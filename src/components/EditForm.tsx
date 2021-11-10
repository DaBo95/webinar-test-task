import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTodoItems } from '../store/hooks';
import { TodoItem } from '../store/types';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

interface IEditFormProps {
    item: TodoItem;
}

const EditForm: React.FC<IEditFormProps> = ({
    item: { title, details, id, done },
}: IEditFormProps) => {
    const [itemState, setItemState] = React.useState({
        open: false,
        title,
        details,
    });

    const { todoItems, dispatch } = useTodoItems();

    const handleClickOpen = () => {
        setItemState({ ...itemState, open: true });
    };

    const handleClose = () => {
        setItemState({ ...itemState, open: false });
    };

    const handleEdit = useCallback(() => {
        dispatch({ type: "edit", data: { id, ...itemState, done } });
        handleClose();
    }, [id, itemState, dispatch]);

    return (
        <div>
            <IconButton aria-label="edit" onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
            <Dialog
                open={itemState.open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Edit item</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        fullWidth
                        value={itemState.title}
                        onChange={(e) => {
                            setItemState({ ...itemState, title: e.target.value });
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="details"
                        label="Details"
                        fullWidth
                        value={itemState.details}
                        onChange={(e) => {
                            setItemState({ ...itemState, details: e.target.value });
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleEdit} color="primary">
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditForm;