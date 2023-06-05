import axios from 'axios';
import { Modal, Pagination } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Option, SelectValue } from 'react-tailwindcss-select/dist/components/type';
import { Dog } from '../models/models';
import Grid from './grid';
import SideBar from './sidebar';

function Search() {
  const [selectedBreeds, setSelectedBreeds] = useState<SelectValue>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [ageMin, setAgeMin] = useState<number | null>(null);
  const [ageMax, setAgeMax] = useState<number | null>(null);
  const [sort, setSort] = useState<string | null>('breed:asc');
  const [totalPages, setTotalPages] = useState<number>(0);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const size = 9;
  const matchDogs = async () => {
    const { status, data } = await axios.post(
      'https://frontend-take-home-service.fetch.com/dogs/match',
      favorites,
      {
        withCredentials: true,
      },
    );
    if (status === 200) {
      const response = await axios.post(
        'https://frontend-take-home-service.fetch.com/dogs',
        [data.match],
        {
          withCredentials: true,
        },
      );
      setMatchedDog(response.data[0]);
    }
    setOpenModal(true);
  };

  const searchDogs = async () => {
    const { status, data } = await axios.get(
      `https://frontend-take-home-service.fetch.com/dogs/search?size=${size}&from=${
        currentPage * size
      }`,
      {
        params: {
          breeds: (selectedBreeds as Option[])?.map(({ value }) => value),
          ageMin,
          ageMax,
          sort,
        },
        withCredentials: true,
      },
    );
    if (status === 200) {
      setTotalPages(Math.ceil(data.total / size));
      const response = await axios.post(
        'https://frontend-take-home-service.fetch.com/dogs',
        data.resultIds,
        {
          withCredentials: true,
        },
      );
      setDogs(response.data);
    }
  };

  const handleBreedsFilter = (value: SelectValue) => {
    setCurrentPage(0);
    setSelectedBreeds(value);
  };

  useEffect(() => {
    searchDogs().catch(console.error);
  }, [currentPage, selectedBreeds, sort]);

  return (
    <div className="flex">
      <aside className="sticky top-0 h-screen">
        <SideBar
          breeds={selectedBreeds}
          handleBreedsFilter={handleBreedsFilter}
          sort={sort}
          setSort={setSort}
          matchDogs={matchDogs}
          favorites={favorites}
        />
      </aside>
      <div className="flex flex-col">
        <Grid dogs={dogs} favorites={favorites} setFavorites={setFavorites} />
        <Pagination
          className="p-2 text-center"
          currentPage={currentPage + 1}
          onPageChange={(newPage: number) => setCurrentPage(newPage - 1)}
          totalPages={totalPages}
        />
      </div>
      {openModal && (
        <Modal onClose={() => setOpenModal(false)} show>
          <Modal.Header>THE DOG WE THINK YOU DESERVE</Modal.Header>
          <Modal.Body>
            <div className="h-84 w-80 select-text overflow-hidden rounded shadow-lg">
              <img className="h-60 w-80 object-contain" src={matchedDog?.img} alt="dog" />
              <div className="px-6 py-4">
                <div className="flex justify-between">
                  <div className="mb-2 text-xl font-bold">{matchedDog?.name}</div>
                </div>
                <p className="text-base text-gray-700">{matchedDog?.breed}</p>
              </div>
              <div className="px-6 pb-2 pt-4">
                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                  {matchedDog?.age} years
                </span>
                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                  zip_code {matchedDog?.zip_code}
                </span>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default Search;
