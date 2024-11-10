import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, Head, router } from '@inertiajs/react';
import TextInput from "@/Components/TextInput";
import {Inertia} from '@inertiajs/inertia';
import _ from "lodash";

export default function Index({ auth, members, search, sortField, sortDirection }) {

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

    const deleteItem = (member) => {
        if (!window.confirm("Are you sure you want to delete?")) {
            return;
        }
        router.delete(route("members.destroy", member.id));
    }

    const [searchQuery, setSearchQuery] = useState("");
    // const [searchQuery, setSearchQuery] = useState(search || '');
    const [sortBy, setSortBy] = useState(sortField || 'name');
    const [direction, setDirection] = useState(sortDirection || 'asc');

    const handleSearch = _.debounce((query) =>{
        Inertia.get(route('members.index'), {
            search: query,
        },{
            preserveState: true,
            replace: true,
        });

    }, 500);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        handleSearch(e.target.value);
    }

    // const handleSearchChange = (e) => {
       
    //     setSearchQuery(e.target.value);
    //     Inertia.get(route('members.index'), {
    //         search: e.target.value,
    //         sortField: sortBy,
    //         sortDirection: direction,

    //     }, {
    //         preserveState: true,
    //         replace: true,
    //     });
    // };

    const handleSortChange = (field, dir) => {
        setSortBy(field);
        setDirection(dir);
        Inertia.get(route('members.index'), {
            search: searchQuery,
            sortField: field,
            sortDirection: dir,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    return (

        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Members</h2>}>
            <Head title="Members" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between mb-4">
                        <PrimaryButton style={buttonStyle}>
                            <Link
                                href={route('members.create')}
                            >
                                <span>Create</span>
                                <span className="hidden md:inline"> Member</span>
                            </Link>
                        </PrimaryButton>

                        <TextInput
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="search name or gender here"
                            style={buttonStyle}
                            className="border px-2 py-1 rounded"
                        />
                        <div className="flex space-x-2">
                            <select value={sortBy} onChange={(e)=>handleSortChange(e.target.value, direction)}
                                style={buttonStyle}
                                className="border px-2 py-1 rounded">
                                    <option value="name">Name</option>
                                    <option value="gender">Gender</option>
                                    <option value="total">Highest Total</option>
                            </select>
                            <select value={direction} onChange={(e)=>handleSortChange(sortBy, e.target.value)}
                                style={buttonStyle}
                                 className="border px-2 py-1 rounded">
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                            </select>

                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        <div className="p-6 text-gray-900">

                            <table border="1" style={{ width: '100%', textAlign: 'left' }}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Gender</th>
                                        <th>Total Attendance</th>
                                        {/* <th>Add On</th> */}
                                        <th>Amount Owed</th>
                                        {/* <th>Members</th> */}
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {members.map(member => (
                                        <tr key={member.id}>
                                            <td>{member.name}</td>
                                            <td>{member.gender}</td>
                                            <td>{member.baddy_attendances_count}</td>
                                            {/* <td>$ {member.addOnAmount}</td> */}
                                            <td>$ {member.total.toFixed(2)}</td>

                                            {/* <td>{attendance.members}</td> */}
                                            <td>
                                                <Link
                                                    href={route('members.edit', member.id)}
                                                    className='font-medium text-red-600 dark:text-red-500 hover:underline mx-1' >
                                                    Edit
                                                </Link>
                                                <button onClick={(e) => deleteItem(member)}
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