import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import type { PageProps } from '@/types/app';
import type { PlayerStatus } from '@/types/tennis';
import {route} from 'ziggy-js';

interface Props extends PageProps {}

export default function Create({ auth }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        status: 'provisional' as PlayerStatus,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route('tennis.players.store'));
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Player" />

            <div className="p-6 max-w-xl">
                <h1 className="text-2xl font-bold mb-6">
                    Create Tennis Player
                </h1>

                <form onSubmit={submit} className="space-y-4">

                    <div>
                        <label className="block mb-1">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) =>
                                setData('name', e.target.value)
                            }
                            className="w-full border rounded p-2"
                        />
                        {errors.name && (
                            <div className="text-red-500 text-sm">
                                {errors.name}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1">Status</label>
                        <select
                            value={data.status}
                            onChange={(e) =>
                                setData('status', e.target.value as PlayerStatus)
                            }
                            className="w-full border rounded p-2"
                        >
                            <option value="provisional">Provisional</option>
                            <option value="ranked">Ranked</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Create Player
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}