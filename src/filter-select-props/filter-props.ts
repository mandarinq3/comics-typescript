import {filterPropsType} from '../types/types';


export const filterProps: filterPropsType = [
    {
        sortBy:'name',
        label:'ПО АЛФАВИТУ',
        options:['☰','A-Z','Z-A'],
    },
    {
        sortBy:'year',
        label:'ПО ГОДАМ',
        options:['☰','new','old'],
    },
    {
        sortBy:'id',
        label:'ПО ДАТЕ ДОБАВЛЕНИЯ',
        options:['☰','latest','oldest']
    }
]