import { useDispatch } from 'react-redux';
import { addCard } from '../../../redux/cards/operations';
import toast from 'react-hot-toast';
import { nanoid } from 'nanoid';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';
import css from './AddCard.module.css';
import { CardButton } from '../CardButton/CardButton';
import { TiTick } from 'react-icons/ti';
import { format } from 'date-fns';
import { useState, useEffect, useRef } from 'react';
import * as Yup from 'yup';
import Calendar from '../Calendar/Calendar';
import { SlArrowDown } from 'react-icons/sl';

export default function PopUpAddCard({ column, onClose }) {
  const dispatch = useDispatch();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
      }
    };

    if (showDatePicker) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDatePicker]);

  const cardsSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, 'Too Short!')
      .max(25, 'Too Long!')
      .required('Required'),
    description: Yup.string()
      .min(3, 'Too Short!')
      .max(500, 'Too Long! Max symbols is 500')
      .required('Required'),
    deadline: Yup.date()
      .required('Please choose deadline date')
      .test(
        'is-future-date',
        'Deadline must be in the future or today',
        value => {
          const today = new Date();
          // today.setHours(0, 0, 0, 0);
          return value >= today;
        }
      ),
  });

  const initialValues = {
    boardId: column.boardId,
    columnId: column._id,
    title: '',
    description: '',
    label: 'without priority',
    deadline: '',
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

  const formatDate = deadline => {
    const formattedDate = format(new Date(deadline), 'MMMM d');
    const todayFormattedDate = format(new Date(), 'MMMM d');

    return formattedDate === todayFormattedDate
      ? `Today, ${formattedDate}`
      : format(new Date(deadline), 'eeee, MMMM d');
  };

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
              <div className={css.priorityContainer}>
                <div>
                  <p className={css.labelColor}>Label color</p>
                  <div className={css.customRadios}>
                    <div className={css.someColor}>
                      <Field
                        className={css.colorInput}
                        type="radio"
                        id="color1"
                        name="label"
                        value="low"
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
                        name="label"
                        value="medium"
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
                        name="label"
                        value="high"
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
                        name="label"
                        value="without priority"
                      />
                      <label htmlFor="color-4">
                        <span className={css.color4}>
                          <TiTick className={css.svgAccept} />
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className={css.priorityContainerText}>

                  <p>Tasks priority:</p>
                  <p className={css.priorityValue}>{values.label}</p>

                </div>
              </div>
              <div className={css.datePickerWrapper}>
                <p className={css.deadline}>Deadline</p>
                <div
                  className={css.deadlineDisplay}
                  onClick={() => setShowDatePicker(!showDatePicker)}
                >
                  {!values.deadline ? (
                    <>
                      Select date
                      <span className={css.downIcon}>
                        <SlArrowDown />
                      </span>
                    </>
                  ) : (
                    <>
                      {formatDate(values.deadline)}
                      <span className={css.downIcon}>
                        <SlArrowDown />
                      </span>
                    </>
                  )}
                </div>
                {showDatePicker && (
                  <div ref={datePickerRef} className={css.datePickerOverlay}>
                    <Field
                      component={Calendar}
                      name="deadline"
                      selected={values.deadline}
                      onChange={date => {
                        setFieldValue('deadline', date);
                        setShowDatePicker(false);
                      }}
                      onDateSelect={() => setShowDatePicker(false)}
                    />
                  </div>
                )}

                <p className={css.warningDate}>
                  <ErrorMessage name="deadline" />
                </p>
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
