import { Sidebar } from 'flowbite-react';
import { SelectValue } from 'react-tailwindcss-select/dist/components/type';
import AgeFilter from './ageFilter';
import BreedsFilter from './breedsFilter';
import CityFilter from './cityFilter';
import SortFilter from './sortFilter';
import StateFilter from './stateFilter';

interface SideBarProps {
  ageMin: number | null;
  ageMax: number | null;
  breeds: SelectValue;
  city: string | null;
  favorites: string[];
  handleBreedsFilter: (value: SelectValue) => void;
  handleCityFilter: React.MouseEventHandler<HTMLButtonElement>;
  handleClearFilters: React.MouseEventHandler<HTMLButtonElement>;
  handleStateFilter: (value: SelectValue) => void;
  matchDogs: () => Promise<void>;
  setAgeMax: React.Dispatch<React.SetStateAction<number | null>>;
  setAgeMin: React.Dispatch<React.SetStateAction<number | null>>;
  setCity: React.Dispatch<React.SetStateAction<string | null>>;
  setSort: React.Dispatch<React.SetStateAction<SelectValue>>;
  sort: SelectValue;
  state: SelectValue;
}

function SideBar({
  ageMax,
  ageMin,
  breeds,
  city,
  favorites,
  handleBreedsFilter,
  handleCityFilter,
  handleClearFilters,
  handleStateFilter,
  matchDogs,
  setAgeMax,
  setAgeMin,
  setCity,
  setSort,
  sort,
  state,
}: SideBarProps) {
  return (
    <Sidebar className="!custom_scrollbar side_bg w-72">
      <div className="flex flex-col justify-between ">
        <div id="side_bar" className="flex flex-col gap-4 p-2">
          <SortFilter sort={sort} setSort={setSort} />
          <BreedsFilter breeds={breeds} handleBreedsFilter={handleBreedsFilter} />
          <StateFilter handleStateFilter={handleStateFilter} state={state} />
          <CityFilter city={city} handleCityFilter={handleCityFilter} setCity={setCity} />
          <AgeFilter ageMax={ageMax} ageMin={ageMin} setAgeMax={setAgeMax} setAgeMin={setAgeMin} />
          <div className="mt-[-10px] flex justify-between text-sm font-medium text-gray-900">
            <div>Min Age: {ageMin || 0}</div>
            <div>Max Age: {ageMax || 25}</div>
          </div>
        </div>
        <button
          type="button"
          className="mt-5 rounded-md bg-[#300d38] px-4 py-2 font-bold text-white hover:bg-[#890075]"
          onClick={handleClearFilters}
        >
          Clear Filter
        </button>

        <button
          disabled={favorites.length === 0}
          type="button"
          onClick={matchDogs}
          className="mt-5 rounded-md bg-[#300d38] px-4 py-2 font-bold text-white hover:bg-[#890075]  "
        >
          Find me my dog!
        </button>
      </div>
    </Sidebar>
  );
}

export default SideBar;
