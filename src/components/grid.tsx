import { Dog, Favorites } from '../models/models';
import DogCard from './dogCard';

interface GridProps {
  dogs: Dog[];
  favorites: Favorites[];
  setFavorites: React.Dispatch<React.SetStateAction<Favorites[]>>;
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
