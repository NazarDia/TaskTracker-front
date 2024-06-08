import s from './EditCard.module.css';
import React from 'react';
import { Formik, Form } from 'formik';
import FormInput from '../../FormInput/FormInput';
import * as Yup from 'yup';
import s from './EditCard.module.css';
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
});

const PopUpEditCard = ({ card, onClose }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(
      updateCard({
        ...card,
        title: values.title,
        description: values.description,
      })
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

  return (
    <div className={s.editContactContainer}>
      <button className={s.closeBtn} type="button">
            <svg   aria-label="close icon">
                <use href="../../../images/sprite/sprite-icon.svg#close"></use>
            </svg>
        </button>
        <h4 className={s.title}>Edit card</h4>
      <Formik
        initialValues={{
          title: card.title,
          description: card.description,
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
          <button type="submit" className={s.btn}>
            Update Card
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default PopUpEditCard;
