import { useEffect, useState } from 'react';
import { useHeadingContext } from '../../../store/context/headingContectProvider';
import { MenuItem, Select } from '@mui/material';

const Notification = () => {
  const { setSiteTitle, setSubHeading, setHeading } = useHeadingContext();

  // Fetch info for these in the future
  const [ filterUser, setFilterUser ] = useState(null);
  const [ filterType, setFilterType ] = useState(null);

  const userMockData = [
    {
      _id: 1,
      name: "Motsarella",
      surname: "Pitsa",
    },
    {
      _id: 2,
      name: "Expresso",
      surname: "Joninen",
    },
    {
      _id: 3,
      name: "Oswald",
      surname: "Niinistö",
    }
  ]

  const typeMockData = [
    "Syntymäpäivä",
    "Kuolinilmoitus",
    "Uusi suoritus",
  ];

  const handleFilterUserChange = (event) => {
    setFilterUser(event.target.value);
  }

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
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
          value={filterUser}
          displayEmpty
          onChange={handleFilterUserChange}
          renderValue={(user) => {
            if (!user) {
              return <p className="placeholder">Valitse asiakas</p>
            }

            return `${user.name} ${user.surname}`
          }}
        >
          {
            userMockData.map((user) => (
              <MenuItem key={user._id} value={user}>{user.name} {user.surname}</MenuItem>
            ))
          }
        </Select>
        <Select
          sx={{ borderRadius: 0, height: "40px" }}
          value={filterType}
          displayEmpty
          onChange={handleFilterTypeChange}
          renderValue={(value) => {
            if (!value) {
              return <p className="placeholder">Valitse ilmoitus</p>
            }

            return value
          }}
        >
          {
            typeMockData.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))
          }
        </Select>

      </div>

    </div>
  );
};

export default Notification;
