import React, { useEffect, useState } from 'react';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
  Search,
} from '@syncfusion/ej2-react-grids';
import { supabase } from '../supabaseClient';
import { Header } from '../components';

const Customers = () => {
  const [customersData, setCustomersData] = useState([]);

  const fetchCustomersData = async () => {
    const { data, error } = await supabase.from('Clientes').select('*');
    if (data) {
      setCustomersData(data);
    } else {
      console.error('Error fetching customers data:', error);
    }
  };

  useEffect(() => {
    fetchCustomersData();
  }, []);

  const selectionsettings = { persistSelection: true, type: 'multiple' }; // or 'Multiple' for multiple selection
  const toolbarOptions = ['Delete', 'Add', 'Search', 'Edit'];
  const editing = {
    allowDeleting: true,
    allowEditing: true,
    allowAdding: true,
    allowSearching: true,
  };

  const handleActionBegin = async (args) => {
    if (args.requestType === 'save') {
      if (args.action === 'add') {
        // Handle adding a new record
        const { _, error } = await supabase
          .from('Clientes')
          .insert([
            {
              Nombre: args.data.Nombre,
              Correo: args.data.Correo,
              Edad: args.data.Edad,
              Genero: args.data.Genero,
              Telefono: args.data.Telefono,
              Fech_Inscripcion: new Date().toISOString(),
            },
          ]);
        if (error) {
          console.error('Error adding new record:', error);
        } else {
          fetchCustomersData();
        }
      } else if (args.action === 'edit') {
        // Handle updating an existing record
        const { _, error } = await supabase
          .from('Clientes')
          .update({
            Nombre: args.data.Nombre,
            Correo: args.data.Correo,
            Edad: args.data.Edad,
            Genero: args.data.Genero,
            Telefono: args.data.Telefono,
          })
          .match({ id: args.data.id }); // Using 'id' as the primary key
        if (error) {
          console.error('Error updating record:', error);
        } else {
          fetchCustomersData();
        }
      }
    } else if (args.requestType === 'delete') {
      // Handle deleting a record
      const { _, error } = await supabase
        .from('Clientes')
        .delete()
        .match({ id: args.data[0].id }); // Using 'id' as the primary key
      if (error) {
        console.error('Error deleting record:', error);
      } else {
        fetchCustomersData();
      }
    }
  };
  
  

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <GridComponent
        dataSource={customersData}
        enableHover={true}
        allowPaging
        primaryKeyField="id" // Add this line to specify the primary key field
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
        actionBegin={handleActionBegin}
      >
        <ColumnsDirective>
        <ColumnDirective field="id" headerText="ID" width="100" textAlign="Right" isPrimaryKey={true} visible={false} />

          <ColumnDirective field="Nombre" headerText="Name" width="200" />
          <ColumnDirective field="Correo" headerText="Email" width="200" />
          <ColumnDirective field="Edad" headerText="Age" width="100" textAlign="Right" />
          <ColumnDirective field="Genero" headerText="Gender" width="120" />
          <ColumnDirective field="Telefono" headerText="Phone" width="150" />
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter, Search]} />
      </GridComponent>
    </div>
  );
  
  
  }  
export default Customers;
