import s from './Calendar.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = ({ field, form, onDateSelect, ...props }) => {
  const handleChange = date => {
    form.setFieldValue(field.name, date);
    onDateSelect(); // Виклик функції закриття календаря
  };

  return (
    <div className={s.container}>
      <DatePicker
        {...field}
        {...props}
        selected={field.value}
        onChange={handleChange}
        minDate={new Date()}
        dateFormat="dd/MM/yyyy"
        inline
        calendarClassName={s.reactDatepicker} // Додаємо клас для календаря
      />
    </div>
  );
};

export default Calendar;
