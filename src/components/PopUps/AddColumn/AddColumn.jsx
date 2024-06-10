import s from './AddColumn.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { addNewColumn } from '../../../redux/columns/operations';
import toast from 'react-hot-toast';

const ColumnsSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Required'),
});

const AddColumn = ({ boardId = '6660bea58deb72fa3d250e18' }) => {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    console.log('values', values);
    dispatch(addNewColumn({ title: values.title, boardId: boardId }))
      .unwrap()
      .then(() => {
        toast.success('Column added successfully');
      })
      .catch(() => {
        toast.error('Error, please reload page');
      });
    actions.resetForm();
  };

  const columnTitleId = nanoid();

  return (
    <div className={s.addContactContainer}>
      <div className={s.modalAddColumnContainer}>
        <Formik
          initialValues={{
            boardId: '',
            title: '',
          }}
          validationSchema={ColumnsSchema}
          onSubmit={handleSubmit}
        >
          <Form className={s.form}>
            <label htmlFor={columnTitleId}>Title</label>
            <Field type="text" name="title" id={columnTitleId}></Field>
            <p className={s.warning}>
              <ErrorMessage name="title" />
            </p>

            <button type="submit" className={s.btn}>
              Add column
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddColumn;
