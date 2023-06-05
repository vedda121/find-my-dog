import { faHeart as faRHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faSHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Dog } from '../models/models';

interface DogCardProps {
  dog: Dog;
  favorites: string[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
}

function DogCard({ dog, favorites, setFavorites }: DogCardProps) {
  const { id, age, breed, img, name, zip_code: zipCode } = dog;
  const [isFavorite, setIsFavorite] = useState<boolean>(favorites.includes(id));

  const handleFavorite = () => {
    if (isFavorite) {
      setIsFavorite(false);
      setFavorites(favorites.filter((f) => f !== id));
    } else {
      setIsFavorite(true);
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className="h-84 w-80 select-text overflow-hidden rounded shadow-lg">
      <img className="h-60 w-80 object-contain" src={img} alt="dog" />
      <div className="px-6 py-4">
        <div className="flex justify-between">
          <div className="mb-2 text-xl font-bold">{name}</div>
          <div
            // eslint-disable-next-line @typescript-eslint/no-shadow
            onClick={handleFavorite}
            className="flex cursor-pointer items-center text-lg"
          >
            {isFavorite ? (
              <FontAwesomeIcon
                values={id}
                className="text-red-400 hover:text-red-600"
                icon={faSHeart}
              />
            ) : (
              <FontAwesomeIcon values={id} icon={faRHeart} className="hover:text-red-400" />
            )}
          </div>
        </div>
        <p className="text-base text-gray-700">{breed}</p>
      </div>
      <div className="px-6 pb-2 pt-4">
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
          {age} years
        </span>
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
          zip_code {zipCode}
        </span>
      </div>
    </div>
  );
}

export default DogCard;
