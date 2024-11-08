import React from 'react';

export default function Attendance({ attendance }) {
    return (
        <div className="card">
            <DataTable tableStyle={{ minWidth: '50rem' }}>
                <Column field="code" header="Code"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="quantity" header="Quantity"></Column>
            </DataTable>
        </div>


        

    );
}