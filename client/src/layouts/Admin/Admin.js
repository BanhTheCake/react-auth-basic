import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useGetDataUser from '../../api/Auth/useGetDataUser';
import useRefreshToken from '../../api/useRefreshToken';
import useGetAllUsers from '../../api/Users/useGetAllUsers';
import { setAuth } from '../../app/authSlice';
import './Admin.scss';

const Admin = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const onErrorAll = (err) => {
        dispatch(setAuth({username: null, accessToken: null }))
        return navigate('/login', { state: { from: location }, replace: true  })
    };

    const { data: dataEmployees } = useGetAllUsers({ select: (resData) => resData.data, onErrorAll });

    const onSuccess = (data) => {
        console.log(data);
    }
    const onError = (err) => {
        console.log(err);
    }
    const { data: dataUser } = useGetDataUser({ onSuccess, onError })
    
    return (
        <section className="container admin">
            <h1>Admins Page</h1>
            <br />
            <p>You must have been assigned an Admin role.</p>
            {dataEmployees?.length ? (
                <ul>
                    {dataEmployees.map((employee, i) => {
                        return <li key={i}>{employee?.firstName}</li>;
                    })}
                </ul>
            ) : (
                <p>No Employee</p>
            )}
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    );
};

export default Admin;
