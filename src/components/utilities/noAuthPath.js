import { useAuth } from './auth';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

export const NoAuthPath = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const redirectPath = location.state?.path || '/home';
    if (!auth.user) {
        return children;
    } else {
        // navigate(redirectPath, { replace: true });
        return <Navigate to={redirectPath} state={{ path: location.pathname }} />;
        // return navigate(-1);
    }
};
