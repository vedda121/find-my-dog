interface SortFilterProps {
  sort: string | null;
  setSort: React.Dispatch<React.SetStateAction<string | null>>;
}

function SortFilter({ sort, setSort }: SortFilterProps) {
  return (
    <div>
      <label
        htmlFor="sort_filter"
        className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Select sort filter
      </label>
      <select
        id="sort_filter"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        value={sort || ''}
        onChange={(e) => {
          setSort(e.target.value);
        }}
      >
        <option value="breed:asc"> Breed Ascending</option>
        <option value="breed:desc">Breed Descending</option>
        <option value="age:asc">Age Ascending</option>
        <option value="age:desc">Age Descending</option>
      </select>
    </div>
  );
}

export default SortFilter;
