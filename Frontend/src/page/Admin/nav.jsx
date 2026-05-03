import React ,{useState , useEffect} from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../middleware/authContext'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoSearchOutline } from "react-icons/io5";
function Nav() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [productSearch, setproductSearch] = useState("");
  const products = useSelector((state) => state.product.products);
  const [Suggestionfilter, setSuggestionfilter] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);

  const formSubmit = (e) => {
    e.preventDefault();
    setSuggestionfilter([]);
    navigate(`products/?search=${productSearch.trim()}`);
  };

const handleKeyDown = (e) => {
    if (!Suggestionfilter.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => prev < Suggestionfilter.length - 1 ? prev + 1 : prev);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => prev > 0 ? prev - 1 : 0
      );
    }
    if (e.key === "Enter") {
      if (activeIndex >= 0) {
        e.preventDefault();
        const selectedItem = Suggestionfilter[activeIndex];
        navigate(`/productdetail/${selectedItem._id}`);
        setSuggestionfilter([]);
      }
    }
  };

  const suggestionFunc = () => {
    if (!productSearch.trim()) {
      setSuggestionfilter([]);
      return;
    }
    const result = products.filter((item) =>
      item.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(productSearch.toLowerCase()) ||
      item.category.toLowerCase().includes(productSearch.toLowerCase()) ||
      item.brand.toLowerCase().includes(productSearch.toLowerCase())
    );
    setSuggestionfilter(result);
  }

  useEffect(() => {
    suggestionFunc();
  }, [productSearch, products]);


  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="d-flex w-full items-center justify-content-between px-3 py-2 border-b bg-white border">
      <h2 className="text-xl font-semibold">Welcome Admin</h2>
      <div className="d-flex items-center gap-6">
        {/* SEARCH BAR */}
        <form
          onSubmit={formSubmit}
          className="order-2 order-lg-2 flex-grow-1 mx-lg-3 mt-2 mt-lg-0">
          <div className="input-group input-group-sm">
            <input
              className="form-control px-2 "
              type="search"
              placeholder="Search for shoes, mobiles, fashion..."
              value={productSearch}
              onChange={(e) => {
                setproductSearch(e.target.value);
                setActiveIndex(-1);
              }}
              onKeyDown={(e) => handleKeyDown(e)} />

            <button className="btn btn-dark" type="submit">
              <IoSearchOutline />
            </button>
          </div>
          {Suggestionfilter.length > 0 && (
            <div
              className="position-absolute bg-white shadow w-100 mt-1 rounded"
              style={{ zIndex: 999 }}>
              {Suggestionfilter.slice(0, 6).map((item, index) => (
                <Link
                  key={index}
                  to={`/productdetail/${item._id}`}
                  className={`d-flex align-items-center gap-2 p-2 text-dark text-decoration-none border-bottom 
                         ${activeIndex === index ? "bg-primary text-white" : ""}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => { setSuggestionfilter([]), setproductSearch("") }}>
                  {item.mainImage && (
                    <img
                      src={item.mainImage}
                      alt=""
                      width="40"
                      height="40"
                      className="rounded"
                    />
                  )}
                  <div>
                    <div style={{ fontSize: "14px" }}>{item.name}</div>
                    <small className="text-muted">₹ {item.price}</small>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </form>
        <div className="dropdown">
          <button
            className="btn dropdown-toggle d-flex align-items-center"
            type="button"
            data-bs-toggle="dropdown"
          >
            <img
              src={user.profile.profilePic}
              alt="profile"
              className="rounded-circle me-2"
              width="35"
              height="35"
            />
            {user.name}
          </button>
          <ul className="dropdown-menu dropdown-menu-end shadow">
            <li><Link className="dropdown-item" to="profile">Profile</Link></li>
            <li><Link className="dropdown-item" to="setting">Settings</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link onClick={handleLogout} className="dropdown-item text-danger">Logout</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Nav
