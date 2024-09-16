import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';


const SummaryCard = ({ profeName, profeLastName, serviName, serviPrice, time, date, handleContinue, backRoute }) => {
  const navigate = useNavigate(); // Usamos el hook useNavigate

  return (
    <div className="col-md-4">
      <div className="card" style={{ backgroundColor: '#F0F0F0' }}>
        <div
          style={{
            backgroundColor: '#E0E0E0',
            padding: '20px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="card-img-top"
            alt="Location"
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </div>
        <div className="card-body">
          {/* El nombre del salón es estático */}
          <h5 className="card-title">Vurve - Bangalore</h5>
          <p className="card-text">MG Road, Bangalore</p>
          {profeName && (
            <div>
              <p><strong>Professional: </strong>{profeName} {profeLastName}</p>
            </div>
          )}
          {serviName && (
            <div>
              <p><strong>Service: </strong>{serviName}</p>
            </div>
          )}
          <p><strong>Total:</strong> EUR {serviPrice ? serviPrice : '0,00'}</p>
          <button className="btn btn-warning w-100 mb-2" onClick={handleContinue}>Continue</button>
          <button className="btn btn-secondary w-100" onClick={() => navigate(backRoute)}>Back</button>
        </div>
      </div>
    </div>
  )
}

export default SummaryCard;
