import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import { requestHelp } from "../../redux/user/operations";
import styles from "./NeedHelpModal.module.css";

const NeedHelpModal = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitClick = (evt) => {
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
        const responseText = dispatch(requestHelp(formData));
        form.reset();

        toast.success(responseText, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      } catch (err) {
        toast.error("Failed to submit request", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      if (!validEmail) {
        setErrorMessage("Please enter a valid email address!");
      }
      if (!validComment) {
        setErrorMessage("Please enter a comment!");
      }
    }
  };

  return (
    <div className={styles.helpModalWrap}>
      <div className={styles.styledModal}>
        <div>
          <h2 className={styles.helpTitle}>Need help</h2>
          <form className={styles.helpForm} onSubmit={onSubmitClick}>
            <p className={styles.helpErrorMsg}>{errorMessage}</p>
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
