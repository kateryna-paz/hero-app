import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

function HeroCard({ hero, onDelete }) {
  const image = hero?.image || "/images/spy.png";

  const onDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(hero);
  };

  return (
    <>
      <Link
        to={`/hero/${hero.id}`}
        className="block border-2 rounded-xl shadow p-2 px-4 mb-4 transition duration-300 hover:bg-emerald-100"
      >
        <div className="flex items-center gap-8">
          <img
            src={image}
            alt={hero.nickname}
            className="w-24 h-24 object-cover rounded"
          />
          <div className="flex flex-row justify-between w-full items-center">
            <h2 className="text-xl font-semibold text-gray-600">
              {hero.nickname}
            </h2>
            <MdDelete
              onClick={onDeleteClick}
              className="text-3xl text-red-700 hover:text-red-900 cursor-pointer"
              title="Delete"
            />
          </div>
        </div>
      </Link>
    </>
  );
}

export default HeroCard;
