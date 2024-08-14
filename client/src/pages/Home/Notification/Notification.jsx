import { useEffect, useState } from 'react';

import { useHeadingContext } from '../../../store/context/headingContectProvider';

import Select from "@mui/material/select"
import { MenuItem } from '@mui/material';
import FormControl from "@mui/material/FormControl"


const Notification = () => {
  const { setSiteTitle, setSubHeading, setHeading } = useHeadingContext();
  const [ value, setValue ] = useState("a")

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  useEffect(() => {
    setHeading('Ilmoitukset');
    setSiteTitle('Ilmoitukset');
    setSubHeading('Ilmoitukset');
  }, [
    setHeading,
    setSiteTitle,
    setSubHeading,
  ]);

  return (
    <div className='notifications__wrapper'>
      <h3>Suodatin</h3>

      <div className="notifications-filter">
        <Select
          sx={{ borderRadius: 0, height: "40px" }}
          value={value}
          displayEmpty
          onChange={handleChange}
          placeholder='Valitse asiakas'
          >
          <MenuItem value={"a"}>Osteri Ossi</MenuItem>
          <MenuItem value={"c"}>Nakke Nakuttaja</MenuItem>
          <MenuItem value={"d"}>Nalle Puh</MenuItem>
        </Select>
        <Select
          sx={{ borderRadius: 0, height: "40px" }}
          value={value}
          displayEmpty
          onChange={handleChange}
          placeholder='Valitse asiakas'
          >
          <MenuItem value={"a"}>Osteri Ossi</MenuItem>
          <MenuItem value={"c"}>Nakke Nakuttaja</MenuItem>
          <MenuItem value={"d"}>Nalle Puh</MenuItem>
        </Select>

      </div>

    </div>
  );
};

export default Notification;
