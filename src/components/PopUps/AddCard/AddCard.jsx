import { useDispatch } from 'react-redux';
import { addCard } from '../../../redux/cards/operations';
import toast from 'react-hot-toast';
import { nanoid } from 'nanoid';
import { Field, Form, Formik } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import css from './AddCard.module.css';

export default function PopUpAddCard({ column, onClose }) {
  const dispatch = useDispatch();

  const initialValues = {
    boardId: column.boardId,
    columnId: column._id,
    title: '',
    description: '',
    color: '',
    deadline: new Date(),
  };

  const handleSubmit = values => {
    const formattedValues = {
      ...values,
      deadline: values.deadline.toISOString().split('T')[0],
    };
    dispatch(addCard(formattedValues))
      .unwrap()
      .then(() => {
        onClose();
        toast.success('Card saved');
      })
      .catch(error => {
        toast.error(`Error: ${error.message}`);
      });
  };

  const cardTitleId = nanoid();
  const cardDescriptionId = nanoid();

  return (
    <div className={css.modal}>
      <div className={css.modalContent}>
        <span className={css.close} onClick={onClose}>
          &times;
        </span>
        <h4 className={css.title}>Add card</h4>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ setFieldValue, values }) => (
            <Form className={css.modalForm}>
              <label className={css.modalLabel} htmlFor={cardTitleId}>
                Title
              </label>
              <Field
                id={cardTitleId}
                className={css.modalInputTitle}
                type="text"
                name="title"
                placeholder="Title"
              />
              <label className={css.modalLabel} htmlFor={cardDescriptionId}>
                Description
              </label>
              <Field
                id={cardDescriptionId}
                className={css.modalInputDescription}
                type="text"
                name="description"
                placeholder="Description"
              />
              <p className={css.labelColor}>Label color</p>
              <div className={css.customRadios}>
                <div className={css.someColor}>
                  <Field
                    className={css.colorInput}
                    type="radio"
                    id="color1"
                    name="color"
                    value="8FA1D0"
                  />
                  <label htmlFor="color1">
                    <span className={css.color1}>
                      <img
                        className={css.imgColor1}
                        src="../../../public/check-icn.svg"
                        alt="Checked Icon"
                      />
                    </span>
                  </label>
                </div>
                <div>
                  <Field
                    className={css.colorInput}
                    type="radio"
                    id="color-2"
                    name="color"
                    value="E09CB5"
                  />
                  <label htmlFor="color-2">
                    <span className={css.color2}>
                      <img
                        className={css.imgColor2}
                        src="../../../public/check-icn.svg"
                        alt="Checked Icon"
                      />
                    </span>
                  </label>
                </div>
                <div>
                  <Field
                    className={css.colorInput}
                    type="radio"
                    id="color-3"
                    name="color"
                    value="BEDBB0"
                  />
                  <label htmlFor="color-3">
                    <span className={css.color3}>
                      <img
                        className={css.imgColor3}
                        src="../../../public/check-icn.svg"
                        alt="Checked Icon"
                      />
                    </span>
                  </label>
                </div>
                <div>
                  <Field
                    className={css.colorInput}
                    type="radio"
                    id="color-4"
                    name="color"
                    value="B9B9B9"
                  />
                  <label htmlFor="color-4">
                    <span className={css.color4}>
                      <img
                        className={css.imgColor4}
                        src="../../../public/check-icn.svg"
                        alt="Checked Icon"
                      />
                    </span>
                  </label>
                </div>
              </div>
              <div>
                <p className={css.deadline}>Deadline</p>
                <ReactDatePicker
                  selected={values.deadline}
                  onChange={date => setFieldValue('deadline', date)}
                  dateFormat="yyyy/MM/dd"
                  className={css.datePicker}
                />
              </div>
              <button type="submit" className={css.modalBtn}>
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
