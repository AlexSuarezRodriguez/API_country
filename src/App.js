import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import fetchData from './utils/fetchData';
import CardComponent from './components/CardCountry';

function App() {
  const [country, setCountry] = useState([]);
  const [start, setStart] = useState(20);
  const [end, setEnd] = useState(40);
  const [countrySlice, setCountrySlice] = useState([]);
  const [hashMore, setHashMore] = useState(true);
  const [view, setView] = useState('home');
  const [favorite, setFavorite] = useState([]);

  const fetchCountrys = async () => {
    const data = await fetchData();
    setCountrySlice(data.slice(0, 20));
    return setCountry(data);
  };

  // eslint-disable-next-line consistent-return
  const handleAdd = (id) => {
    const findFav = favorite.find((element) => element.name.common === id);
    if (!findFav) {
      const favCountry = country.filter(
        (element) => element.name.common === id,
      );
      setFavorite([...favorite, ...favCountry]);
      return null;
    }
    alert(`el pais ${id} ya se encuentra en la lista de favoritos`);
  };
  const handleDelete = (id) => {
    const deleteCountry = favorite.filter(
      (element) => element.name.common !== id,
    );
    setFavorite(deleteCountry);
  };

  const fetchDataMoreCountry = () => {
    setStart((pre) => pre + 20);
    setEnd((pre) => pre + 20);
    setCountrySlice([...countrySlice, ...country.slice(start, end)]);
    if (
      country.slice(start, end).length === 0
      || country.slice(start, end) < 20
    ) {
      setHashMore(false);
    }
  };

  console.log(countrySlice);

  useEffect(() => {
    fetchCountrys();
  }, []);
  return (
    <div className="cont">
      <div className="navbar">
        <button
          type="button"
          onClick={() => setView('home')}
          className="button"
        >
          home
        </button>
        <button
          type="button"
          onClick={() => setView('favoritos')}
          className="button"
        >
          favoritos
        </button>
      </div>
      <div className="container">
        {view === 'home' ? (
          <InfiniteScroll
            className="infiniteScroll"
            dataLength={countrySlice.length} // valor inicial
            next={fetchDataMoreCountry}
            hasMore={hashMore}
            loader={<h4>Loading...</h4>}
            endMessage={(
              <p style={{ textAlign: 'center' }}>
                <b>not country for view</b>
              </p>
            )}
          >
            {countrySlice.map((element) => (
              <CardComponent
                key={`${element.name.common}`}
                id={element.name.common}
                country={element.name.common}
                image={element.flags.png}
                capital={element.capital}
                currencie={element.currencies}
                language={element.languages}
                add={handleAdd}
                delet={handleDelete}
                type
              />
            ))}
          </InfiniteScroll>
        ) : (
          <div className="infiniteScroll">
            {favorite.map((element) => (
              <CardComponent
                key={`${element.name.common}`}
                id={element.name.common}
                country={element.name.common}
                image={element.flags.png}
                capital={element.capital}
                currencie={element.currencies}
                language={element.languages}
                add={handleAdd}
                delet={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
