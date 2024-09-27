import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import DatePicker from 'react-datepicker';
import { useForm, Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import Checkbox from '@/Components/Checkbox';


export default function Edit({ auth, baddyAttendance, members }) {

    const {data, setData, post, errors, reset, processing } = useForm({
        session_date: baddyAttendance.session_date || "",
        session_location: baddyAttendance.session_location || "",
        // members: [],
        members: baddyAttendance.members.map((member) => member.id),
        _method: "PUT",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("baddy_attendances.update", baddyAttendance.id));
    
    };

    const handleDateChange = (date) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        setData('session_date', formattedDate);
    };

    // const handleCheckboxChange = (id) => {
    //     console.log(data.members)
    //     setData('members', (prevMembers) => {
    //         //for case that the checkbox is unchecked, then make sure to remove the id from the array, only get the id that does not match the checkbox id
    //         if(prevMembers.includes(id))
    //         {
    //             return prevMembers.filter((memberId) => memberId !== id);
    //         }
    //         //otherwise, the checkbox is checked, then include the checkbox id in the array
    //         else
    //         {
    //             return [...prevMembers, id];
    //         }
    //     });
    // };

    const handleCheckboxChange = (id) => {
        if(data.members.includes(id))
        {
            setData('members', data.members.filter(memberId => memberId !== id));
        }
        else
        {
            setData('members', [...data.members, id]);
        }
       
    };
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Attendance - id: {baddyAttendance.id}</h2>}>

            <Head title="Edit Attendance" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {console.log("current members: ", data.members)}
                    <form className="max-w-sm mx-auto" onSubmit={submit}>
                        <div className="mb-5">
                            <label htmlFor="session_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                                Date:
                            </label>

                            <DatePicker
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                selected={data.session_date}
                                id="session_date"
                                // value={data.session_date}
                                //  dateFormat='yyyy-MM-dd'
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
                            {members.map((member) => (
                                <div key={member.id}>
                                    <label>
                                        <input 
                                        type="checkbox"
                                        // value={member.id}
                                        checked={data.members.includes(member.id)}
                                        onChange={() => handleCheckboxChange(member.id)}/>
                                        {member.name}
                                    </label>   
                                </div>    
                            ))}
                            <InputError message={errors.members} className="mt-2" />
                        </div>
                        <div className='mt-4 text-right'>
                            <Link href={route('baddy_attendances.index')}> Cancel </Link>
                            <PrimaryButton className="mt-4" disabled={processing}>
                                {processing ? 'Updating...' : 'Update' }
                            </PrimaryButton>

                        </div>
                        
                    </form>
                </div>
            </div>

        </AuthenticatedLayout>
    );

}