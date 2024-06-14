import { useDispatch } from 'react-redux';
import s from './EditColumn.module.css';
import { editColumnById } from '../../../redux/columns/operations';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import { CardButton } from '../CardButton/CardButton';

const ColumnsSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Required'),
});
const EditColumn = ({ column, onClose }) => {
  const dispatch = useDispatch();

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
        console.error('Error while editing column:', error);
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
            <p className={s.warning}>
              <ErrorMessage name="title" />
            </p>

            <CardButton type="submit" btnText="Edit" />
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default EditColumn;
