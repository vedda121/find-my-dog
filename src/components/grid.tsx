import { Dog } from '../models/models';
import DogCard from './dogCard';

interface GridProps {
  dogs: Dog[];
  favorites: string[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
}
function Grid({ dogs, favorites, setFavorites }: GridProps) {
  return (
    <div className="mt-5 flex flex-wrap gap-8">
      {dogs.map((dog) => (
        <DogCard key={dog.id} dog={dog} favorites={favorites} setFavorites={setFavorites} />
      ))}
    </div>
  );
}

export default Grid;
