import s from './Calendar.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = ({ field, form, onDateSelect, ...props }) => {
  const handleChange = date => {
    form.setFieldValue(field.name, date);
    onDateSelect();
  };

  return (
    <div className={s.container}>
      <DatePicker
        {...field}
        {...props}
        selected={field.value}
        onChange={handleChange}
        minDate={new Date()}
        placeholderText="Select a date"
        dateFormat="dd/MM/yyyy"
        inline
        calendarClassName={s.reactDatepicker}
      />
    </div>
  );
};

export default Calendar;
