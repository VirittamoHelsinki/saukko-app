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

export { fetchAllNotifications, updateNotificationById };
