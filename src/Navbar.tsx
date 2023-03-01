import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav id="top-nav">
      <ul>
        <li>
          <Link to="/">AI Stories</Link>
        </li>
        <li>
          <Link to="/acclaimed">Acclaimed</Link>
        </li>
        <li>
          <Link to="/questionable">Questionable</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
