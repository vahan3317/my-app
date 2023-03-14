import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Create from "./components/Create";
import Success from "./components/Success";


const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("id");
 

  useEffect(() => {
    const fetchUsers = async () => {
      
      try {
        const response = await axios.get("https://test-assignment.emphasoft.com/api/v1/users/", {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data)
       
        setTimeout(() => {
        setUsers(response.data);
     
        setLoading(false);
      }, 400); 
      
      } catch (error) {
        setError("Ошибка при загрузке пользователей");
        setLoading(false);
      }
      
    };
    
    fetchUsers();
  }, []);




  
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`https://test-assignment.emphasoft.com/api/v1/users/${id}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      setError('Ошибка при удалении пользователя');
    }
  };
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (sortBy === "id") {
      return a.id - b.id;
    } else if (sortBy === "name") {
      return a.username.localeCompare(b.username);
    }
  });


  if (loading) {
    return <div>
      <div class="flex items-center justify-center space-x-2">
  <div
    class="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-primary opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
    role="status">
    <span
      class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Loading...</span
    >
  </div>
  <div
    class="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-secondary opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
    role="status">
    <span
      class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Loading...</span
    >
  </div>
  <div
    class="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-success opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
    role="status">
    <span
      class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Loading...</span
    >
  </div>
  <div
    class="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-danger opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
    role="status">
    <span
      class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Loading...</span
    >
  </div>
  <div
    class="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-warning opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
    role="status">
    <span
      class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Loading...</span
    >
  </div>
  <div
    class="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-info opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
    role="status">
    <span
      class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Loading...</span
    >
  </div>
  <div
    class="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-neutral-100 opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
    role="status">
    <span
      class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Loading...</span
    >
  </div>
</div>
    </div>
  }

  if (error) {
    return <div class="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <span class="font-medium">{error}</span>, Aвторизуйтесь,чтобы увидеть :)
       </div>;
  }

  return (
    <>
  
    
    
     <div className="mb-4 text-right pr-4 flex justify-end items-center  ">
      

    
            <label htmlFor="filter" className="pr-4">Поиск по имени пользователя </label>
            <span><svg fill="currentColor" className="w-[22px]" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path clip-rule="evenodd" fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"></path>
</svg> </span>
            <input
            className=" appearance-none border-none rounded  w-1/8   bg-gray-300  text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="filter"
              value={filter}
              onChange={handleFilterChange}
            />
            
          </div>
          <div className="mb-4 text-right pr-4">
            
            <select id="sortBy" value={sortBy} onChange={handleSortByChange} className="shadow bg-gray-300 appearance-none border-none rounded w-1/8 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
              <option value="id">По ID</option>
              <option value="name">По имени</option>
            </select>
          </div>

          <Create />
          
   
   <div className="w-full h-full flex justify-center items-center  mt-8  ">
  
      <div class="  grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-4 xl:grid-cols-5 xl:gap-6 ">

     {sortedUsers.map((user) => (
<div key={user.id} class=" p-6 bg-[#F3FAF7] text-center border  rounded-lg shadow  hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-400 hover:border-green-300 hover:border  dark:bg-gray-800 dark:border-gray-700">
<a href="#">
        <span class="mb-2  flex justify-between items-center font-bold tracking-tight text-gray-900 dark:text-white">Идентификатор <input type="text" disabled className="w-[60px] text-center bg-[#F3FAF7] shadow rounded border-none" placeholder={user.id} /> </span>
    </a>

   
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"><input type="text" className="w-full mt-4 text-center    border-none" disabled placeholder={user.username} /> </p>
    <div className="flex w-full justify-between">
    <Link to={`/user/${user.id}`}> <a href="#" class="inline-flex items-center text-black transition ease-in-out delay-100 hover:border-green-300 hover:border    px-3 py-2 text-sm font-medium text-center   rounded-lg hover:bg-[#BCF0DA] focus:ring-4 focus:outline-none focus:ring-[#DEF7EC] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
       Узнать больше
        <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </a></Link>

    <button
            className='bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            onClick={() => handleDeleteUser(user.id)}
          >
            Delete
          </button>
          
          </div>
          
</div>

 ))}
    </div>
    
   </div>
    </>
  );
};

export default App;
