import MultiRangeSlider from 'multi-range-slider-react';

interface AgeFilterProps {
  ageMin: number | null;
  ageMax: number | null;
  setAgeMax: React.Dispatch<React.SetStateAction<number | null>>;
  setAgeMin: React.Dispatch<React.SetStateAction<number | null>>;
}

function AgeFilter({ ageMax, ageMin, setAgeMax, setAgeMin }: AgeFilterProps) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-900">Set Min and Max Age</label>
      <MultiRangeSlider
        className="rounded border border-gray-300 bg-white p-5 shadow-sm"
        ruler="false"
        minValue={ageMin || 0}
        maxValue={ageMax || 25}
        min={0}
        max={25}
        step={1}
        label="false"
        barInnerColor="#300d38"
        onChange={(e) => {
          setAgeMin(e.minValue);
          setAgeMax(e.maxValue);
        }}
      />
    </div>
  );
}

export default AgeFilter;
