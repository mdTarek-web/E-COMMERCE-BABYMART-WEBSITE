import axios, { AxiosInstance, AxiosResponse} from "axios"

//configuration utility for Admin API

interface AdminApiConfig{
    baseURL: string;
    isProduction: boolean;
}
    // Get API Configuration for admin

    export const getAdminApiConfig = (): AdminApiConfig => {
        const apiUrl = import.meta.env.VITE_API_URL;

        if(!apiUrl){
            throw new Error("VITE_API_URL environment variable is not defined");
        }
        const isProduction = 
        import.meta.env.VITE_API_ENV === "production" ||
        import.meta.env.PROD === true;

        return {
            baseURL:`${apiUrl}/api`,
            isProduction,
        }
    }

    //Create configured axios instance

    const createApiInstance = (): AxiosInstance => {
        const {baseURL} = getAdminApiConfig();
        const instance = axios.create({
            baseURL,
            headers:{
                "Content-Type": "application/json",
            },
            withCredentials: true,
            timeout: 30000, //30 seconds timeout
        });

        //Add request interceptor to  include auth Token
        instance.interceptors.request.use((config)=>{
            //Get token from localStorage (zustand persist stores it there)
            const authData = localStorage.getItem("auth-storage");
            if(authData){
                try {
                    const parsedData = JSON.parse(authData);
                    const token = parsedData.state?.token;
                    if(token){
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                } catch (error) {
                    console.log("Error parsing auth data",error);
                }
            }
            return config;
        },
        (error)=>{
            return Promise.reject(error);
        }
     )
    };

    //Create and export the configured axios instance
    export const adminApi = createApiInstance();

    //Admin API endpoints

    export const ADMIN_API_ENDPOINTS = {
        //AUTH
        REGISTER: "/auth/register",
        LOGIN: "/auth/login",
        LOGOUT: "/auth/logout",
        //Users

        //Products

        //Categories
    } as const;

    //Helper function to build query parameters
    export const 
