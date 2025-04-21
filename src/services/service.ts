import { axiosInstance } from "@/utils";
import axios from 'axios';

export const getAllServices = async () => {
    try {
        const response = await axiosInstance.get(`/services`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getServiceById = async (serviceId: string) => {
    try {
        const response = await axiosInstance.get(`/services/${serviceId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addService = async (serviceData: FormData) => {
    try {
        const response = await axios.post('http://localhost:5000/api/services', serviceData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data
    } catch (error) {
        throw error;
    }
};

export const updateService = async (serviceId: string, serviceData: FormData) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/services/${serviceId}`, serviceData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data
    } catch (error) {
        throw error;
    }
};


export const deleteService = async (serviceId: string) => {
    try {
        const response = await axiosInstance.delete(`/services/${serviceId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};