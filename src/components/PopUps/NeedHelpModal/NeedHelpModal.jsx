import { useState } from "react";
import { useDispatch } from "react-redux";
// import { requestHelp } from "../../redux/user/operations"; 
import styles from "./NeedHelpModal.module.css";

const NeedHelpModal = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmitClick = async (evt) => {
    evt.preventDefault();

    const form = evt.currentTarget;
    const email = form.elements.email.value;
    const comment = form.elements.comment.value;

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);  
    const validComment = comment.length > 0;

    const formData = {
      email,
      comment,
    };

    if (validEmail && validComment) {
      try {
        const responseText = await dispatch(requestHelp(formData)).unwrap();
        form.reset();
        setErrorMessage(""); 
        setSuccessMessage(responseText); 
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
              name="comment"
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
