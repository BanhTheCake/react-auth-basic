import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const RequireAuth = ({ allowedRoles = [] }) => {
    const auth = useSelector((state) => state.auth);
    const location = useLocation();

    // Decode access token to get roles
    const decode = auth?.accessToken ? jwt_decode(auth.accessToken) : null;
    let roles = [];
    if (decode) {
        roles = decode?.roles || [];
    }

    // state={{ from: location }} replace => use to go back previous route
    return roles.find((role) => allowedRoles.includes(role)) ? (
        <Outlet />
    ) : auth?.username ? (
        <Navigate to={'/unauthorized'} state={{ from: location }} replace />
    ) : (
        <Navigate to={'/login'} state={{ from: location }} replace />
    );
};

export default RequireAuth;
