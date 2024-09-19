import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../store/context/authContextProvider';
import { useHeadingContext } from '../../../store/context/headingContectProvider';
import { MenuItem, Select } from '@mui/material';
import classNames from "classnames"
import NotificationModal from './NotificationModal';
import SystemMessage from '../../../components/NotificationModal/NotificationModal';
import { IconButton, FormControlLabel, Switch } from '@mui/material';
import { Icon } from '@iconify/react';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import WarningDialog from '../../../components/WarningDialog/WarningDialog';

import { fetchAllNotifications, deleteNotificationById, updateNotificationById } from '../../../api/notification';


const Notification = () => {
  const { currentUser } = useAuthContext();

  const { setSiteTitle, setSubHeading, setHeading } = useHeadingContext();
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [notificationToDelete, setNotificationToDelete] = useState(null);

  // For warning menu
  const [showWarning, setShowWarning] = useState(false);

  const handleWarningClose = () => {
    setShowWarning(false);
  };

  const handleProceed = async () => {
    setShowWarning(false);
    if (notificationToDelete) {
      try {
        await deleteNotificationById(notificationToDelete);
        setNotifications(prevNotifications => prevNotifications.filter(n => n._id !== notificationToDelete));
        setNotificationToDelete(null);
        handleNotificationModalOpenOnDelete();
      } catch (error) {
        console.error('Error deleting notification:', error);
      }
    }
  };

  const [openSuccessSystemMessageOnDelete, setOpenSuccessSystemMessageOnDelete] = useState(false)
  const [openSuccessSystemMessageOnArchive, setOpenSuccessSystemMessageOnArchive] = useState(false)
  const [openSuccessSystemMessageOnUnarchive, setOpenSuccessSystemMessageOnUnarchive] = useState(false)

  // For success notification
  const handleNotificationModalOpenOnDelete = () => {
    setOpenSuccessSystemMessageOnDelete(true);
  };
  const handleNotificationModalOpenOnArchive = () => {
    setOpenSuccessSystemMessageOnArchive(true);
  };
  const handleNotificationModalOpenOnUnarchive = () => {
    setOpenSuccessSystemMessageOnUnarchive(true);
  };
  const handleNotificationModalCloseOnDelete = () => {
    setOpenSuccessSystemMessageOnDelete(false);
  }
  const handleNotificationModalCloseOnArchive = () => {
    setOpenSuccessSystemMessageOnArchive(false);
  }
  const handleNotificationModalCloseOnUnarchive = () => {
    setOpenSuccessSystemMessageOnUnarchive(false);
  }


  //Archive
  const [showArchived, setShowArchived] = useState(false);

  const handleToggleArchived = () => {
    setShowArchived(prev => !prev);
  };



  // Fetch info for these in the future
  const [filterUser, setFilterUser] = useState("");
  const [filterType, setFilterType] = useState("all");

  const role = currentUser?.role;

  useEffect(() => {
    const fetch = async () => {
      const fetchedNotifications = await fetchAllNotifications();
      const uniqueCustomers = Array.from(new Set(fetchedNotifications.map(n => n.customer._id)))
        .map(id => fetchedNotifications.find(n => n.customer._id === id).customer);
      setCustomers(uniqueCustomers)
      setNotifications(fetchedNotifications || []);
      setFilteredNotifications(fetchedNotifications || []);
    }

    fetch();
  }, [])

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...notifications];

      if (filterType && filterType !== "all") {
        filtered = filtered.filter(notification => notification.type === filterType);
      }

      if (filterUser) {
        filtered = filtered.filter(notification => notification.customer._id === filterUser);
      }

      if (!showArchived) {
        // Show only non-archived notifications if switch is off
        filtered = filtered.filter(notification => !notification.isArchived);
        console.log('filtered:', filtered)
      } else {
        // Show only archived notifications when switch is on
        filtered = filtered.filter(notification => notification.isArchived);
        console.log('filtered:', filtered)
      }

      setFilteredNotifications(filtered);
    };

    applyFilters();
  }, [filterType, notifications, filterUser, showArchived]);

  const handleNotificationClick = async (notification) => {
    try {
      await updateNotificationById(notification._id, { isSeen: true });
      setSelectedNotification(notification);

      setNotifications(prevNotifications =>
        prevNotifications.map(n =>
          n._id === notification._id ? { ...n, isSeen: true } : n
        )
      );

    } catch (error) {
      console.error('Error updating notification:', error);
    }
  };

  const typeData = [
    { value: "ready", label: "Valmis lomake" },
    { value: "readyForReview", label: "Valmis tarkistettavaksi" },
    { value: "requestContact", label: "Yhteydenottopyyntö" },
    { value: "requiresAction", label: "Arviointi vaatii toimenpiteitä" },
    { value: "all", label: "Näytä kaikki ilmoitukset" },
  ];

  const handleFilterUserChange = (event) => {
    setFilterUser(event.target.value);
  }

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  }

  const handleRemoveNotification = (notificationId) => {
    setNotificationToDelete(notificationId);
    setShowWarning(true);
  };

  const handleArchiveNotification = async (notification) => {
    try {
      await updateNotificationById(notification._id, { isArchived: true });

      // Refetch all notifications after the update
      const updatedNotifications = await fetchAllNotifications();
      setNotifications(updatedNotifications || []);

      handleNotificationModalOpenOnArchive();
    } catch (error) {
      console.error('Error archiving notification:', error);
    }
  };

  const handleUnarchiveNotification = async (notification) => {
    try {
      await updateNotificationById(notification._id, { isArchived: false });

      // Refetch all notifications after the update
      const updatedNotifications = await fetchAllNotifications();
      setNotifications(updatedNotifications || []);

      handleNotificationModalOpenOnUnarchive();
    } catch (error) {
      console.error('Error unarchiving notification:', error);
    }
  };

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
    <>
      <SystemMessage
        type='success'
        title='Ilmoitus on poistettu'
        body='Ilmoitus on poistettu järjestelmästä onnistuneesti.'
        open={openSuccessSystemMessageOnDelete}
        handleClose={handleNotificationModalCloseOnDelete}
      />
      <SystemMessage
        type='success'
        title='Ilmoitus on arkistoitu'
        body='Ilmoitus on arkistoitu onnistuneesti.'
        open={openSuccessSystemMessageOnArchive}
        handleClose={handleNotificationModalCloseOnArchive}
      />
      <SystemMessage
        type='success'
        title='Ilmoitus ei ole enää arkistoitu'
        body='Ilmoitus on palautettu onnistuneesti.'
        open={openSuccessSystemMessageOnUnarchive}
        handleClose={handleNotificationModalCloseOnUnarchive}
      />

      <NotificationModal
        isOpen={!!selectedNotification}
        notification={selectedNotification}
        onClose={() => setSelectedNotification(null)}
      />
      <WarningDialog
        title={'Haluatko varmasti poistaa ilmoituksen?'}
        bodyText={'Ilmoitus poistetaan järjestelmästä pysyvästi.'}
        buttonText={'Poista ilmoitus'}
        showWarning={showWarning}
        handleWarningClose={handleWarningClose}
        handleProceed={handleProceed}
      />
      <div className='notifications__wrapper'>
        <h3>Suodatin</h3>

        <div className="notifications-filter">
          {
            role !== "customer" && (
              <Select
                sx={{ borderRadius: 0, height: "40px" }}
                value={filterUser}
                displayEmpty
                onChange={handleFilterUserChange}
                renderValue={(value) => {
                  if (!value) {
                    return <p className="placeholder">Valitse asiakas</p>;
                  }

                  const user = customers.find(user => user._id === value);
                  return user ? `${user.firstName} ${user.lastName}` : 'Näytä kaikki asiakkaat';
                }}
              >
                <MenuItem value="">
                  Näytä kaikki asiakkaat
                </MenuItem>
                {
                  customers.map((user) => (
                    <MenuItem key={user._id} value={user._id}>{user.firstName} {user.lastName}</MenuItem>
                  ))
                }
              </Select>
            )
          }
          <Select
            sx={{ borderRadius: 0, height: "40px" }}
            value={filterType}
            displayEmpty
            onChange={handleFilterTypeChange}
            renderValue={(value) => {
              if (!value) {
                return <p className="placeholder">Valitse ilmoitus</p>
              }

              const type = typeData.find(type => type.value === value);
              return type?.label;
            }}
          >
            {
              typeData.map((type) => (
                <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
              ))
            }
          </Select>

        </div>

        <h3>Ilmoitukset</h3>

        <FormControlLabel
          control={<Switch checked={showArchived} onChange={handleToggleArchived} />}
          label="Näytä vain arkistoidut ilmoitukset"
        />

        <div className="notification-list">
          {
            filteredNotifications
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((notification) => {

                const noficationClasses = classNames(
                  "notification",
                  { [role]: true },
                  { clicked: notification.isSeen }
                )

                const customerName = `${notification.customer?.firstName} ${notification.customer?.lastName}`

                return (
                  <div
                    className={noficationClasses}
                    key={notification._id}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="notification__accent"></div>
                    <div className="notification__body">
                      <div className="notification__content">
                        <h3 className="notification__title">{notification.title}</h3>
                        <p className="notification__recipient">Asiakas: {customerName}</p>
                      </div>

                      {!notification.isSeen && (
                        <div className="notification__badge">
                          <span>uusi</span>
                        </div>
                      )}

                      {notification.isSeen && (
                        <div className="remove__content">
                          {showArchived ?
                            (<IconButton
                              edge="end"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent card click
                                handleUnarchiveNotification(notification);
                              }}
                              sx={{ backgroundColor: 'white' }}
                            >
                              <UnarchiveIcon />
                            </IconButton>




                            ) :
                            (<IconButton
                              edge="end"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent card click
                                handleArchiveNotification(notification);
                              }}
                              sx={{ backgroundColor: 'white' }}
                            >
                              <ArchiveIcon />
                            </IconButton>)}

                          {showArchived && <IconButton
                            edge="end"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent card click
                              handleRemoveNotification(notification._id);
                            }}
                            sx={{ backgroundColor: 'white' }}
                          >
                            <Icon
                              icon="material-symbols:delete-outline"
                              color="#B01038"
                            />
                          </IconButton>}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
          }
        </div>

      </div>
    </>
  );
};

export default Notification;
