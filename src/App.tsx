import { useState } from 'react'
import { Button } from "@/components/ui/button";
import { useEffect } from 'react';
import { supabase } from "@/lib/supabaseClient";
import type { PostgrestError } from '@supabase/supabase-js';

function App() {
  const [count, setCount] = useState(-1);

  // useEffect(() => {
  //   getClicks();
  // }, []);

  async function handleClick() {
    const { data, error } = await supabase.from('clicks').select('numClicks').single();

    if(error) {
      console.error(error);
      return;
    }

    const newCount = data.numClicks + 1;

    await supabase.from('clicks').insert({ numClicks: newCount });
    setCount(newCount);
  }

  return (
    <>
      <section id="center">
        
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <Button
          type="button"
          className="counter"
          onClick={() => handleClick()}
        >
          Count is {count}
        </Button>
      </section>

    </>
  )
}

export default App;
