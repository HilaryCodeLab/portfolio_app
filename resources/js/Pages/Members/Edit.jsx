import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head, Link } from '@inertiajs/react';



export default function Edit({ auth, member, baddyAttendances }) {

    const { data, setData, post, errors, reset, processing } = useForm({
        name: member.name,
        gender: member.gender,
        amount: member.amount,
        addOnAmount: member.addOnAmount,
        total: member.total,
        _method: "PUT",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("members.update", member.id));

    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Member - id: {member.id}</h2>}>

            <Head title="Edit Member" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow sm:rounded-lg p-6">
                        <form className="max-w-md mx-auto" onSubmit={submit}>
                            {/* Member Name */}
                            <div className="mb-5">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                                    Name:
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            {/* Member Gender */}
                            <div className="mb-5">
                                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                                    Gender:
                                </label>
                                <select
                                    name="gender"
                                    id="gender"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={data.gender}
                                    onChange={(e) => setData('gender', e.target.value)}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                <InputError message={errors.gender} className="mt-2" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                                    Amount 
                                </label>
                                <input
                                    type="number"
                                    id="amount"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={data.amount}
                                    onChange={(e) => setData('amount', e.target.value)}
                                />
                                <InputError message={errors.amount} className="mt-2" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="addOnAmount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                                    Add-on Amount
                                </label>
                                <input
                                    type="number"
                                    id="addOnAmount"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={data.addOnAmount}
                                    onChange={(e) => setData('addOnAmount', e.target.value)}
                                />
                                <InputError message={errors.addOnAmount} className="mt-2" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="total" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                                    Total Owed $
                                </label>
                                <input
                                    type="number"
                                    id="total"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={data.total}
                                    readOnly
                                />
                            </div>
                            {/* Baddy Attendances */}
                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                                    Total Baddy Attendances: {baddyAttendances.length}
                                </label>
                                <ul className="list-disc pl-5">
                                    {baddyAttendances.length > 0 ? (
                                        baddyAttendances.map((baddyAttendance) => (
                                            <li key={baddyAttendance.id} className="mt-1">
                                                {baddyAttendance.session_date} - {baddyAttendance.session_location}
                                            </li>
                                        ))
                                    ) : (
                                        <li>No attendances found</li>
                                    )}
                                </ul>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end items-center space-x-4 mt-6">
                                <Link href={route('members.index')} className="text-sm text-gray-600 hover:text-gray-900 py-2 px-4 border border-gray-300 rounded-md">
                                    Cancel
                                </Link>
                                <PrimaryButton className="bg-black text-white py-2 px-4 rounded-md shadow hover:bg-gray-800 transition-all" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );

}