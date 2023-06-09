import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makeLogin } from '/src/redux/actions/accountActions';
import style from './styles.module.css';

const Login = () => {
  const { user, error, loading } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData = Object.fromEntries(formData);
    dispatch(makeLogin(formData));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (user || token) {
      navigate('/');
    }
  }, [user]);

  return (
    <>
      {!user && (
        <div className={style.login}>
          <h1 className={style.title}>Login</h1>
          <form onSubmit={(e) => onSubmit(e)} className="offset-md-4 col-md-4">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error.error}
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="user" className="form-label">
                User
              </label>
              <input
                type="text"
                className="form-control"
                id="user"
                name="user"
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                disabled={loading}
              />
            </div>
            <div className="d-grid gap-2">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                Submit
              </button>
            </div>
          </form>
          {loading && (
            <div
              className={`spinner-border text-primary ${style.loading}`}
              role="status"
            ></div>
          )}
        </div>
      )}
    </>
  );
};

export default Login;
