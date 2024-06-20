import { useDispatch } from 'react-redux';
import s from './EditColumn.module.css';
import { editColumnById } from '../../../redux/columns/operations';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import { CardButton } from '../CardButton/CardButton';
import { useState } from 'react';

const ColumnsSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Required'),
});
const EditColumn = ({ column, onClose }) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (values, actions) => {
    const updatedColumn = {
      ...column,
      title: values.title,
    };

    dispatch(
      editColumnById({
        columnId: updatedColumn._id,
        boardId: updatedColumn.boardId,
        columnTitle: updatedColumn.title,
      })
    )
      .unwrap()
      .then(() => {
        onClose();
        toast.success('Column saved');
        setErrorMessage('');
      })
      .catch(error => {
        setErrorMessage(error);
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  const columnTitleId = nanoid();

  return (
    <div className={s.editModalContainer}>
      <h3 className={s.titleModal}>Edit column</h3>
      <div className={s.modalEditColumnContainer}>
        <Formik
          validationSchema={ColumnsSchema}
          initialValues={{ title: column.title }}
          onSubmit={handleSubmit}
        >
          <Form className={s.form}>
            <label className={s.labelModal} htmlFor={columnTitleId}>
              Title
            </label>
            <Field
              id={columnTitleId}
              className={s.modalInputTitle}
              type="text"
              name="title"
              placeholder="Title"
            />
            <div className={s.warning}>
              <ErrorMessage name="title" component="div" className={s.error} />
              {errorMessage && (
                <div className={s.error}>This title already used</div>
              )}{' '}
            </div>
            <CardButton type="submit" btnText="Edit" />
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default EditColumn;
