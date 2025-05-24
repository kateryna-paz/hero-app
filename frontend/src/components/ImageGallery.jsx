import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ImageGallery({ images }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (!images || images.length === 0) {
    return (
      <img
        src="/images/spy.png"
        alt="Hero"
        className="h-96 object-cover rounded-xl mx-auto"
      />
    );
  }

  if (images.length === 1) {
    return (
      <img
        src={images[0].url}
        alt="Hero"
        className="h-96 object-cover rounded-xl mx-auto"
      />
    );
  }

  return (
    <div className="mx-auto my-6 w-full max-w-4xl">
      <Slider {...settings}>
        {images.map((img) => (
          <div key={img.id} className="px-2 w-full mx-auto">
            <img
              src={img.url}
              alt={`Hero ${img.id + 1}`}
              className="h-96 object-cover rounded-xl mx-auto"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ImageGallery;
