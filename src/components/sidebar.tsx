import { Sidebar } from 'flowbite-react';
import { SelectValue } from 'react-tailwindcss-select/dist/components/type';
import BreedsFilter from './breedsFilter';
import SortFilter from './sortFilter';

interface SideBarProps {
  breeds: SelectValue;
  handleBreedsFilter: (value: SelectValue) => void;
  sort: string | null;
  setSort: React.Dispatch<React.SetStateAction<string | null>>;
  matchDogs: () => Promise<void>;
  favorites: string[];
}

function SideBar({
  breeds,
  handleBreedsFilter,
  sort,
  setSort,
  matchDogs,
  favorites,
}: SideBarProps) {
  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-4 p-2">
          <BreedsFilter breeds={breeds} handleBreedsFilter={handleBreedsFilter} />
          <SortFilter sort={sort} setSort={setSort} />
        </div>
        <div className="mt-10 p-2">
          <button
            disabled={favorites.length === 0}
            type="button"
            onClick={matchDogs}
            className="rounded border border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Find me my dog!
          </button>
        </div>
      </div>
    </Sidebar>
  );
}

export default SideBar;
