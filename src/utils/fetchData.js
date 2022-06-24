const fetchData = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export default fetchData;
