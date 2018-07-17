import React from 'react';
import './Partners.css';
//import { Tooltip } from 'antd';
import partner from '../../assets/partners/elrealito.png'

export const PartnersCard = ({name, place, cliente,  descript, picture}) => (



        <div className="tooltip">
            <div className="part_card ">
                <div style={{backgroundColor:"#1f1f1f"}}>
                <img width="100" src={picture || partner} alt=""/></div>
                <h4>{name}</h4>
            </div>
                <div className="tooltiptext">
                    <p>Cliente: {cliente}</p>
                    <p>Lugar: {place}</p>
                    <p>Trabajo: {descript}</p>
                </div>
        </div>

);