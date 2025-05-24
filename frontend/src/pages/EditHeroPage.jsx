import { useNavigate, useParams } from "react-router-dom";
import HeroForm from "../components/HeroForm";
import { useHeroStore } from "../store/heroStore";
import BackButton from "../components/BackButton";
import { useEffect } from "react";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

function EditHeroPage() {
  const { id } = useParams();
  const navigator = useNavigate();
  const { getHeroById, loading, error, currentHero, updateHero } =
    useHeroStore();

  useEffect(() => {
    getHeroById(id);
  }, []);

  const handleSubmit = async (updatedHero) => {
    const formData = new FormData();
    formData.append("nickname", updatedHero.nickname);
    formData.append("real_name", updatedHero.real_name);
    formData.append("origin_description", updatedHero.origin_description);
    formData.append("superpowers", updatedHero.superpowers);
    formData.append("catch_phrase", updatedHero.catch_phrase);

    const newImages = updatedHero.images.filter((img) => img instanceof File);
    const oldImages = updatedHero.images.filter(
      (img) => !(img instanceof File)
    );

    newImages.forEach((file) => {
      formData.append("images", file);
    });
    formData.append("oldImages", JSON.stringify(oldImages));

    try {
      await updateHero(id, formData);
      navigator("/");
      toast.success("Hero updated successfully!");
    } catch (e) {
      toast.error("Failed to update hero. Please try again.");
      console.error("Error updating hero:", e);
    }
  };

  if (loading || !currentHero)
    return (
      <div className="p-6 max-w-6xl mx-auto w-2xl my-24 flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <BackButton />
      <h1 className="text-2xl font-bold mb-4">Edit Hero</h1>

      <HeroForm initialData={currentHero} onSubmit={handleSubmit} />

      {error && (
        <p className="text-red-600 text-center mt-4">
          Error: {error.message || "Something went wrong"}
        </p>
      )}
    </div>
  );
}

export default EditHeroPage;
