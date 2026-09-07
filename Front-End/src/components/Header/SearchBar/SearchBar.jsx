import { BsSearch } from "react-icons/bs";
import {Link} from "react-router-dom";
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
        <Link to="/" className="search-btn">
          <BsSearch />
        </Link>
    </form>
  );
}

export default SearchBar;
