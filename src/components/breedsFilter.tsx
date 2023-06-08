import axios from 'axios';
import { useEffect, useState } from 'react';
import Select from 'react-tailwindcss-select';
import { Options, SelectValue } from 'react-tailwindcss-select/dist/components/type';

interface BreedsFilterProps {
  breeds: SelectValue;
  handleBreedsFilter: (value: SelectValue) => void;
}

function BreedsFilter({ breeds, handleBreedsFilter }: BreedsFilterProps) {
  const [options, setOptions] = useState<Options>([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_PATH}/dogs/breeds`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        setOptions(data.map((d: any) => ({ label: d, value: d })));
      });
  }, []);

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-900">Select breeds</label>
      <Select
        isMultiple
        isSearchable
        onChange={handleBreedsFilter}
        options={options}
        placeholder=""
        primaryColor=""
        value={breeds}
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

export default BreedsFilter;
