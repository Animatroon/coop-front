import React, {useState, useEffect } from 'react';
import Navigation from "../../Navigation/Navigation";

import axios from '../../../axios';

import './copyholder.scss';
import { Table } from 'react-bootstrap';
import Search from '../../Search/Search';

const Tr = ({ data }) => {
    const { id, name, performer, individ_face, repertoire, contract_number, datу_of_signing } = data;

    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{performer}</td>
            <td>{individ_face}</td>
            <td>{repertoire}</td>
            <td>{contract_number}</td>
            <td>{datу_of_signing}</td>
        </tr>  
    );
};



const Copyholder = () => {

    const [copyData, setCopyHolderData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`/catalog/poisk_pravoobladateley/all/`);
            setCopyHolderData(response.data);
          } catch (error) {
            console.error('Ошибка при получении данных:', error);
          }
        };
        fetchData();
    }, []);



    return (
        <div className="copyholder">
            <Navigation suptitle={"НАШИ РЕЕСТРЫ"} title={"КАТАЛОГ правообладателей"} nav1={"Каталог"}/>
            <div className="copyholder__inner box">
            <Search id='copyholder'/>


                <Table striped bordered className='copyholder__table'>
                <thead>
                    <tr>
                    <th>№</th>
                    <th>Псевдоним</th>
                    <th>ФИО (Исполнителя)</th>
                    <th>Физ. лицо</th>
                    <th>Репертуар</th>
                    <th>№ Договора</th>
                    <th>Дата</th>
                    </tr>
                </thead>
                <tbody>
                    {copyData.map((item) => (
                            <Tr key={item.id} data={item} />
                        ))}

                </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Copyholder;

