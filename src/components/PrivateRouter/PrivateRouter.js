import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRole } from '../../selectors';

function PrivateRouter({ children }) {
	const isAdmin = useSelector(getRole);
	const location = useLocation();
	console.log(isAdmin);

	if (isAdmin !== 'admin') {
		return <Navigate to='/courses' state={{ from: location }} />;
	}
	return children;
}

export default PrivateRouter;
