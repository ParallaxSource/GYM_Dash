import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://lfoccfxkvmxldsuetqtq.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxmb2NjZnhrdm14bGRzdWV0cXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMwMTk1MzQsImV4cCI6MTk4ODU5NTUzNH0.svdZ0gaA3h4nEZx71pboNhQQCNfFM8V0p-gQ9XTRscQ");

const SupabaseTest = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    getClientes();
  }, []);

  async function getClientes() {
    try {
    
        let { data: Clientes, error } = await supabase
        .from('Clientes')
        .select('Nombre')

      
      if (error) throw error;
      
      setClientes(Clientes);
      console.log(Clientes);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  }
  

  return (
    
    <ul>
       <p>Hello</p>
      {clientes.map((cliente) => (
        <li key={cliente.Nombre}>{cliente.Nombre}</li>
      ))}
    </ul>
  );
};

export default SupabaseTest;
