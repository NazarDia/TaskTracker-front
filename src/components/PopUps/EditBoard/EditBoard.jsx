import { ErrorMessage, Formik, Field } from "formik";
import * as Yup from "yup";
import sprite from "../../../images/sprite/sprite-icon.svg";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBoardById, getBoardByID, fetchBackgrounds } from "../../../redux/boards/operations";
import { selectBoards, selectBackgrounds } from "../../../redux/boards/selectors";
import styles from "./EditBoard.module.css";
import { CardButton } from "../CardButton/CardButton";

const formSchema = Yup.object().shape({
  titleBoard: Yup.string()
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

export default function EditBoard({ boardId, closeModal }) {
  const dispatch = useDispatch();
  const boards = useSelector(selectBoards);
  const selectedBoard = boards.find((board) => board._id === boardId);
  const backgrounds = useSelector(selectBackgrounds);

  const [icon, setIcon] = useState(selectedBoard ? selectedBoard.icon : "");
  const [background, setBackground] = useState(selectedBoard ? selectedBoard.background : "");

  useEffect(() => {
    dispatch(fetchBackgrounds());
  }, [dispatch]);

  useEffect(() => {
    if (selectedBoard) {
      setIcon(selectedBoard.icon);
      setBackground(selectedBoard.background);
    }
  }, [selectedBoard]);

  const handleRadioChange = (e) => {
    setIcon(e.target.value);
  };

  const handleRadioChangeBackground = (e) => {
    setBackground(e.target.value);
  };

  const handleSubmit = async (values, { resetForm }) => {
    const updatedData = {
      titleBoard: values.titleBoard,
      icon: icon,
      background: background,
    };

    try {
      await dispatch(editBoardById({ boardId, updatedData }));
      dispatch(getBoardByID(boardId));
      resetForm();
      closeModal();
    } catch (error) {
      console.error("Error editing board:", error);
    }
  };

  if (!selectedBoard) {
    return <div>Board Not Found</div>; 
  }

  return (
    <Formik
      initialValues={{
        titleBoard: selectedBoard.titleBoard,
      }}
      validationSchema={formSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Edit board</h2>
          <label className={styles.label}>
            <Field
              className={`${styles.input} ${
                errors.titleBoard && touched.titleBoard ? styles.error : ""
              }`}
              autoFocus
              type="text"
              name="titleBoard"
              placeholder="Title"
            />
          </label>
          <ErrorMessage
            name="titleBoard"
            component="div"
            className={styles.errorMessage}
          />

          <div className={styles.smallTitle}>Icons</div>
          <div id="my-radio-group">
            <div
              className={styles.iconsWrapper}
              role="group"
              aria-labelledby="my-radio-group"
            >
              {icons.map((name) => (
                <label className={styles.label} key={name}>
                  <input
                    className={styles.field}
                    onChange={handleRadioChange}
                    checked={icon === name}
                    type="radio"
                    name="icon"
                    value={name}
                  />
                  <svg
                    className={`${styles.icon} ${
                      icon === name ? styles.checked : ""
                    }`}
                    width="18"
                    height="18"
                  >
                    <use href={`${sprite}#${name}`} />
                  </svg>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.smallTitle}>Background</div>
          <div id="my-backgrounds-radio-group">
            <div className={styles.backgroundsWrapper} role="group" aria-labelledby="my-backgrounds-radio-group">
              {/* Default background option */}
              <label className={`${styles.backgroundLabel} ${!background ? styles.selected : ''}`}>
  <input
    className={styles.backgroundField}
    onChange={() => setBackground('')}
    checked={!background}
    type="radio"
    name="background"
    value=""
  />
  <div className={`${styles.iconBackground} ${background === '' ? styles.checked : ''}`}>
    <div className={styles.iconContainer}>
      <svg className={styles.iconDefault} width="32" height="32">
        <use href={`${sprite}#no-background`} />
      </svg>
    </div>
  </div>
</label>

{backgrounds.map((bg) => {
  const key = Object.keys(bg).find((key) => key !== '_id');
  const url = bg[key];
  return (
    <label className={`${styles.backgroundLabel} ${background === key ? styles.selected : ''}`} key={bg._id}>
      <input
        className={styles.backgroundField}
        onChange={handleRadioChangeBackground}
        checked={background === key}
        type="radio"
        name="background"
        value={key}
      />
      <div className={`${styles.iconBackground} ${background === key ? styles.checked : ''}`}>
        <img src={url} alt={key} />
      </div>
    </label>
  );
})}

            </div>
          </div>

          <CardButton type="submit" btnText="Edit" isLoading={isSubmitting} />
        </form>
      )}
    </Formik>
  );
}
