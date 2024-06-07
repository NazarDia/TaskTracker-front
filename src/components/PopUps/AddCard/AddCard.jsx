import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import s from './AddCard.module.css';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { addCard } from '../../../redux/cards/operations';

const CardSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(3, 'Too Short!')
    .max(500, 'Too Long!')
    .required('Required'),
});

const PopUpAddCard = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    dispatch(addCard({ title: values.title, description: values.description }))
      .unwrap()
      .then(() => {
        toast.success('Card saved');
      })
      .catch(() => {
        toast.error('Error, please reload page');
      });
    actions.resetForm();
  };

  const cardTitleId = nanoid();
  const cardDescriptionId = nanoid();
  return (
    <div className={s.addContactContainer}>
      <Formik
        initialValues={{
          title: '',
          description: '',
        }}
        validationSchema={CardSchema}
        onSubmit={handleSubmit}
      >
        <Form className={s.form}>
          <label htmlFor={cardTitleId}>Title</label>
          <Field type="text" name="title" id={cardTitleId}></Field>
          <p className={s.warning}>
            <ErrorMessage name="title" />
          </p>
          <label htmlFor={cardDescriptionId}>Description</label>
          <Field type="text" name="description" id={cardDescriptionId} />
          <p className={s.warning}>
            <ErrorMessage name="description" />
          </p>
          <button type="submit" className={s.btn}>
            Add contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default PopUpAddCard;
