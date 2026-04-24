const NASA_API_KEY = 'g0yzj1ehkyCAmGmdRcQdfFZFOWTYuB1rD0bbkoRq';
const BASE_URL = 'https://api.nasa.gov/planetary/apod';

export const fetchAPODPictures = async (count = 20) => {
  try {
    const response = await fetch(`${BASE_URL}?api_key=${NASA_API_KEY}&count=${count}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const fetchAPODByDate = async (date) => {
  try {
    const response = await fetch(`${BASE_URL}?api_key=${NASA_API_KEY}&date=${date}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const fetchDateRange = async (startDate, endDate) => {
  try {
    const response = await fetch(
      `${BASE_URL}?api_key=${NASA_API_KEY}&start_date=${startDate}&end_date=${endDate}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};