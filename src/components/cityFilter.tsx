interface CityFilterProps {
  city: string | null;
  handleCityFilter: React.MouseEventHandler<HTMLButtonElement>;
  setCity: React.Dispatch<React.SetStateAction<string | null>>;
}

function CityFilter({ city, handleCityFilter, setCity }: CityFilterProps) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-900">Enter city</label>
      <div className="relative w-full">
        <input
          type="text"
          id="city_filter"
          className="z-20 block w-full rounded border border-gray-300 bg-white p-2.5 text-sm text-gray-500 shadow-sm duration-300 hover:border-gray-400 focus:outline-none focus:ring focus:ring-[#69516d]"
          value={city || ''}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          type="submit"
          disabled={!city}
          className="absolute right-0 top-0 rounded-r border bg-[#300d38] p-2.5 text-sm font-medium text-white hover:bg-[#890075] focus:outline-none focus:ring-4 focus:ring-[#69516d] disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handleCityFilter}
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default CityFilter;
