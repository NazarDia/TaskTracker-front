import { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import sprite from "../../../images/sprite/sprite-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { getBoardByID, editBoardById, fetchBackgrounds } from "../../../redux/boards/operations";
import { selectBoards, selectBackgrounds } from "../../../redux/boards/selectors";
import styles from "./EditBoard.module.css";
import { CardButton } from "../CardButton/CardButton";
import toast from "react-hot-toast";

const formSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Please fill the title field"),
});

const icons = [
  "project",
  "star",
  "loading",
  "puzzle-piece",
  "container",
  "lightning",
  "colors",
  "hexagon",
];

export default function EditBoard({ boardId, onClose, initialIcon }) {
  const dispatch = useDispatch();
  const boards = useSelector(selectBoards);
  const selectedBoard = boards.find((board) => board._id === boardId);
  const backgrounds = useSelector(selectBackgrounds);

  const [icon, setIcon] = useState(initialIcon || icons[0]);
  const [background, setBackground] = useState(selectedBoard?.background?.toString() || "");

  useEffect(() => {
    dispatch(fetchBackgrounds());
    if (boardId) {
      dispatch(getBoardByID(boardId))
        .unwrap()
        .then(data => {
          if (data) {
            setIcon(data.icon || icons[0]);
            setBackground(data.background?.toString() || selectedBoard?.background?.toString() || "");
          }
        })
        .catch(error => {
          console.error('Error fetching board:', error);
          toast.error('Failed to fetch board data. Please check the ID.');
        });
    }
  }, [dispatch, boardId, selectedBoard?.background]);

  const handleSubmit = async (values, { setFieldError, resetForm }) => {
    const duplicateTitle = boards.some(
      (board) => board.title.toLowerCase() === values.title.toLowerCase() && board._id !== boardId
    );

    if (duplicateTitle) {
      setFieldError("title", "The board with this title already exists");
      return;
    }

    const updatedData = {
      title: values.title,
      icon: icon,
      background: typeof background === 'string' ? background : (selectedBoard?.background?.toString() || ""),
    };

    try {
      await dispatch(editBoardById({ boardId, ...updatedData })).unwrap();
      await dispatch(getBoardByID(boardId));
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error occurred:', error);
      toast.error('Failed to update board. Please try again.');
    }
  };

  return (
    <Formik
      initialValues={{
        title: selectedBoard ? selectedBoard.title : "",
        icon: icon,
        background: background,
      }}
      validationSchema={formSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className={styles.form}>
          <h2 className={styles.title}>Edit board</h2>
          <label className={styles.label}>
            <Field
              className={`${styles.input} ${errors.title && touched.title ? styles.error : ""}`}
              autoFocus
              type="text"
              name="title"
              placeholder="Title"
            />
          </label>
          <ErrorMessage name="title" component="div" className={styles.errorMessage} />

          <div className={styles.smallTitle}>Icons</div>
          <div id="my-radio-group">
            <div className={styles.iconsWrapper} role="group" aria-labelledby="my-radio-group">
              {icons.map((name) => (
                <label className={styles.label} key={name}>
                  <input
                    className={styles.field}
                    onChange={() => setIcon(name)}
                    checked={icon === name}
                    type="radio"
                    name="icon"
                    value={name}
                  />
                  <svg className={`${styles.icon} ${icon === name ? styles.checked : ""}`} width="18" height="18">
                    <use href={`${sprite}#${name}`} />
                  </svg>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.smallTitle}>Background</div>
          <div id="my-backgrounds-radio-group">
            <div className={styles.backgroundsWrapper} role="group" aria-labelledby="my-backgrounds-radio-group">
              <label className={`${styles.backgroundLabel} ${!background ? styles.selected : ""}`}>
                <input
                  className={styles.backgroundField}
                  onChange={() => setBackground("")}
                  checked={!background}
                  type="radio"
                  name="background"
                  value=""
                />
                <div className={`${styles.iconBackground} ${background === "" ? styles.checked : ""}`}>
                  <div className={styles.iconContainer}>
                    <svg className={styles.iconDefault} width="32" height="32">
                      <use href={`${sprite}#no-background`} />
                    </svg>
                  </div>
                </div>
              </label>

              {backgrounds.map((bg) => {
                const key = Object.keys(bg).find((key) => key !== "_id");
                const url = bg[key];
                return (
                  <label className={`${styles.backgroundLabel} ${background === key ? styles.selected : ""}`} key={bg._id}>
                    <input
                      className={styles.backgroundField}
                      onChange={() => setBackground(key)}
                      checked={background === key}
                      type="radio"
                      name="background"
                      value={key}
                    />
                    <div className={`${styles.iconBackground} ${background === key ? styles.checked : ""}`}>
                      <img src={url} alt={key} />
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <CardButton type="submit" btnText="Edit" isLoading={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
}

