import ImageGallery from "./ImageGallery";

function HeroData({ hero }) {
  const {
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    images = [],
  } = hero;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-3xl font-bold text-center text-midnight mb-8">
        {nickname}
      </h2>
      <ImageGallery images={images} />

      <div className="mt-6 space-y-4 text-gray-800">
        <p>
          <strong>Real Name:</strong> {real_name}
        </p>
        <p>
          <strong>Origin:</strong> {origin_description}
        </p>
        <p>
          <strong>Superpowers:</strong> {superpowers}
        </p>
        <p>
          <strong>Catch Phrase:</strong> <em>“{catch_phrase}”</em>
        </p>
      </div>
    </div>
  );
}
export default HeroData;
