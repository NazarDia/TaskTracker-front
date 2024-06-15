import { useDispatch } from 'react-redux';
import { addCard } from '../../../redux/cards/operations';
import toast from 'react-hot-toast';
import { nanoid } from 'nanoid';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import css from './AddCard.module.css';
import { CardButton } from '../CardButton/CardButton';
import { TiTick } from 'react-icons/ti';
import { format } from 'date-fns';
import { useState } from 'react';
import * as Yup from 'yup';

export default function PopUpAddCard({ column, onClose }) {
  const dispatch = useDispatch();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const cardsSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, 'Too Short!')
      .max(25, 'Too Long!')
      .required('Required'),
    description: Yup.string()
      .min(3, 'Too Short!')
      .max(500, 'Too Long! Max symbols is 500')
      .required('Required'),
  });

  const initialValues = {
    boardId: column.boardId,
    columnId: column._id,
    title: '',
    description: '',
    color: 'B9B9B9',
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
    <div className={css.addCardModal}>
      <div className={css.modalContent}>
        <h4 className={css.title}>Add card</h4>
        <Formik
          validationSchema={cardsSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
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
              <div className={css.warning}>
                <ErrorMessage name="title" />
              </div>
              <label className={css.modalLabel} htmlFor={cardDescriptionId}>
                Description
              </label>
              <Field
                id={cardDescriptionId}
                className={css.modalInputDescription}
                as="textarea"
                name="description"
                placeholder="Description"
              />
              <div className={css.warning}>
                <ErrorMessage name="description" />
              </div>
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
                      <TiTick className={css.svgAccept} />
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
                      <TiTick className={css.svgAccept} />
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
                      <TiTick className={css.svgAccept} />
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
                      <TiTick className={css.svgAccept} />
                    </span>
                  </label>
                </div>
              </div>
              <div className={css.datePickerWrapper}>
                <p className={css.deadline}>Deadline</p>
                <p
                  className={css.deadlineDisplay}
                  onClick={() => setShowDatePicker(!showDatePicker)}
                >
                  {values.deadline
                    ? format(values.deadline, 'eeee, MMMM d')
                    : 'Select date'}
                </p>
                {showDatePicker && (
                  <div className={css.datePickerOverlay}>
                    <ReactDatePicker
                      selected={values.deadline}
                      onChange={date => {
                        setFieldValue('deadline', date);
                        setShowDatePicker(false);
                      }}
                      dateFormat="dd/MM/yyyy"
                      className={css.datePicker}
                      inline
                    />
                  </div>
                )}
              </div>

              <div className={css.btn}>
                <CardButton type="submit" btnText="Add" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
