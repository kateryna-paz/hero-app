import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useHeroStore } from "../store/heroStore";
import Loader from "../components/Loader";
import BackButton from "../components/BackButton";
import HeroData from "../components/HeroData";
import Modal from "../components/Modal";
import toast from "react-hot-toast";

function HeroPage() {
  const { id } = useParams();
  const navigator = useNavigate();
  const { getHeroById, loading, error, currentHero, deleteHero } =
    useHeroStore();

  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteHero(id);
      setShowModal(false);
      toast.success("Hero deleted successfully!");
      navigator("/");
    } catch (e) {
      toast.error("Failed to delete hero. Please try again.");
      console.error("Error deleting hero:", e);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const goToEditPage = () => {
    navigator(`/edit/${id}`);
  };

  useEffect(() => {
    getHeroById(id);
  }, []);

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto mt-2">
        <BackButton />
        {loading ? (
          <div className="my-24 flex justify-center">
            <Loader />
          </div>
        ) : error ? (
          <p className="text-red-600 text-center mt-8">
            Error: {error.message || "Failed to load hero"}
          </p>
        ) : currentHero ? (
          <>
            <HeroData hero={currentHero} />
            <div className="flex justify-center gap-6 mt-8">
              <button
                onClick={goToEditPage}
                className="flex-2/3 bg-indigo-600 text-white text-md font-bold px-4 py-4 rounded-xl hover:bg-indigo-700 w-full mt-2 cursor-pointer"
              >
                Edit Hero Details
              </button>
              <button
                onClick={handleDeleteClick}
                className="flex-1/3 bg-red-700 text-white text-md font-bold px-4 py-4 rounded-xl hover:bg-red-800 w-full mt-2 cursor-pointer"
              >
                Delete Hero
              </button>
            </div>
          </>
        ) : (
          <p className="text-center mt-8">Hero not found</p>
        )}
      </div>
      {showModal && currentHero && (
        <Modal
          title={`Delete ${currentHero.nickname}?`}
          message="Are you sure you want to delete this hero?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </>
  );
}

export default HeroPage;
