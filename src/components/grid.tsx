import { Dog } from '../models/models';
import DogCard from './dogCard';

interface GridProps {
  dogs: Dog[];
  favorites: string[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
}

function Grid({ dogs, favorites, setFavorites }: GridProps) {
  return (
    <div className="grid grid-cols-1 gap-8 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {dogs.map((dog) => (
        <DogCard key={dog.id} dog={dog} favorites={favorites} setFavorites={setFavorites} />
      ))}
    </div>
  );
}

export default Grid;
