import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, Head, router } from '@inertiajs/react';


export default function Index({ auth, baddyAttendances }) {

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

    const deleteItem = (attendance) => {
        if (!window.confirm("Are you sure you want to delete?")) {
            return;
        }
        router.delete(route("baddy_attendances.destroy", attendance.id));
    }

    const hasAction = baddyAttendances.data.some(baddyAttendance => baddyAttendance.user_id === auth.user.id);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Attendances</h2>}>
            <Head title="baddy attendances" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Link
                        className="inline-flex items-center px-4 py-2 mb-6 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700"
                        href={route('baddy_attendances.create')}
                    >
                        <span className="mr-2">Create</span>
                        <span className="hidden md:inline"> Attendance</span>
                    </Link>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        <div className="p-6 text-gray-900">

                            {/* Mobile: one card per session (below md). The members
                                list is long, so give it its own full-width row. */}
                            <div className="space-y-4 md:hidden">
                                {baddyAttendances.data.map(attendance => {
                                    const hasMembers = attendance.members.some(member => member.name);
                                    if (!hasMembers) return null;
                                    return (
                                        <div
                                            key={attendance.id}
                                            className="rounded-lg border border-gray-300 p-4"
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <span className="text-lg font-semibold text-gray-900">
                                                    {attendance.session_date}
                                                </span>
                                                <span className="rounded bg-gray-100 px-2 py-1 text-sm font-medium text-gray-700">
                                                    {attendance.session_location}
                                                </span>
                                            </div>

                                            <div className="mt-3 text-sm">
                                                <p className="text-gray-500">Members</p>
                                                <p className="mt-1 font-medium text-gray-900">
                                                    {attendance.members.map((member) => member.name).join(", ")}
                                                </p>
                                            </div>

                                            {attendance.user_id === auth.user.id && (
                                                <div className="mt-4 flex gap-4 border-t border-gray-100 pt-3">
                                                    <Link href={route('baddy_attendances.edit', attendance.id)}
                                                        className='font-medium text-red-600 hover:underline'>
                                                        Edit
                                                    </Link>
                                                    <button onClick={() => deleteItem(attendance)}
                                                        className='font-medium text-blue-600 hover:underline'>
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Desktop: the full table (md and up). */}
                            <div className="hidden overflow-x-auto md:block">
                                <table border="1" style={{ width: '100%', textAlign: 'center' }}>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '15%' }}>Date</th>
                                            <th style={{ width: '15%' }}>Location</th>
                                            <th style={{ width: '50%' }}>Members</th>
                                            {hasAction && <th style={{ width: '20%' }}>Actions</th>}

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {baddyAttendances.data.map(attendance => {
                                            const hasMembers = attendance.members.some(member => member.name);
                                            if (!hasMembers) return null;
                                            return (
                                                <tr key={attendance.id}>
                                                    <td>{attendance.session_date}</td>
                                                    <td>{attendance.session_location}</td>
                                                    <td>
                                                        {attendance.members.map((member) => member.name).join(", ")}
                                                    </td>
                                                    {
                                                        attendance.user_id === auth.user.id &&
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
                                                    }
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center space-x-2 p-4">
                        <button
                            className={`px-2 py-1 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 transition duration-200`}
                            onClick={() => baddyAttendances.prev_page_url && router.visit(baddyAttendances.prev_page_url)}
                            disabled={!baddyAttendances.prev_page_url}>
                            Previous
                        </button>
                        <span> Page {baddyAttendances.current_page} of {baddyAttendances.last_page} </span>
                        <button
                            className={`px-2 py-1 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 transition duration-200`}
                            onClick={() => baddyAttendances.next_page_url && router.visit(baddyAttendances.next_page_url)}
                            disabled={!baddyAttendances.next_page_url}>
                            Next
                        </button>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}