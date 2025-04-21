"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getServiceById } from '@/services/service';

const ServiceDetail = ({ params }) => {
  const router = useRouter();
  const id = params.id;
  const [service, setService] = useState({});

  const fetchService = async (id: string) => {
    try {
      const response = await getServiceById(id);
      console.log(`${process.env.NEXT_PUBLIC_BASE_URL}${response.imagePath.replace(/\\/g, '/')}`);
      setService(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchService(id);
    }
  }, [id]);

  if (!service) return <div>Loading...</div>;

  return (
    <>
    <h2 className="text-4xl font-bold mb-6 text-center">Service Details</h2> 
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row items-center">
        {service.imagePath && (
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${service.imagePath.replace(/\\/g, '/')}`}
            alt={service.name}
            className="w-full md:w-1/2 object-cover rounded-lg mb-6 md:mb-0 md:mr-6"
          />
        )}
        <div className="w-full">
          <h1 className="text-3xl font-bold mb-2">{service.name}</h1>
          <p className="text-gray-700 mb-4">{service.description}</p>
          <div className="mb-4">
            <span className="text-xl font-semibold">Price: </span>
            <span className="text-xl">${service.price}</span>
          </div>
          <div className="mb-4">
            <span className="text-xl font-semibold">Duration: </span>
            <span className="text-xl">{service.duration} hours</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ServiceDetail;
