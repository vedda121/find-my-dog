import { Dog } from '../models/models';
import DogCard from './dogCard';

interface MatchedDogProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  matchedDog: Dog | null;
}

function MatchedDog({ openModal, setOpenModal, matchedDog }: MatchedDogProps) {
  return (
    <div
      id="matched_dog_modal"
      aria-hidden="true"
      className={`fixed left-0 right-0 top-0 z-50 ${
        !openModal && 'hidden'
      } flex h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50 p-4 md:inset-0`}
    >
      <div className="relative max-h-full w-full max-w-2xl">
        <div className="relative rounded-lg bg-white shadow">
          <div className="flex items-start justify-between rounded-t border-b p-4">
            <h3 className="ml-[20px] w-full text-center text-xl font-semibold text-gray-900">
              THE DOG WE THINK YOU DESERVE
            </h3>
            <button
              type="button"
              className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
              data-modal-hide="matched_dog_modal"
              onClick={() => setOpenModal(false)}
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="m-auto w-80 space-y-6 p-6">
            <DogCard dog={matchedDog as Dog} favorites={[]} setFavorites={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchedDog;
