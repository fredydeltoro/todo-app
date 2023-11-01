import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { makeSignup } from '/src/redux/reducers/accountReducer';
import style from './styles.module.css';

const Signup = () => {
  const { user, error, loading } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    dispatch(makeSignup(formData));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token || user) {
      navigate('/');
    }
  }, [user]);

  return (
    <>
      {!user && (
        <div className={style.signup}>
          <h1 className={style.title}>Sign Up</h1>
          <div className={style.form}>
            <form
              onSubmit={(e) => onSubmit(e)}
              className={`row g-3 ${loading && 'disabled'}`}
            >
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error?.error}
                </div>
              )}
              <div className="">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                />
              </div>
              <div className="">
                <label htmlFor="firstName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                />
              </div>
              <div className="col-6">
                <label htmlFor="user" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                />
              </div>
              <div className="col-6">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                />
              </div>
              <div className="col-6">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                />
              </div>
              <div className="col-6">
                <label htmlFor="password2" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password2"
                  name="password2"
                />
              </div>
              <div className="d-grid gap-2 col-6 mx-auto">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
                <Link to="/login" style={{ textAlign: 'center' }}>
                  Cancel
                </Link>
              </div>
            </form>
            {loading && (
              <div
                className={`spinner-border text-primary ${style.loading}`}
                role="status"
              ></div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
