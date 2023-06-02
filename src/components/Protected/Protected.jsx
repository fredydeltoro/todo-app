import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkLogin } from '/src/redux/actions/accountActions';

const Protected = ({ children }) => {
  const { user } = useSelector((state) => state.account);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  useEffect(() => {
    dispatch(checkLogin());
  }, []);

  return (
    <div>
      {user && (
        <>
          <header>algo</header>
          <main>{children}</main>
        </>
      )}
    </div>
  );
};

export default Protected;
