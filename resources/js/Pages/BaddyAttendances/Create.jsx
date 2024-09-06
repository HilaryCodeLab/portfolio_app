import React, {useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import DatePicker from 'react-datepicker';
// import Datepicker from "tailwind-datepicker-react"
import { useForm, Head} from '@inertiajs/react';
import { format} from 'date-fns';
// import { newDate } from 'react-datepicker/dist/date_utils';



export default function Create({ auth, members }) {
   
    const { data, setData, post, reset, processing, errors } = useForm({
        session_location: 'PBA Canning Vale',
        members: [],
        session_date: new Date(),
    });

    const handleCheckboxChange = (memberId) => {
        setData('members', data.members.includes(memberId)
        ? data.members.filter(id => id !== memberId)
        : [...data.members, memberId]);
    };

    const handleDateChange = (date) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        setData('session_date', formattedDate);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('baddy_attendances.store'), { onSuccess: () => reset() });
    };

    const checkBoxSyle = {
        // padding: '10px 10px',
        margin: '10px 10px',
    }

    return (
        <AuthenticatedLayout user={auth.user}>

            <Head title="Baddy Attendances" />

            <form className="max-w-sm mx-auto" onSubmit={submit}>
                <div className="mb-5">
                    <label htmlFor="session_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                        Date:
                    </label>
                   
                    <DatePicker 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        selected={data.session_date}
                        id="session_date"
                        dateFormat='dd-MM-yyyy'
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
                </div>
                <div className="mb-5">
                    <label htmlFor="members" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                        Members:
                    </label>
                    {members.map( member =>
                        <div key={member.id} className="form-check">
                            <input 
                                type="checkbox"
                                style={checkBoxSyle} 
                                className="form-check-input"
                                value= {member.id}
                                id={`member ${member.id}`}
                                checked = {data.members.includes(member.id)}
                                onChange = {() => handleCheckboxChange(member.id)}
                            />
                            <label 
                                className="form-check-label" 
                                htmlFor={`$member${member.id}`}>
                                {member.name}
                            </label>
                        </div>

                    )}
                    <InputError message={errors.members} className="mt-2" />
                </div>
                <PrimaryButton className="mt-4" disabled={processing}>Create</PrimaryButton>
            </form>

        </AuthenticatedLayout>
    );
}