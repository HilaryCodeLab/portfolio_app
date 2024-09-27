import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, Head, router } from '@inertiajs/react';


export default function Index({ auth, baddyAttendances}) {

    const containerStyle = {
        // position:'relative',
        padding: '20px',
        display: 'flex',
        // minHeight: '100vh',
        justifyContent: 'space-between', // Aligns h1 to the left and button to the right
        alignItems: 'center',
    };

    const headingStyle = {
        margin: '0', // Remove default margin
        fontSize: '24px',
        color: '#333',
    };

    const buttonStyle = {
        padding: '10px 20px',
        margin: '10px 10px',
    };

    const tableContainer = {
        float: 'clear',
        padding: '10px 20px',

    };

    const deleteItem = (attendance) =>{
        if (!window.confirm("Are you sure you want to delete?")){
            return;
        }
        router.delete(route("baddy_attendances.destroy", attendance.id));
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Attendances</h2>}>
            <Head title="baddy attendances" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <PrimaryButton style={buttonStyle}>
                        <Link
                            href={route('baddy_attendances.create')}
                        >
                            <span>Create</span>
                            <span className="hidden md:inline"> Attendance</span>
                        </Link>
                    </PrimaryButton>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    
                        <div className="p-6 text-gray-900">
                          
                            <table border="1" style={{ width: '100%', textAlign: 'left' }}>
                                <thead>
                                    <tr>
                                        <th style={{width: '15%'}}>Date</th>
                                        <th style={{width: '15%'}}>Location</th>
                                        <th style={{width: '50%'}}>Members</th>
                                        <th style={{width: '20%'}}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {baddyAttendances.map(attendance => (
                                        <tr key={attendance.id}>
                                            <td>{attendance.session_date}</td>
                                            <td>{attendance.session_location}</td>
                                            <td>
                                            {attendance.members.map((member)=> member.name).join(", ")}
                                            </td>
                                            <td>
                                                <Link href={route('baddy_attendances.edit', attendance.id)}
                                                    className='font-medium text-red-600 dark:text-red-500 hover:underline mx-1' >
                                                    Edit
                                                </Link>
                                                <button onClick={(e) => deleteItem(attendance)}
                                                className='font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1'>
                                                    Delete
                                                </button>
                                           
                                            </td>
                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}