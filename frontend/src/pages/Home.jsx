import { useEffect, useState } from "react";
import HeroCard from "../components/HeroCard";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import { useHeroStore } from "../store/heroStore";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Pagination from "../components/Pagination";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 5;

function Home() {
  const { heroes, fetchHeroes, deleteHero, loading, error } = useHeroStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedHero, setSelectedHero] = useState(null);

  useEffect(() => {
    fetchHeroes();
  }, []);

  const totalPages = Math.ceil(heroes.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentHeroes = heroes.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handleDeleteClick = (hero) => {
    setSelectedHero(hero);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      if (selectedHero) {
        await deleteHero(selectedHero.id);
        setShowModal(false);
        setSelectedHero(null);
        toast.success("Hero deleted successfully!");
      }
    } catch (e) {
      toast.error("Failed to delete hero. Please try again.");
      console.error("Error deleting hero:", e);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectedHero(null);
  };

  if (loading)
    return (
      <div className="p-6 max-w-6xl mx-auto w-2xl my-24 flex items-center justify-center">
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="p-6 max-w-6xl mx-auto w-2xl my-24 flex items-center justify-center">
        <Error error={error} />
      </div>
    );

  return (
    <>
      <div className="p-6 max-w-6xl mx-auto w-2xl">
        <div className="flex items-center mb-14 justify-between">
          <h1 className="text-3xl font-bold">List of Superheroes</h1>
          <Link
            to="/add"
            className="inline-block font-bold bg-green-600 text-white px-4 py-2 rounded duration-300 hover:bg-green-700"
          >
            + Add Hero
          </Link>
        </div>

        {currentHeroes &&
          currentHeroes.length > 0 &&
          currentHeroes.map((hero) => (
            <HeroCard key={hero.id} hero={hero} onDelete={handleDeleteClick} />
          ))}

        {currentHeroes && currentHeroes.length === 0 && (
          <p className="text-lg font-semibold text-gray-600">
            No superheroes found.
          </p>
        )}

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      {showModal && selectedHero && (
        <Modal
          title={`Delete ${selectedHero.nickname}?`}
          message="Are you sure you want to delete this hero?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </>
  );
}

export default Home;
