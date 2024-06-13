import { useDispatch } from 'react-redux';
import s from './EditColumn.module.css';
import { editColumnById } from '../../../redux/columns/operations';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';
// import { useState } from 'react';
import * as Yup from 'yup';

const ColumnsSchema = Yup.object().shape({
  title: Yup.string().min(3, 'Too Short!').max(25, 'Too Long!'),
  // .required('Required'),
});
const EditColumn = ({ column, onClose }) => {
  // const [title, setTitle] = useState(column.title);

  const dispatch = useDispatch();

  // const handleChange = e => {
  //   setTitle(e.target.value);
  // };

  const handleSubmit = (values, actions) => {
    const updatedColumn = {
      ...column,
      title: values.title,
    };
    console.log(
      'updatedColumn',
      updatedColumn._id,
      updatedColumn.boardId,
      updatedColumn.title
    );

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
      })
      .catch(error => {
        // Обробка помилок
        console.error('Error while editing column:', error);
      })
      .finally(() => {
        actions.setSubmitting(false); // Позначаємо завершення відправлення форми
      });
  };

  const columnTitleId = nanoid();

  return (
    <div className={s.addContactContainer}>
      <div className={s.modalAddColumnContainer}>
        <Formik
          validationSchema={ColumnsSchema}
          initialValues={{ title: column.title }}
          onSubmit={handleSubmit}
        >
          <Form className={s.form}>
            <label htmlFor={columnTitleId}>Title</label>
            <Field
              id={columnTitleId}
              className={s.modalInputTitle}
              type="text"
              name="title"
              placeholder="Title"
            />
            <p className={s.warning}>
              <ErrorMessage name="title" />
            </p>

            <button type="submit" className={s.btn}>
              Save
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default EditColumn;
