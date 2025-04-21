"use client";

import DataTable from "react-data-table-component";
import { useState } from "react";
import { EyeIcon, PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function Table({rows, columns, handleSearch, title, btnText, addNewRoute }) {

    const [data, setData] = useState(rows);

    console.log('rows', rows);

    const customStyles = {
        table: {
            style: {
                //   backgroundColor: '#ffffff', // Background color for the table
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Box shadow for the table
                //   borderRadius: '8px', // Rounded corners,
                height: '100%',
                overflow: 'auto', // Hide overflow to maintain rounded corners
            },
        },
        header: {
            style: {
                minHeight: '56px',
                backgroundColor: '#374151', // Tailwind color for gray-800
                color: 'white', // Tailwind color for white
                fontSize: '24px',
                fontWeight: 'bold',
                textAlign: 'center',
            },
        },
        headCells: {
            style: {
                paddingLeft: '16px', // override the cell padding for head cells
                paddingRight: '16px',
                backgroundColor: '#e0e0e0', // Tailwind color for gray-700
                // color: '#fff', // Tailwind color for white
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
            },
        },
        rows: {
            style: {
                minHeight: '56px', // override the row height
                '&:not(:last-of-type)': {
                    borderBottomWidth: '0',
                },
            },
        },
        cells: {
            style: {
                paddingLeft: '16px', // override the cell padding for data cells
                paddingRight: '16px',
            },
        },
        pagination: {
            style: {
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                borderTopColor: '#e5e7eb', // Tailwind color for gray-300
            },
        },
        noData: {
            style: {
                textAlign: 'center',
                fontSize: '18px',
                color: '#9ca3af', // Tailwind color for gray-400
            },
        },
    };

    return (
        <>
            <div className="container my-5">
                <div className="input-group">

                </div>
                <DataTable
                    columns={columns}
                    data={rows}
                    fixedHeader
                    title={title}
                    pagination
                    selectableRows
                    selectableRowsHighlight
                    highlightOnHover
                    subHeader
                    subHeaderComponent={
                        <div className="w-full flex justify-between my-1">
                            <Link href={addNewRoute}>
                            <button
                                className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-md shadow-md hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <PlusIcon className="text-white h-5 w-5 mr-2" />
                                {btnText}
                            </button>
                            </Link>
                            <input
                                type="search"
                                className="form-control-md w-1/4 border border-gray-800 ps-3 px-4 py-2 rounded-md"
                                placeholder="Search"
                                onChange={handleSearch}
                            />
                        </div>

                    }
                    customStyles={customStyles}
                />
            </div>
        </>
    );
}