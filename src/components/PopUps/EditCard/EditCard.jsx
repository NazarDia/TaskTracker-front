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
    priority: Yup.string().required('Required'),
    deadline: Yup.date().required('Required').min(new Date(), 'Deadline cannot be in the past'),

});

const EditCard = ({ card, open,  onClose }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(
      updateCard(({ id: card.id, ...values }))
    )
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
  const cardPriorityId = nanoid();

  return (
    <div className={open ? s.modalOpen : s.modalClosed}>
      <div className={s.modalContent}>
      <button className={s.closeBtn} type="button" onClick={onClose}>
            <svg   aria-label="close icon">
                <use href="../../../images/sprite/sprite-icon.svg#close"></use>
            </svg>
        </button>
        <h3 className={s.title}>Edit card</h3>
      <Formik
        initialValues={{
          title: card.title,
          description: card.description,
          priority: card.priority,
          deadline: card.deadline ? new Date(card.deadline) : new Date(),
        }}
        validationSchema={CardSchema}
        onSubmit={handleSubmit}
      >
        <Form className={s.form}>
          <FormInput
            id={cardTitleId}
            type="text"
            name="title"
            placeholder="Title"
          ></FormInput>
          <FormInput
            id={cardDescriptionId}
            type="text"
            name="description"
            placeholder="Description"
          ></FormInput>
          <div className={s.priorityContainer}>
              <label htmlFor={cardPriorityId}>Label</label>
              <div role="group" aria-labelledby="my-radio-group">
                <label className={s.high}>
                  <Field type="radio" name="priority" value="high" />
                </label>
                <label className={s.medium}>
                  <Field type="radio" name="priority" value="medium" />
                </label>
                <label className={s.low}>
                  <Field type="radio" name="priority" value="low" />
                </label>
                <label className={s.none}>
                  <Field type="radio" name="priority" value="none" />
                </label>
              </div>
              <p className={s.error}>
                <ErrorMessage name="priority"  />
              </p>
            </div>
            <div className={s.deadlineContainer}>
              <label>Deadline</label>
              <Field name="deadline" component={Calendar} />
              <p className={s.error}>
                <ErrorMessage name="deadline"/>
              </p>
            </div>
          <button type="submit" className={s.btn}>
            Edit
          </button>
        </Form>
      </Formik>
      </div>
    </div>
  );
};

export default EditCard;