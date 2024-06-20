import { useState } from 'react';
import s from './AddColumn.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { addNewColumn } from '../../../redux/columns/operations';
import toast from 'react-hot-toast';
import { CardButton } from '../CardButton/CardButton';

const ColumnsSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Required'),
});

const AddColumn = ({ boardId, closeModal }) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (values, actions) => {
    dispatch(addNewColumn({ title: values.title, boardId: boardId }))
      .unwrap()
      .then(() => {
        toast.success('Column added successfully');
        closeModal();
        actions.resetForm();
        setErrorMessage('');
      })
      .catch(error => {
        if (error) {
          setErrorMessage(error);
        } else {
          toast.error('Error, please reload page');
        }
      });
  };

  const columnTitleId = nanoid();

  return (
    <div className={s.addModalContainer}>
      <h3 className={s.titleModal}>Add column</h3>
      <div className={s.modalAddColumnContainer}>
        <Formik
          initialValues={{
            boardId: boardId,
            title: '',
          }}
          validationSchema={ColumnsSchema}
          onSubmit={handleSubmit}
        >
          <Form className={s.form}>
            <label className={s.labelModal} htmlFor={columnTitleId}>
              Title
            </label>
            <Field
              className={s.modalInputTitle}
              type="text"
              name="title"
              id={columnTitleId}
            />
            <div className={s.warning}>
              <ErrorMessage name="title" component="div" className={s.error} />
              {errorMessage && (
                <div className={s.error}>This title already used</div>
              )}{' '}
            </div>
            <div className={s.btn}>
              <CardButton type="submit" btnText="Add column" />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddColumn;
