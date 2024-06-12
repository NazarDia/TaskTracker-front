import s from './EditCard.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Calendar from '../Calendar/Calendar';
import FormInput from '../../FormInput/FormInput';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { updateCard } from '../../../redux/cards/operations';

const CardSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(3, 'Too Short!')
    .max(500, 'Too Long!')
    .required('Required'),
  color: Yup.string().required('Required'),
  deadline: Yup.date().required('Required').min(new Date(), "Deadline must be in the future"),
});

const EditCard = ({ card, onClose }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(updateCard({ id: card._id, ...values }))
      .unwrap()
      .then(() => {
        toast.success('Card updated');
        onClose();
      })
      .catch(() => {
        toast.error('Error, please reload page');
      });
    actions.resetForm();
  };

  const cardTitleId = nanoid();
  const cardDescriptionId = nanoid();

  return (
    <Formik
      initialValues={{
        title: card.title,
        description: card.description,
        color: card.color,
        deadline: card.deadline ? new Date(card.deadline) : new Date(),
      }}
      validationSchema={CardSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form className={s.form}>
           <h3 className={s.title}>Edit card</h3>
          <FormInput
            id={cardTitleId}
            type="text"
            name="title"
            placeholder="Title"
          />
          <FormInput
            id={cardDescriptionId}
            type="text"
            name="description"
            placeholder="Description"
          />
          <div className={s.colorContainer}>
            <label>Label color</label>
            <div role="group" aria-labelledby="priority-radio-group">
              <label>
                <Field
                  type="radio"
                  name="color"
                  value="var(--label-color-green)"
                  checked={values.color === 'var(--label-color-green)'}
                  onChange={() => setFieldValue('color', 'var(--label-color-green)')}
                />
                High
              </label>
              <label>
                <Field
                  type="radio"
                  name="color"
                  value="var(--label-color-pink)"
                  checked={values.color === 'var(--label-color-pink)'}
                  onChange={() => setFieldValue('color', 'var(--label-color-pink)')}
                />
                Medium
              </label>
              <label>
                <Field
                  type="radio"
                  name="color"
                  value="var(--label-color-blue)"
                  checked={values.color === 'var(--label-color-blue)'}
                  onChange={() => setFieldValue('color', 'var(--label-color-blue)')}
                />
                Low
              </label>
              <label>
                <Field
                  type="radio"
                  name="color"
                  value="var(--label-color-grey)"
                  checked={values.color === 'var(--label-color-grey)'}
                  onChange={() => setFieldValue('color', 'var(--label-color-grey)')}
                />
                None
              </label>
            </div>
            <ErrorMessage name="color" component="div" className={s.error} />
          </div>
          <div className={s.deadlineContainer}>
            <label>Deadline</label>
            <Field name="deadline" component={Calendar} />
            <ErrorMessage name="deadline" component="div" className={s.error} />
          </div>
          <button type="submit" className={s.btn}>
            Edit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EditCard;
