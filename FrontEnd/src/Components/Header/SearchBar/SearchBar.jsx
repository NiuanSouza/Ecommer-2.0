import { BsSearch } from "react-icons/bs";
import "./SearchBar.css";

function SearchBar({ setBusca, busca }) {
  return (
    <form className="search-container" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        className="search-input"
        placeholder="O que você procura?"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
      <button type="submit" className="search-btn">
        <BsSearch />
      </button>
    </form>
  );
}

export default SearchBar;
