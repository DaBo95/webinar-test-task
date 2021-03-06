import { useCallback } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import { motion } from "framer-motion";
import { useTodoItems } from "../store/hooks";
import { TodoItem } from "../store/types";
import EditForm from "./EditForm";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const spring = {
  type: "spring",
  damping: 25,
  stiffness: 120,
  duration: 0.25,
};

const useTodoItemListStyles = makeStyles({
  root: {
    listStyle: "none",
    padding: 0,
  },
});

const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const TodoItemsList = function () {
  const { todoItems, dispatch } = useTodoItems();

  const classes = useTodoItemListStyles();

  const handleReorder = useCallback(
    (items) => dispatch({ type: "reorder", data: { todoItems: items } }),
    [dispatch]
  );

  const sortedItems = todoItems.slice().sort((a, b) => {
    if (a.done && !b.done) {
      return 1;
    }

    if (!a.done && b.done) {
      return -1;
    }

    return 0;
  });

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      sortedItems,
      result.source.index,
      result.destination.index
    );

    console.log(items);

    handleReorder(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {sortedItems.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    key={item.id}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TodoItemCard item={item} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>

    /*
          <ul className={classes.root}>
              {sortedItems.map((item) => (
                  <motion.li key={item.id} transition={spring} layout={true}>
                      <TodoItemCard item={item} />
                  </motion.li>
              ))}
          </ul>
          */
  );
};

const useTodoItemCardStyles = makeStyles({
  root: {
    marginTop: 24,
    marginBottom: 24,
  },
  doneRoot: {
    textDecoration: "line-through",
    color: "#888888",
  },
});

export const TodoItemCard = function ({ item }: { item: TodoItem }) {
  const classes = useTodoItemCardStyles();
  const { dispatch } = useTodoItems();

  const handleDelete = useCallback(
    () => dispatch({ type: "delete", data: { id: item.id } }),
    [item.id, dispatch]
  );

  const handleToggleDone = useCallback(
    () =>
      dispatch({
        type: "toggleDone",
        data: { id: item.id },
      }),
    [item.id, dispatch]
  );

  return (
    <Card
      className={classnames(classes.root, {
        [classes.doneRoot]: item.done,
      })}
    >
      <CardHeader
        action={
          <>
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
            <EditForm item={item} />
          </>
        }
        title={
          <FormControlLabel
            control={
              <Checkbox
                checked={item.done}
                onChange={handleToggleDone}
                name={`checked-${item.id}`}
                color="primary"
              />
            }
            label={item.title}
          />
        }
      />
      {item.details ? (
        <CardContent>
          <Typography variant="body2" component="p">
            {item.details}
          </Typography>
        </CardContent>
      ) : null}
    </Card>
  );
};
