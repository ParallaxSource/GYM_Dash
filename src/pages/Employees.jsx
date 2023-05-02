import React, { useState, useEffect } from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { supabase } from '../supabaseClient';
import { Header } from '../components';

const Employees = () => {
  const toolbarOptions = ['Add', 'Edit', 'Delete', 'Search'];
  const editing = { allowDeleting: true, allowEditing: true, allowAdding: true, allowSearching: true };

  const [employeeData, setEmployeeData] = useState([]);

  const employeesGrid = [
    { field: 'id', headerText: 'ID', width: 100, textAlign: 'Right', isPrimaryKey: true, visible: false },
    { field: 'Nombre', headerText: 'Name', width: 150 },
    { field: 'Correo', headerText: 'Email', width: 250 },
    { field: 'Edad', headerText: 'Age', width: 100, textAlign: 'Right' },
    { field: 'Telefono', headerText: 'Phone', width: 150 },
    { field: 'Especialidad', headerText: 'Specialty', width: 200 },
  ];

  useEffect(() => {
    let isMounted = true;

    const fetchEmployees = async () => {
      try {
        const { data, error } = await supabase.from('Especialistas').select('*'); // Include 'id' field when fetching data
        if (error) {
          throw error;
        }
        if (isMounted) {
          setEmployeeData(data);
        }
      } catch (error) {
        console.error('Error fetching employees:', error.message);
      }
    };

    fetchEmployees();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleActionComplete = async (args) => {
    if (args.requestType === 'save') {
      if (args.action === 'add') {
        // Add new record to the database
        await supabase.from('Especialistas').insert([
          {
            Nombre: args.data.Nombre,
            Correo: args.data.Correo,
            Edad: args.data.Edad,
            Telefono: args.data.Telefono,
            Especialidad: args.data.Especialidad,
          },
        ]);
      } else if (args.action === 'edit') {
        // Update existing record in the database
        await supabase.from('Especialistas').update(args.data).match({ id: args.data.id });
      }
    } else if (args.requestType === 'delete') {
      // Delete record from the database
      await supabase.from('Especialistas').delete().match({ id: args.data[0].id });
    }
  };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Página" title="Especialistas" />
      <GridComponent
        dataSource={employeeData}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
        actionComplete={handleActionComplete}
      >
        <ColumnsDirective>
          <ColumnDirective field="id" headerText="ID" width="100" textAlign="Right" isPrimaryKey={true} visible={false} />
          {employeesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Search, Page, Toolbar, Sort, Filter]} />
      </GridComponent>
    </div>
  );
  
};

export default Employees;
