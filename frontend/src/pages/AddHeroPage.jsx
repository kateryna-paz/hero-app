import HeroForm from "../components/HeroForm";
import { useNavigate } from "react-router-dom";
import { useHeroStore } from "../store/heroStore";
import BackButton from "../components/BackButton";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

function AddHeroPage() {
  const navigate = useNavigate();

  const { addHero, loading, error } = useHeroStore();

  const handleSubmit = async (newHero) => {
    const formData = new FormData();
    formData.append("nickname", newHero.nickname);
    formData.append("real_name", newHero.real_name);
    formData.append("origin_description", newHero.origin_description);
    formData.append("superpowers", newHero.superpowers);
    formData.append("catch_phrase", newHero.catch_phrase);

    newHero.images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await addHero(formData);
      toast.success("Hero added successfully!");
      navigate("/");
    } catch (e) {
      toast.error("Failed to add hero. Please try again.");
      console.error("Error adding hero:", e);
    }
  };

  if (loading)
    return (
      <div className="p-6 max-w-6xl mx-auto w-2xl my-24 flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <BackButton />
      <h1 className="text-2xl font-bold mb-8 text-center">Add New Hero</h1>
      <HeroForm onSubmit={handleSubmit} />
      {error && (
        <p className="text-red-600 text-center mt-4">
          Error: {error.message || "Something went wrong"}
        </p>
      )}
    </div>
  );
}

export default AddHeroPage;
