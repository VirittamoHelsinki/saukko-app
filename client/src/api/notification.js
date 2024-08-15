import axios from 'axios'

const fetchAllNotifications = async () => {
  try {
    const response = await axios.get(`/api/notifications`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}


export {
  fetchAllNotifications,
}




