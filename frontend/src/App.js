import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import './styles/output.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function App() {

  const [pendingItem, setPendingItem] = useState([]);
  const [todoitem, setToDoItem] = useState();

  const fetchData = async () => {
    const result = await axios.get('http://localhost:5000/api/getAll');
    setPendingItem(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDelete = async (id) => {
    try {
      const result = await axios.post('http://localhost:5000/api/delete/' + id);
      toast.success("Item is deleted");
      fetchData();
    } catch (err) {
      console.log(err);
      toast.error("Item is not deleted");
    }
  }

  const onAdd = async (todoitem) => {
    try {
      const itemObj = {
        itemName: todoitem.todoitem
      }
      const result = await axios.post('http://localhost:5000/api/add', itemObj);
      toast.success("Item is added");
      fetchData();
    } catch (err) {
      console.log(err);
      toast.error("Item is not added");
    }
  }

  return (
    <div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <Toaster />
      <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div class="mb-4">
          <h1 class="text-grey-darkest">Todo List</h1>
          <div class="flex mt-4">
            <input class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" onChange={(e) => setToDoItem(e.target.value)}></input>
            <button class="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal" onClick={() => onAdd({ todoitem })}>Add</button>
          </div>
        </div>
        <div>
          {pendingItem.map(item => (
            <React.Fragment>
              <div class="flex mb-4 items-center">
                <p class="w-full text-grey-darkest">{item.itemName}</p>
                <button class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red" onClick={() => onDelete(item._id)}>Remove</button>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
