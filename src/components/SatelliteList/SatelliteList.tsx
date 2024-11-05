import React, { useState } from 'react';
import { useGetSatellitesQuery } from '../../services/satellitesApi';
import SatelliteRow from './SatelliteRow';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import FiltersAndSortControls from './Filters/FiltersAndSortControls';
import useRandomizeSatelliteDataHook from '../../hooks/useRandomizeSatelliteData';
import { SortBy, FilterType, FilterStatus } from '../../types/satellite';
import './SatelliteList.css';
import { useNavigate } from 'react-router-dom'; 
import { FixedSizeList as List } from 'react-window'; 
import { JSX } from 'react/jsx-runtime';

const SatelliteList: React.FC = () => {
  const navigate = useNavigate(); 
  const { data: satellites, error, isLoading } = useGetSatellitesQuery();
  useRandomizeSatelliteDataHook(satellites)

  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  if (isLoading) return <Loader message="Загрузка списка спутников..." />;
  if (error) return <ErrorMessage message="Ошибка при загрузке спутников." />;
  if (!satellites) return <p>Спутники не найдены.</p>;

   // Фильтрация и сортировка  
    const filteredSatellites= satellites.filter((sat)=>{
        let typeMatch= filterType==='all' || sat.type===filterType ;
        let statusMatch= filterStatus==='all' || sat.status===filterStatus;
       return typeMatch && statusMatch;});

      // Сортировка 
      const sortedSatellites =
     [...filteredSatellites].sort((a,b)=>{
         if(sortBy==='orbitHeight'){
             return a.orbitHeight-b.orbitHeight ;
         }
          let aValue=a[sortBy];
          let bValue=b[sortBy];
          if(typeof aValue==='string' && typeof bValue ==='string'){
              return aValue.localeCompare(bValue);
           }
            return 0; })

      // Определяем высоту строки и общее количество элементов для виртуализации
      const rowHeight = 40; // Установите желаемую высоту строки
      const itemCount=sortedSatellites.length;

      // Рендеринг элемента списка для react-window с указанием типов
    const RowRenderer :React.FC<{ index:number; style:React.CSSProperties }> =(props) =>{
   const satellite= sortedSatellites[props.index];
   return (
    <div style={props.style} onClick={() => navigate(`/satellite/${satellite.id}`)}>
     <SatelliteRow satellite={satellite} onClick={() => navigate(`/satellite/${satellite.id}`)} style={{}} />
    </div>
   );
     };

return (
  <div className ="satellite-list">
     {/* Компоненты фильтрации и сортировки */}
    <FiltersAndSortControls
       sortBy={sortBy}
       setSortBy={setSortBy}
            filterType={filterType}
       setFilterType ={setFilterType}
        filterStatus ={filterStatus}
        setFilterStatus ={setFilterStatus}/>
   {/* Использование Virtualized List */}
     <List height ={400} itemCount ={itemCount} itemSize ={rowHeight}>
                 {/* Передаем RowRenderer как дочерний элемент */}
                {(rowProps: JSX.IntrinsicAttributes & { index: number; style: React.CSSProperties; }) => <RowRenderer {...rowProps} />}
            </List>
        </div >
 );
};

export default SatelliteList;