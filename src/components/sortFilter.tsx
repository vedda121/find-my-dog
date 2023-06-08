import Select from 'react-tailwindcss-select';
import { SelectValue } from 'react-tailwindcss-select/dist/components/type';

interface SortFilterProps {
  sort: SelectValue;
  setSort: React.Dispatch<React.SetStateAction<SelectValue>>;
}

function SortFilter({ sort, setSort }: SortFilterProps) {
  const options = [
    { value: 'breed:asc', label: 'Breed Ascending' },
    { value: 'breed:desc', label: 'Breed Descending' },
    { value: 'age:asc', label: 'Age Ascending' },
    { value: 'age:desc', label: 'Age Descending' },
  ];

  return (
    <div>
      <label className="mb-1 block !transform-none text-sm font-medium text-gray-900">
        Sort results by
      </label>
      <Select
        onChange={(value) => setSort(value)}
        options={options}
        value={sort}
        primaryColor=""
        // eslint-disable-next-line react/no-unstable-nested-components
        formatOptionLabel={(data) => (
          <li
            className={`block cursor-pointer select-none truncate rounded px-2 py-2 transition duration-200 ${
              !data.isSelected
                ? `bg-white text-[#300d38] hover:bg-[#69516d] hover:text-white`
                : `opacity-85 bg-[#300d38] text-white`
            }`}
          >
            {data.label}
          </li>
        )}
        classNames={{
          menuButton: () =>
            'flex text-sm text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none bg-white hover:border-gray-400 focus:ring focus:ring-[#69516d]',
          menu: 'absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm',
        }}
      />
    </div>
  );
}

export default SortFilter;
