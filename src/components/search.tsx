import axios from 'axios';
import { Pagination } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Option, SelectValue } from 'react-tailwindcss-select/dist/components/type';
import { Dog, Favorites } from '../models/models';
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
  const [favorites, setFavorites] = useState<Favorites[]>([]);

  const size = 9;

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
        />
      </aside>
      <div className="flex flex-col">
        <Grid dogs={dogs} favorites={favorites} setFavorites={setFavorites} />
        <Pagination
          className="text-center"
          currentPage={currentPage + 1}
          onPageChange={(newPage: number) => setCurrentPage(newPage - 1)}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}

export default Search;
