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
  console.log('AddColumn boardId', boardId);
  const handleSubmit = (values, actions) => {
    console.log('values', values);
    dispatch(addNewColumn({ title: values.title, boardId: boardId }))
      .unwrap()
      .then(() => {
        toast.success('Column added successfully');
        closeModal();
      })
      .catch(() => {
        toast.error('Error, please reload page');
      });
    actions.resetForm();
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
            ></Field>
            <p className={s.warning}>
              <ErrorMessage name="title" />
            </p>

            <CardButton type="submit" btnText="Add column" />
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddColumn;
