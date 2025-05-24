import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function BackButton() {
  const navigator = useNavigate();

  const handleClick = () => {
    navigator(-1);
  };
  return (
    <button
      className="absolute top-14 left-10 z-10 cursor-pointer"
      onClick={handleClick}
    >
      <FaArrowLeft size={28} />
    </button>
  );
}

export default BackButton;
