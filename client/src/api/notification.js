import axios from 'axios';

const fetchAllNotifications = async () => {
  try {
    const response = await axios.get(`/api/notifications`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateNotificationById = async (notificationId, updatedData) => {
  try {
    const response = await axios.put(
      `/api/notification/${notificationId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const fetchUnseenNotificationCount = async () => {
  try {
    const response = await axios.get('/api/notifications/unseen-count');
    return response.data.count;
  } catch (error) {
    console.log('Error fetching unseen notifications', error);
    return 0;
  }
};

export {
  fetchAllNotifications,
  updateNotificationById,
  fetchUnseenNotificationCount,
};
