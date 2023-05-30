import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Protected = ({ children }) => {
  const { user } = useSelector((state) => state.account);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  return (
    <div>
      <header>algo</header>
      <main>{children}</main>
    </div>
  );
};

export default Protected;
