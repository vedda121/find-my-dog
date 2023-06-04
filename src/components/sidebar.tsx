import { Sidebar } from 'flowbite-react';
import { SelectValue } from 'react-tailwindcss-select/dist/components/type';
import BreedsFilter from './breedsFilter';
import SortFilter from './sortFilter';

interface SideBarProps {
  breeds: SelectValue;
  handleBreedsFilter: (value: SelectValue) => void;
  sort: string | null;
  setSort: React.Dispatch<React.SetStateAction<string | null>>;
}

function SideBar({ breeds, handleBreedsFilter, sort, setSort }: SideBarProps) {
  return (
    <div>
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" className="sticky">
              <BreedsFilter breeds={breeds} handleBreedsFilter={handleBreedsFilter} />
            </Sidebar.Item>
            <Sidebar.Item href="#" className="sticky mt-2">
              <SortFilter sort={sort} setSort={setSort} />
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}

export default SideBar;
