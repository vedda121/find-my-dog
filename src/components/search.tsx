import axios from 'axios';
import { Pagination } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Option, SelectValue } from 'react-tailwindcss-select/dist/components/type';
import { Dog, Location } from '../models/models';
import Grid from './grid';
import MatchedDog from './matchedDog';
import Navbar from './navbar';
import SideBar from './sidebar';

interface SearchProps {
  isAuthenticated: boolean;
  handleLogout: React.MouseEventHandler<HTMLButtonElement>;
}

function Search({ isAuthenticated, handleLogout }: SearchProps) {
  const [ageMax, setAgeMax] = useState<number | null>(null);
  const [ageMin, setAgeMin] = useState<number | null>(null);
  const [breeds, setBreeds] = useState<SelectValue>([]);
  const [city, setCity] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [sort, setSort] = useState<SelectValue>({ value: 'breed:asc', label: 'Breed Ascending' });
  const [state, setState] = useState<SelectValue>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [zipCodes, setZipCodes] = useState<string[]>([]);

  const size = 12;

  const handleBreedsFilter = (value: SelectValue) => {
    setCurrentPage(0);
    setBreeds(value);
  };

  const handleCityFilter = async () => {
    setState(null);
    const { status, data } = await axios.post(
      `${process.env.REACT_APP_API_PATH}/locations/search`,
      { city },
      { withCredentials: true },
    );
    if (status === 200) {
      setZipCodes(data.results.map((d: Location) => d.zip_code));
    }
  };

  const handleStateFilter = async (value: SelectValue) => {
    setCity(null);
    setState(value);

    const { status, data } = await axios.post(
      `${process.env.REACT_APP_API_PATH}/locations/search`,
      { states: [(value as Option).value], size: 100 },
      { withCredentials: true },
    );
    if (status === 200) {
      setZipCodes(data.results.map((d: Location) => d.zip_code));
    }
  };

  const handleClearFilters = () => {
    setAgeMax(null);
    setAgeMin(null);
    setBreeds([]);
    setCity(null);
    setSort({ value: 'breed:asc', label: 'Breed Ascending' });
    setState(null);
    setZipCodes([]);
  };

  const matchDogs = async () => {
    const { status, data } = await axios.post(
      `${process.env.REACT_APP_API_PATH}/dogs/match`,
      favorites,
      {
        withCredentials: true,
      },
    );
    if (status === 200) {
      const response = await axios.post(`${process.env.REACT_APP_API_PATH}/dogs`, [data.match], {
        withCredentials: true,
      });
      setMatchedDog(response.data[0]);
      setOpenModal(true);
    }
  };

  const searchDogs = async () => {
    const { status, data } = await axios.get(
      `${process.env.REACT_APP_API_PATH}/dogs/search?size=${size}&from=${currentPage * size}`,
      {
        params: {
          breeds: (breeds as Option[])?.map(({ value }) => value),
          ageMin,
          ageMax,
          sort: (sort as Option).value,
          zipCodes,
        },
        withCredentials: true,
      },
    );
    if (status === 200) {
      setTotalPages(Math.ceil(data.total / size));
      const response = await axios.post(`${process.env.REACT_APP_API_PATH}/dogs`, data.resultIds, {
        withCredentials: true,
      });
      setDogs(response.data);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    searchDogs().catch(console.error);
  }, [currentPage, breeds, sort, zipCodes, ageMin, ageMax]);

  const sideBarComponent = (
    <SideBar
      ageMax={ageMax}
      ageMin={ageMin}
      breeds={breeds}
      city={city}
      favorites={favorites}
      handleBreedsFilter={handleBreedsFilter}
      handleCityFilter={handleCityFilter}
      handleClearFilters={handleClearFilters}
      handleStateFilter={handleStateFilter}
      matchDogs={matchDogs}
      setAgeMax={setAgeMax}
      setAgeMin={setAgeMin}
      setCity={setCity}
      setSort={setSort}
      sort={sort}
      state={state}
    />
  );

  return (
    <>
      <Navbar
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
        sideBarComponent={sideBarComponent}
      />
      <div className="flex h-[90vh] bg-[#f9f7f2]">
        <aside className="sticky top-0 hidden h-[90vh] md:block">{sideBarComponent}</aside>
        <div className="custom_scrollbar flex flex-col gap-4 overflow-y-auto p-6">
          {dogs.length === 0 ? (
            <div>No results found</div>
          ) : (
            <>
              <Grid dogs={dogs} favorites={favorites} setFavorites={setFavorites} />
              <Pagination
                className="pagination p-2 text-center"
                currentPage={currentPage + 1}
                onPageChange={(newPage: number) => setCurrentPage(newPage - 1)}
                totalPages={totalPages}
              />
            </>
          )}
        </div>

        {openModal && (
          <MatchedDog matchedDog={matchedDog} openModal={openModal} setOpenModal={setOpenModal} />
        )}
      </div>
    </>
  );
}

export default Search;
