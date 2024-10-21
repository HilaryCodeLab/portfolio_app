import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {

    const { data, setData, post, errors, processing, reset } = useForm({
        name: "",
        gender: "",
        amount: 10,
        addOnAmount: 0,

    });

    const onSubmit = (e) => {
        e.preventDefault();
        setData('total', ((data.amount * data.baddyAttendancesCount) + data.addOnAmount));
        post(route("members.store"), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-black-800 dark:text-black-200 leading-tight">
                        Create New Member
                    </h2>
                </div>
            }
        >
            <Head title="Members" />
            <div className="py-12">
                <div className="max-w-md mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white shadow sm:rounded-lg"
                        >
                            <div className="mt-4">
                                <InputLabel htmlFor="member_name" value="Member Name" />
                                <TextInput
                                    id="member_name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    isFocused={true}
                                    onChange={(e) => setData("name", e.target.value)}
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="mt-4 ">
                                <InputLabel htmlFor="member_gender" value="Gender" />
                                <select
                                    name="gender"
                                    id="member_gender"
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    onChange={(e) => setData("gender", e.target.value)}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                <InputError message={errors.gender} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="amount" value="amount" />
                                <TextInput
                                    id="amount"
                                    type="number"
                                    name="amount"
                                    value={data.amount}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    isFocused={true}
                                    onChange={(e) => setData("amount", e.target.value)}
                                />
                                <InputError message={errors.amount} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="addOnAmount" value="addOnAmount" />
                                <TextInput
                                    id="addOnAmount"
                                    type="number"
                                    name="addOnAmount"
                                    value={data.addOnAmount}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    isFocused={true}
                                    onChange={(e) => setData("addOnAmount", e.target.value)}
                                />
                                <InputError message={errors.addOnAmount} className="mt-2" />
                            </div>
                            <div className="mt-6 md:w-1/2">
                                <PrimaryButton className="mt-4" disabled={processing}>Create</PrimaryButton>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}