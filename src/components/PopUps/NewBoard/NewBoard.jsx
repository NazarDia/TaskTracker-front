import { ErrorMessage, Formik, Field } from "formik";
import * as Yup from "yup";
import sprite from "../../../images/sprite/sprite-icon.svg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBoard } from "../../../redux/boards/operations.js";
import { selectBoards } from "../../../redux/boards/selectors.js";
import styles from './NewBoard.module.css';
import { CardButton } from "../CardButton/CardButton.jsx";
import toast from "react-hot-toast";

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

const backgrounds = [
  "default",
  "flowers",
  "night",
  "pink-tree",
  "moon",
  "plant",
  "clouds",
  "rocks",
  "unsplash",
  "full-moon",
  "ship",
  "balloon",
  "gorge",
  "ocean",
  "kapadokia",
  "milky-way",
];

export default function NewBoard ({ closeModal }) {
  const dispatch = useDispatch();
  const boards = useSelector(selectBoards);

  const [icon, setIcon] = useState("");
  const [background, setBackground] = useState("");

  const handleRadioChange = (e) => {
    setIcon(e.target.value);
  };

  const handleRadioChangeBackground = (e) => {
    setBackground(e.target.value);
  };

  const handleSubmit = async (values, { resetForm }) => {
    const isBoardExists = boards.some(
      (board) => board.titleBoard === values.titleBoard
    );

    if (isBoardExists) {
      toast.warning("Board already exists", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    } else {
      const newBoard = {
        titleBoard: values.titleBoard,
        icon: icon,
        background: background,
      };
      dispatch(addBoard(newBoard));
      resetForm();
      closeModal();
    }
  };

  return (
    <Formik
      initialValues={{
        titleBoard: "",
        icon: "",
        background: "",
      }}
      validationSchema={formSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <form className={styles.form} onSubmit={handleSubmit}>
           <h2 className={styles.title}>New board</h2>
          <label className={styles.label}>
            <Field
              className={`${styles.input} ${errors.titleBoard && touched.titleBoard ? styles.error : ''}`}
              autoFocus
              type="text"
              name="titleBoard"
              placeholder="Title"
            />
          </label>
          <ErrorMessage name="titleBoard" component="div" className={styles.errorMessage} />

          <div className={styles.smallTitle}>Icons</div>
          <div id="my-radio-group">
      <div className={styles.iconsWrapper} role="group" aria-labelledby="my-radio-group">
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
            <svg className={`${styles.icon} ${icon === name ? styles.checked : ''}`} width="18" height="18">
              <use href={`${sprite}#${name}`} />
            </svg>
          </label>
        ))}
      </div>
    </div>

          <div className={styles.smallTitle}>Background</div>
          <div id="my-backgrounds-radio-group">
            <div className={styles.backgroundsWrapper} role="group" aria-labelledby="my-backgrounds-radio-group">
              {backgrounds.map((name) => (
                <label className={styles.backgroundLabel} key={name}>
                  <input
                    className={styles.backgroundField}
                    onChange={handleRadioChangeBackground}
                    checked={background === name}
                    type="radio"
                    name="background"
                    value={name}
                  />
                  {name === "default" ? (
                    <div className={styles.defaultIconWrapper}>
                      <svg className={styles.defaultIcon} width="16" height="16">
                        <use href={`${sprite}#icon-default`} />
                      </svg>
                    </div>
                  ) : (
                    <div className={styles.iconBackground}>
                      {/* Placeholder for future background images */}
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>

          <CardButton type="submit" btnText="Create" isLoading={isSubmitting} />
        </form>
      )}
    </Formik>
  );
}
