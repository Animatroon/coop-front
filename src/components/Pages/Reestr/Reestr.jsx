import React, {useState, useEffect} from 'react';
import Navigation from "../../Navigation/Navigation";

import './reestr.scss';
import { Table } from 'react-bootstrap';
import Search from '../../Search/Search';

import axios from '../../../axios';


const TableCity = ({city}) => {

    return (
        <>
            <tr>
                <td colSpan={3} className="city">{city.name}</td>
            </tr>
            <TableSection/>
            <TableSection/>
            <TableSection/>

        </>
    )
}

const TableSection = () => {
    return (
        <tr className='table__item'>
            <td className='table__num'>№1</td>
            <td className='table__text'>ТОО Евразия Пплюс Экстра Алматы </td>
            <td className='table__date'>22.01.2012</td>
        </tr>
    )
}


const Reestr = () => {

    const [reestrData, setReestrData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/catalog/reestr/all/`);
          setReestrData(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        }
      };
      fetchData();
    }, []);



    return (
        <div className="reestr">
            <Navigation suptitle={"НАШИ РЕЕСТРЫ"} title={"РЕЕСТР ПОЛЬЗОВАТЕЛЕЙ"} nav2={"Каталог"}/>
            <div className="reestr__inner box">
            <Search id='reestr'/>


                <Table bordered className='reestr__table'>
                <thead>
                    <tr>
                    <th>№</th>
                    <th>Пользователи</th>
                    <th>Дата начала договора</th>
                    </tr>
                </thead>
                <tbody>
                {reestrData.map((item, index) => (
                    <TableCity key={item.id} city={item} index={index} />
                ))}

                </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Reestr;

