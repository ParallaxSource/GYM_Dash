import React, { useState } from 'react';
import { Dialog } from '@syncfusion/ej2-react-popups';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { GridComponent, ColumnDirective, ColumnsDirective } from '@syncfusion/ej2-react-grids';
import { useRef } from 'react';

import { css } from '@emotion/react';
import { supabase } from '../supabaseClient';
import NoStrictModeDialog from './NoStrictModeDialog';

const buttonStyle = css`
background-color: #f2f2f2;
  color: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;

  &:hover {
    background-color: #d9d9d9;
  }
`;

const tableStyle = css`
  margin-top: 40px;
`;

const containerStyle = css`
  max-width: 100%;
  overflow-x: auto;
`;

function AirRequest() {
  const transitionRef = useRef();

  const [response, setResponse] = useState('');

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goal, setGoal] = useState('');
  const [days, setDays] = useState('');
  const [userFound, setUserFound] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openNotFoundDialog, setOpenNotFoundDialog] = useState(false);




   // Add a state variable for the search term
   const [searchTerm, setSearchTerm] = useState('');
// Add an async function to fetch user data from Supabase
const fetchUserData = async () => {
  try {
    const { data, error } = await supabase
      .from('Clientes')
      .select('*')
      .filter('Nombre', 'eq', searchTerm);

    if (error) {
      throw error;
    }

    if (data && data.length === 1) {
      console.log('User data:', data[0]);
      setUserFound(true);
      setOpenDialog(true);
    } else {
      console.log('No user found with the given name');
      setUserFound(false);
      setOpenNotFoundDialog(true); // Open the "User Not Found" dialog
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Close pop up
const handleCloseDialog = () => {
  setOpenDialog(false);
};
  

  const handleAskQuestion = async () => {
    try {
      const res = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
          prompt: `Act like a professional Trainer,write a gym routine in a list format for ${days}  days of trainning, with necessary exercises for a person with a weight of ${weight} kilos, a height of ${height} meters, with the aim of ${goal}`,
          model: 'text-davinci-002',
          max_tokens: 550,
        })
      });

      const data = await res.json();
      setResponse(data.choices[0].text);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error: ' + error.message);
    }
  };

  const parseResponse = () => {
    // Parse the response into an array of rows and columns
    const rows = response.trim().split('\n');
    const columns = rows[0].split('\t');
    const data = rows.slice(1).map(row => row.split('\t'));

    // Return the table data as an object
    return {
      columns,
      data
    };
  };

  const renderTable = () => {
    const tableData = parseResponse();

    // Render the table only if there is data
    if (tableData.data.length > 0) {
      return (
        <GridComponent dataSource={tableData.data} css={containerStyle}>
          <ColumnsDirective>
            {tableData.columns.map((column, index) => (
              <ColumnDirective key={index} field={column} headerText={column} />
            ))}
          </ColumnsDirective>
        </GridComponent>
      );
    }

    return null;
  };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <h2 className="text-center mb-5">Generador de Rutina</h2>
  
      <TextBoxComponent
        cssClass="w-full mb-5"
        placeholder="Search User"
        value={searchTerm}
        change={(event) => setSearchTerm(event.value)}
        keyPress={(event) => event.originalEvent.key === 'Enter' && fetchUserData()}
      />
  
      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/2">
          <TextBoxComponent
            cssClass="w-full mb-5"
            placeholder="Weight"
            value={weight}
            change={(event) => setWeight(event.value)}
          />
        </div>
        <div className="w-full sm:w-1/2">
          <TextBoxComponent
            cssClass="w-full mb-5"
            placeholder="Height"
            value={height}
            change={(event) => setHeight(event.value)}
          />
        </div>
        <div className="w-full sm:w-1/2">
          <TextBoxComponent
            cssClass="w-full mb-5"
            placeholder="Goal"
            value={goal}
            change={(event) => setGoal(event.value)}
          />
        </div>
        <div className="w-full sm:w-1/2">
          <TextBoxComponent
            cssClass="w-full mb-5"
            placeholder="Training Days"
            value={days}
            change={(event) => setDays(event.value)}
          />
        </div>
      </div>
  
      <div className="text-center mb-5">
        <ButtonComponent css={buttonStyle} onClick={handleAskQuestion}>
          Generador de Rutina
        </ButtonComponent>
      </div>
  
      {renderTable()}
  
      <NoStrictModeDialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionProps={{ ref: transitionRef }}
      >
        <h3 id="alert-dialog-title">{"User Found"}</h3>
        <p id="alert-dialog-description">
          A user with the given name has been found. Check the console for user data.
        </p>
        <button onClick={handleCloseDialog}>
          Close
        </button>
      </NoStrictModeDialog>
  
      <NoStrictModeDialog
        open={openNotFoundDialog}
        onClose={() => setOpenNotFoundDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <h3 id="alert-dialog-title">{"User Not Found"}</h3>
        <p id="alert-dialog-description">
          No user was found with the given name. Please try again.
        </p>
        <button onClick={() => setOpenNotFoundDialog(false)}>
          Close
        </button>
      </NoStrictModeDialog>
    </div>
  );

}

export default AirRequest;
