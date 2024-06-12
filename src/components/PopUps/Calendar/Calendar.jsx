import s from './Calendar.module.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Calendar = ({field, form, ...props}) => {
    const handleChange = (date) => {
        form.setFieldValue(field.name, date);
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
            />
        </div>
    )
}

export default Calendar;