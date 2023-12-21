import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth/useAuth';
import useAdmin from '../Hooks/useAdmin/useAdmin';

const Adminroute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation();
    if (loading || isAdminLoading) {
        return (
            <div className="py-32 w-full flex justify-center">
                <span className="loading loading-dots loading-xs"></span>
                <span className="loading loading-dots loading-sm"></span>
                <span className="loading loading-dots loading-md"></span>
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/dashboard/addnewpet" state={{ from: location }} replace></Navigate>;
};

export default Adminroute;