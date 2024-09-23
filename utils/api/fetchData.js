export const fetchDataFromCoordinates = async (latitude, longitude) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    const region = data.address.state || data.address.province || data.address.region;
    const country = data.address.country;
    return { region, country };
  } catch (error) {
    console.error('Error:', error);
  }
};
