import {filterPropsType} from '../types/types';


export const filterProps: filterPropsType = [
    {
        sortBy:'name',
        label:'ПО АЛФАВИТУ',
        options:['☰','А-Я','Я-А'],
    },
    {
        sortBy:'year',
        label:'ПО ГОДАМ',
        options:['☰','новые','старые'],
    },
    {
        sortBy:'id',
        label:'ПО ДАТЕ ДОБАВЛЕНИЯ',
        options:['☰','новые','старые']
    }
]