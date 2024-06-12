import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./NeedHelpModal.module.css";
import { sendFeedback } from "../../../redux/auth/operations";

const NeedHelpModal = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmitClick = async (evt) => {
    evt.preventDefault();

    const form = evt.currentTarget;
    const email = form.elements.email.value;
    const message = form.elements.message.value;

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);  
    const validComment = message.length > 0;

    const formData = {
      email,
      message,
    };

    if (validEmail && validComment) {
      try {
        const response = await dispatch(sendFeedback(formData)).unwrap();
        form.reset();
        setErrorMessage(""); 
        setSuccessMessage(response.message); // Якщо backend повертає об'єкт з полем message
      } catch (err) {
        setErrorMessage("Failed to submit request. Please try again.");
        setSuccessMessage(""); 
      }
    } else {
      if (!validEmail) {
        setErrorMessage("Please enter a valid email address!");
      }
      if (!validComment) {
        setErrorMessage("Please enter a comment!");
      }
      setSuccessMessage(""); 
    }
  };

  return (
    <div className={styles.helpModalWrap}>
      <div className={styles.styledModal}>
        <div>
          <h2 className={styles.helpTitle}>Need help</h2>
          <form className={styles.helpForm} onSubmit={onSubmitClick}>
            {errorMessage && <p className={styles.helpErrorMsg}>{errorMessage}</p>}
            {successMessage && <p className={styles.helpSuccessMsg}>{successMessage}</p>}
            <input
              className={styles.helpInput}
              name="email"
              type="text"
              placeholder="Email address"
            />
            <textarea
              className={styles.helpTextArea}
              cols="30"
              rows="10"
              name="message"
              placeholder="Enter your message"
            ></textarea>
            <button className={styles.helpSubmitBtn} type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NeedHelpModal;
