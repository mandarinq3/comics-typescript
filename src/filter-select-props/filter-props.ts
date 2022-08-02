import {filterPropsType} from '../types/types';


export const filterProps: filterPropsType = [
    {
        sortBy:'NAME',
        label:'BY NAME',
        options:['☰','A-Z','Z-A'],
    },
    {
        sortBy:'YEAR',
        label:'BY YEAR',
        options:['☰','new','old'],
    },
    {
        sortBy:'ADDEDDATE',
        label:'BY ADDED DATE',
        options:['☰','latest','oldest']
    }
]