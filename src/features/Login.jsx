import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makeLogin } from '/src/redux/actions/accountActions';

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
    if (user) {
      navigate('/');
    }
  }, [user]);

  useEffect(() => {
    console.log('a ver =======>', error);
  }, [error]);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="user" className="form-label">
            User
          </label>
          <input type="text" className="form-control" id="user" name="user" />
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
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
