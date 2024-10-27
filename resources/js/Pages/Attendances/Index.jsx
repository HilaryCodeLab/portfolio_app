import React, {useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import DatePicker from 'react-datepicker';
// import Datepicker from "tailwind-datepicker-react"
import { router, useForm, Head, usePage } from '@inertiajs/react';
import { format, parse } from 'date-fns';
// import { newDate } from 'react-datepicker/dist/date_utils';



export default function Index({ auth }) {
   
    // const [date, setDate] = useState(new Date());

    // function handleChange(e){
    //     const key = e.target.id;
    //     const value = e.target.value;
    //     setValues(values => ({
    //         ...values,
    //         [key]: value,

    //     }))

    // }

    // const {errors}  =usePage().props;

    // const today = new Date();

    const { data, setData, post, reset, processing, errors } = useForm({
        session_location: 'PBA Canning Vale',
        members: '',
        session_date: new Date(),
        // session_date: new Date(),
    });

    // const handleDateChange = (event) => {
    //     const {value} = event.target;
    //     setData('session_date', value);
    // }

    const handleDateChange = (date) => {
        const formattedDate = format(date, 'yyyy-MM-dd')
        setData('session_date', formattedDate)
    }


    // const { data, setData, post, reset, processing, errors } = useForm({
    //     session_location: 'PBA Canning Vale',
    //     members: '',
    // });

    const submit = (e) => {
        e.preventDefault();
        post(route('attendances.store'), { onSuccess: () => reset() });
    };


    return (
        <AuthenticatedLayout user={auth.user}>

            {/* inputs: date, place, members */}
            <Head title="Attendances" />

            {/* <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8"> */}
            <form className="max-w-sm mx-auto" onSubmit={submit}>
                <div className="mb-5">
                    <label htmlFor="session_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                        Date:
                    </label>
                    {/* <input type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="session_date"
                    value={data.session_date}
                    onChange={(e) => setData('session_date', e.target.value)}/> */}
                    <DatePicker 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        selected={data.session_date}
                        // selected={new Date(data.session_date)}
                        // selected={date}
                        id="session_date"
                        // value={data.session_date}
                         dateFormat='yyyy-MM-dd'
                        // dateFormat='dd-MM-yyyy'
                        // onChange = {(date) => setData('session_date', date)}
                        onChange={handleDateChange}
                        // onChange={e => setData('data.session_date', e.target.value)}
                        >
                    </DatePicker>
                </div>

                <div className="mb-5">
                    <label htmlFor="seesion_location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                        Location:
                    </label>
                    <input type="text" id="session_location"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={data.session_location} onChange={e => setData('session_location', e.target.value)} />
                    <InputError message={errors.session_location} className="mt-2" />
                    {/* <input type="text" id="session_location" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         value={values.session_location} onChange={handleChange}/>
                        {errors.session_location && <div>{errors.session_location}</div>} */}

                </div>
                <div className="mb-5">
                    <label htmlFor="members" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                        Members:
                    </label>
                    <textarea id="members"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={data.members} onChange={e => setData('members', e.target.value)}></textarea>
                    <InputError message={errors.members} className="mt-2" />
                    {/* <input type="text" id="members" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={values.members} onChange={handleChange}/>
                        {errors.members && <div>{errors.members}</div>} */}
                </div>

                {/* <InputError message={errors.message} className="mt-2" /> */}
                {/* <PrimaryButton className="mt-4" disabled={processing}>Create</PrimaryButton> */}
                <PrimaryButton className="mt-4" disabled={processing}>Create</PrimaryButton>
            </form>

            {/* </div> */}

        </AuthenticatedLayout>
    );
}