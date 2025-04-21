"use client"

import { EyeIcon, PencilIcon, TrashIcon} from '@heroicons/react/24/solid';
import { Table } from "@/components/ui";
import { useEffect, useState } from 'react';
import { deleteService, getAllServices } from '@/services/service';
import {useRouter} from 'next/navigation'
import Link from 'next/link';

export default function Services() {

    const router = useRouter();

    const [services, setServices] = useState([]);
    const [filterdServices, setFilteredServices] = useState([]);

    const fetchServices = async () => {
        try {
          const response = await getAllServices();
          setServices(response);
          setFilteredServices(response);
        } catch (err) {
            console.log(err);
        //   setError(err);
        } finally {
        //   setLoading(false);
        }
      };

    useEffect(() => {
        fetchServices();
    },[])

    const handleView = (row) => {
        console.log('View clicked')
        console.log('row', row);
        router.push(`/services/${row._id}`);
    }

    const handleEdit = (row) => {
        console.log('Edit clicked')
        console.log('row', row);
        
     
        // router.push({
        //     pathname: '/services/add-service',
        //   },
        //     // `/edit-service` // Clean URL
        //   );
    }

    const handleDelete = async (row) => {
        console.log('Delete clicked')
        console.log('row', row);
        try {
            const response = await deleteService(row._id);
            fetchServices();
          } catch (err) {
              console.log(err);
          } 
    }

    const columns = [
        {
          name: "ID",
          selector: (row) => row._id,
          sortable: true,
        },
        {
          name: "Name",
          selector: (row) => row.name.replace(/"/g, ''),
          sortable: true,
        },
        // {
        //   name: "Description",
        //   selector: (row) => row.description.replace(/"/g, ''),
        //   sortable: true,
        // },
        {
          name: "Price",
          selector: (row) => row.price,
          format: (row) => `$${row.price}`,
          sortable: true,
          sortFunction: (a,b) => a.price - b.price
        },
        {
          name: "Duration",
          selector: (row) => `${row.duration} hours`, // Assuming duration is in hours
          sortable: true,
          sortFunction: (a,b) => a.duration - b.duration
        },
        // {
        //   name: "Image",
        //   selector: (row) => row.imagePath,
        //   cell: (row) => <img src={row.imagePath} alt={row.name} className="w-16 h-16 object-cover" />, // Displaying the image
        //   sortable: false,
        // },
        {
          name: 'Actions',
          cell: (row) => (
            <div className="flex space-x-2">
              <EyeIcon onClick={() => handleView(row)} className="h-4 w-4 text-green-500 hover:text-green-700 transition-colors duration-300 cursor-pointer" />
              <Link 
              href={{
                pathname:`/services/add-service/`,
                query:{
                  id: row._id,
                },
              }}
            //   as={`/services/add-service`}
            //   as ={`/services/edit-service`}
              ><PencilIcon onClick={() => handleEdit(row)} className="h-4 w-4 text-blue-500 hover:text-blue-700 transition-colors duration-300 cursor-pointer" /></Link>
              <TrashIcon onClick={() => handleDelete(row)} className="h-4 w-4 text-red-500 hover:text-red-700 transition-colors duration-300 cursor-pointer" />
            </div>
          ),
        },
      ];
      


    // Handle Search is the same as Handle Filter
    // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     let searchValue: Boolean;
    //     let personIDValue: Boolean;
    //     let fullNameValue: Boolean;
    //     let heightValue: Boolean;
    //     let eyeColorValue: Boolean;

    //     const newRows = rows.filter((row) => {
    //         personIDValue = row.personID
    //             .toString()
    //             .toLowerCase()
    //             .includes(e.target.value.toLowerCase());
    //         fullNameValue = row.fullName
    //             .toLowerCase()
    //             .includes(e.target.value.toLowerCase());
    //         heightValue = row.height
    //             .toLowerCase()
    //             .includes(e.target.value.toLowerCase());
    //         eyeColorValue = row.eyeColor
    //             .toLowerCase()
    //             .includes(e.target.value.toLowerCase());

    //         if (personIDValue) {
    //             searchValue = personIDValue;
    //         } else if (fullNameValue) {
    //             searchValue = fullNameValue;
    //         } else if (heightValue) {
    //             searchValue = heightValue;
    //         } else {
    //             searchValue = eyeColorValue;
    //         }

    //         return searchValue;
    //     });

    //     setData(newRows);
    // };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();

        const newFilteredServices = services.filter((service) => {
            return Object.values(service).some(value =>
                value.toString().toLowerCase().includes(query)
            );
        });

        setFilteredServices(newFilteredServices);
    };

    return (
        <Table rows={filterdServices} columns={columns} handleSearch={handleSearch} title={'My Services'} btnText={'Add New Service'} addNewRoute={'/services/add-service'} />
    );
}
