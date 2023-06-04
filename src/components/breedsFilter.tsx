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
      .get('https://frontend-take-home-service.fetch.com/dogs/breeds', {
        withCredentials: true,
      })
      .then(({ data }) => {
        setOptions(data.map((d: any) => ({ label: d, value: d })));
      });
  }, []);

  return (
    <>
      <label className="mb-2 block text-sm font-medium text-gray-900">
        Select breeds to filter
      </label>
      <Select
        primaryColor=""
        isMultiple
        isSearchable
        value={breeds}
        onChange={handleBreedsFilter}
        options={options}
      />
    </>
  );
}

export default BreedsFilter;
