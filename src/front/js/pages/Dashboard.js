import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import BookAppointment_Proffesional from '../component/BookAppointment_Proffesional';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import EmployeeCard from '../component/EmployeeCard';
import CustomerCard from '../component/CustomerCard';
import BookAppointment from '../component/BookAppointment';

const Dashboard = () => {
    const { store, actions } = useContext(Context);
    const [activeTab, setActiveTab] = useState("tab1");

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("jwt_token")) {
            actions.getProfessional();
            actions.getCustomer();
        } else {
            navigate("/login");
        }
    }, []);

    const handleEdit = (customer) => {
        navigate('/update-customer', { state: { customer } });
    };
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleDelete = async (email) => {
        const result = await actions.deleteCustomer(email);
        if (result) {
            // Redirigir o actualizar la lista de clientes después de la eliminación
            navigate('/dashboard');
        } else {
            alert('Error al eliminar el cliente');
        }
    };
    return (
        <div className='container'>
            <h1 className='mt-3'>Dashboard</h1>
            <div className="nav nav-tabs mt-3">
                <button className="m-auto nav-item btn btn-warning fw-bold" onClick={() => handleTabClick('tab1')}>All Employees</button>
                <button className="m-auto nav-item btn btn-warning fw-bold" onClick={() => handleTabClick('tab2')}>All Customers</button>
                <button className="m-auto nav-item btn btn-warning fw-bold" onClick={() => handleTabClick('tab3')}>All Appointments</button>
            </div>
            <div className="content mt-3 row card-group">
                {activeTab === 'tab1' && <div className="d-flex flex-wrap"><EmployeeCard /></div>}
                
                {activeTab === 'tab2' && (
                    <div className='container'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Appointment</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {store.customer.map((customer, index) => (
                                    <tr key={index}>
                                        <th scope="row"><input type="checkbox" /></th>
                                        <td>{customer.name} {customer.last_name}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.phone}</td>
                                        <td>{customer.status}</td>
                                        <td>{customer.appointments.service_name}</td>
                                        <td>
                                            
                                            <button className="btn" onClick={() => handleEdit(customer)}><i className="bi bi-pencil-square"></i></button>
                                           
                                        </td>
                                        <td>
                                            <button className="btn" onClick={() => handleDelete(customer.email)}><i className="bi bi-trash"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {activeTab === 'tab3' && (
                    <div className='container'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Employee Id</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Appointment</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {store.professional.map((professional, index) => (
                                    <tr key={index}>
                                        <th scope="row"><input type="checkbox" /></th>
                                        <td>{professional.name}</td>
                                        <td>{professional.id}</td>
                                        <td>{professional.role}</td>
                                        <td>{professional.status}</td>
                                        <td>{professional.appointment}</td>
                                        <td>
                                            <Link to=""><button className="btn"><i className="bi bi-pencil-square"></i></button></Link>
                                        </td>
                                        <td>
                                            <button className="btn"><i className="bi bi-trash"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <div className="container d-flex justify-content-evenly">
                <Link to="/employee-register">
                <button className='m-auto btn btn-warning fw-bold' type='button'>Register Employee</button>
                </Link>

                {/* <button className='m-auto btn btn-warning fw-bold' type='submit'>Register Customer</button> */}
            </div>
        </div>
    );
};

export default Dashboard;
