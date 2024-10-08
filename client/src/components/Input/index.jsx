import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton, Checkbox, FormControlLabel, Tooltip } from '@mui/material';
import dayjs from 'dayjs';

import "./index.scss";

const Input = ({ label, value, onChange, type, placeholder, required }) => {
  return (
    <div className="input">
      <label className="input__label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

const Textarea = ({ label, value, onChange, placeholder, required }) => {
  return (
    <div className="input">
      <label className="input__label">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

const DatePicker = ({ label, value, onChange }) => {
  return (
    <div className="input date-picker">
      <label className="input__label">{label}</label>
      <LocalizationProvider dateAdapter={AdapterDayjs}>

        <DesktopDatePicker
          id="--"
          value={dayjs(value)}
          onChange={onChange}
          format="DD.MM.YYYY"
          sx={{
            '.MuiInputBase-root': {
              "border": "2px solid black",
              "borderRadius": "0px",
              "input": {
                "border": "none",
                "fontSize": "16px",
              },
              padding: "0 10px 0 0",
              '& fieldset': {
                border: 'none',
              },
              '& input': {
                padding: "0 0 0 10px",
              },
            },
          }}
        />

      </LocalizationProvider>
    </div>
  );
};



export {
  Input,
  Textarea,
  DatePicker,
}