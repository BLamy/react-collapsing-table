//React
import React from 'react';
import { ColumnPropType } from '../utils/propTypes';
//Components
import { sortDirection } from '../assets/icons/Icon';

const Column = ({ accessor, label, sortable, onClick, sort, icons }) => {
    const direction = sort.column === accessor ? sort.direction : 'none';
    const icon = sortable ? sortDirection({ direction, icons }) : "";
    const sortFunction = sortable ? () => onClick({ column: accessor }) : () => {};
    const cssClass = `column-${accessor} ${ sortable ? 'clickable' : '' }`;

    // Prepare properties for the table header
    let headerProps = {
        key: accessor,
        onClick: sortFunction,
        onKeyDown: e => { if (e && e.key === "Enter") sortFunction() }, //Handle sorting on 'Enter'
        className: cssClass
    }

    // Make table header focussable, if sorting is enabled
    if (sortable) {
        headerProps = { ...headerProps, tabIndex: 0 }
    }

    return (
            <th {...headerProps}>{ label }{ icon }</th>
    );
};

Column.propTypes = ColumnPropType;

export default Column
