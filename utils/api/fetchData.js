import Toast from 'react-native-toast-message';

export const fetchDataFromCoordinates = async (latitude, longitude) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    const region = data.address.state || data.address.province || data.address.region || 'Невідомий регіон';
    const country = data.address.country || 'Невідома країна';
    return { region, country };
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Помилка',
      text2: `${error.code || error.message}`,
    });
  }
};
