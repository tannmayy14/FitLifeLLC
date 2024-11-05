import axios from 'axios';

const SPREADSHEET_ID = '1mdxpV4Zkj-AD6x0c8Dvls_Z2-Hme1KRckIt0RUrTgW4';
const API_KEY = 'AIzaSyA8uTXbHGmVeKeFIh_Hamm_yUbV4kd9ofc';

export const fetchExercisePlan = async (sheetName) => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${sheetName}?key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    return response.data.values; // Returns the rows as a 2D array
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};