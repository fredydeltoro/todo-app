import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkLogin, setUser } from '/src/redux/actions/accountActions';
import { Link } from 'react-router-dom';
import apiClient from '/src/lib/apiClient';

const Protected = ({ children }) => {
  const { user } = useSelector((state) => state.account);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!user && !token) {
      navigate('/login');
    }
  }, [user]);

  useEffect(() => {
    dispatch(checkLogin());
  }, []);

  const onClick = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    apiClient.defaults.headers.common['Authorization'] = '';
    dispatch(setUser(null));
  };

  return (
    <div>
      {user && (
        <>
          <header className="navbar navbar-expand-lg bg-primary sticky-top">
            <nav className="container-xxl bd-gutter flex-wrap flex-lg-nowrap">
              <Link className="navbar-brand" to="/">
                <h1>
                  TOD
                  <i
                    className="fa fa-check-circle"
                    style={{ marginLeft: 3 }}
                  ></i>
                </h1>
              </Link>
              <div className="collapse navbar-collapse" id="navbarScroll">
                <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"></ul>
                <div className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {`${user.firstName} ${user.lastName}`}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => onClick(e)}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </header>

          <main className="container">{children}</main>
        </>
      )}
    </div>
  );
};

export default Protected;
