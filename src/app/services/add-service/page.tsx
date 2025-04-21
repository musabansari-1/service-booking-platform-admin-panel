"use client";

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { addService, getServiceById, updateService } from '@/services/service';
import { useSearchParams } from 'next/navigation';


const schema = yup.object().shape({
    name: yup.string().required('Service Name is required'),
    description: yup.string().required('Service Description is required'),
    price: yup.number().required('Price is required').positive().integer(),
    duration: yup.number().required('Duration is required').positive().integer(),
    image: yup.mixed().required('Service Image is required')
});

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


const AddService = ({ initialData }) => {

    const [availability, setAvailability] = useState({
        Monday: { isOff: false, startTime: '', endTime: '' },
        Tuesday: { isOff: false, startTime: '', endTime: '' },
        Wednesday: { isOff: false, startTime: '', endTime: '' },
        Thursday: { isOff: false, startTime: '', endTime: '' },
        Friday: { isOff: false, startTime: '', endTime: '' },
        Saturday: { isOff: false, startTime: '', endTime: '' },
        Sunday: { isOff: false, startTime: '', endTime: '' },
    });

    const handleDayChange = (day, field, value) => {
        setAvailability(prevState => ({
            ...prevState,
            [day]: {
                ...prevState[day],
                [field]: value,
            }
        }));
    };

    const handleOffChange = (day, isOff) => {
        setAvailability(prevState => ({
            ...prevState,
            [day]: {
                isOff,
                startTime: '',
                endTime: '',
            }
        }));
    };

    const searchParams = useSearchParams()

    console.log('searchparams', searchParams);

    console.log('searchparams', searchParams.get('id'));

    const router = useRouter();

    const [service, setService] = useState({});
    const [mode, setMode] = useState('create');

    // const data = searchParams.get('id');

    // console.log('searchparams: ', data);

    const fetchService = async (id: string) => {
        try {
            const response = await getServiceById(id);
            console.log(response)
            setService(response);
            reset(response);
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        const id = searchParams.get('id');
        if (id) {
            setMode('update');
            fetchService(id);
        }
    }, [])



    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        if (mode === 'update' && initialData) {
            reset(initialData);
        }
    }, [mode, initialData]);

    const onSubmit = async (data) => {
        console.log('inside submit');
        console.log(data);
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('duration', data.duration);
        formData.append('image', data.image[0]);
        console.log('availability', availability);
        formData.append('availability', JSON.stringify(availability));

        try {
            if (mode == "create") {
                const response = await addService(formData);
                console.log(response);
            }
            else {
                const response = await updateService(initialData._id, formData);
                console.log(response);
            }

            // Reset form
            reset();
            router.push('/services');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className=" mx-auto mt-2 p-5 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-5">{mode == 'create' ? 'Add New Service' : 'Update Service'}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Service Name:</label>
                    <input
                        type="text"
                        id="name"
                        {...register('name')}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Service Description:</label>
                    <textarea
                        id="description"
                        {...register('description')}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
                    <input
                        type="number"
                        id="price"
                        {...register('price')}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration:</label>
                    <input
                        type="number"
                        id="duration"
                        {...register('duration')}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                    {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Service Image:</label>
                    <input
                        type="file"
                        id="image"
                        {...register('image')}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                    {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
                </div>

                {/* Dummy */}


                <h4 className="text-xl font-bold mb-6">Set Availability</h4>

                {/* <h3 className="text-2xl font-bold mb-6 text-center">Set Availability</h3> */}
                {daysOfWeek.map((day) => (
                    <div key={day} className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center mb-4">
                        <h4 className="col-span-1 text-lg font-semibold">{day}</h4>
                        <label className="flex items-center col-span-1">
                            <input
                                type="checkbox"
                                checked={availability[day].isOff}
                                onChange={(e) => handleOffChange(day, e.target.checked)}
                                className="mr-2"
                            />
                            <span className="text-gray-700">Off</span>
                        </label>
                        {!availability[day].isOff && (
                            <>
                                <label className="flex flex-col col-span-1">
                                    <span className="text-gray-600">Start Time:</span>
                                    <input
                                        type="time"
                                        value={availability[day].startTime}
                                        onChange={(e) => handleDayChange(day, 'startTime', e.target.value)}
                                        required
                                        className="mt-1 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </label>
                                <label className="flex flex-col col-span-1">
                                    <span className="text-gray-600">End Time:</span>
                                    <input
                                        type="time"
                                        value={availability[day].endTime}
                                        onChange={(e) => handleDayChange(day, 'endTime', e.target.value)}
                                        required
                                        className="mt-1 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </label>
                            </>
                        )}
                    </div>
                ))}

                {/* Dummy End */}

                <div className='w-full flex justify-center'>
                <button
                    type="submit"
                    className="bg-blue-500 text-white my-2 py-2 px-10 rounded-md hover:bg-blue-600 "
                >
                    Add Service
                </button>
                </div>
                
            </form>
        </div>
    );
};

export default AddService;
