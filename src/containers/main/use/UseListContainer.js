import React from 'react';
import { Link } from 'react-router-dom';

import { Paths } from '../../../paths';

const list = [
    {
        id: 1,
        name: 'asd',
    },
    {
        id: 2,
        name: 'asdf',
    },
    {
        id: 3,
        name: 'asdfg',
    },
    {
        id: 4,
        name: 'asdfgh',
    },
];

const UseListContainer = () => {
    return (
        <ul>
            {list.map((item) => (
                <li key={item.id}>
                    <Link to={Paths.main.use.detail + `?id=${item.id}`}>
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default UseListContainer;
