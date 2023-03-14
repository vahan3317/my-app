import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';


const UserDetail = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const { id } = useParams();
const token = localStorage.getItem("token")
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://test-assignment.emphasoft.com/api/v1/users/${id}/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Ошибка при загрузке пользователя");
        }
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleEditClick = () => {
    setEditMode(true);
    setEditedUser(user);
  };

  const handleInputChange = (event) => {
    setEditedUser({ ...editedUser, [event.target.name]: event.target.value });
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!token) {
      alert("Token is not defined");
      return;
    }
  
    try {
      await axios.put(
        `https://test-assignment.emphasoft.com/api/v1/users/${id}/`,
        editedUser,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            
          },
        }
      );
      setUser(editedUser);
      
      setEditMode(false);
      window.location.href='/'
    } catch (error) {
      console.log(error.response.data);
      setError("Failed to update user");
      window.location.reload()
      
      
      
    }
  };
  

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
  </div>;
  }

  if (error) {
    return <p>{error}</p>;

  }
  return (
    <div className=" mb-24 text-center w-1/4 p-6 bg-[#F3FAF7] shadow-xl mx-auto text-center    dark:bg-gray-800 dark:border-gray-700">
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <h1 className="pb-8">Редактирование идентификатора - {editedUser.id}</h1>
          <p>
            <label htmlFor="first_name">Имя</label>
            <input
            className="shadow appearance-none border-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="first_name"
              value={editedUser.first_name}
              onChange={handleInputChange}
            />
          </p>
        
          <p>
            <label htmlFor="last_name">Фамилия</label>
            <input
            className="shadow appearance-none border-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="last_name"
              value={editedUser.last_name}
              onChange={handleInputChange}
            />
          </p>
          <p>
            <label htmlFor="username">Имя пользователя</label>
            <input
            className="shadow appearance-none border-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="username"
              value={editedUser.username}
              onChange={handleInputChange}
            />
          </p>
         
          <div className="w-full flex mx-auto justify-between items-center  ">
            
          <button
    type="button"
    class="inline-block rounded bg-primary h-[40px] px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
    data-te-toggle="modal"
    data-te-target="#exampleModalCenter"
    data-te-ripple-init
    data-te-ripple-color="light">
    Сохранить
  </button>
  
  
<div
  data-te-modal-init
  class="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
  id="exampleModalCenter"
  tabindex="-1"
  aria-labelledby="exampleModalCenterTitle"
  aria-modal="true"
  role="dialog">
  <div
    data-te-modal-dialog-ref
    class="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
    <div
      class="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
      <div
        class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
        <h5
          class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
          id="exampleModalScrollableLabel">
          Напишите пароль 
        </h5>
        <button
          type="button"
          class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
          data-te-modal-dismiss
          aria-label="Close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="relative p-4">
      <p>
            
            <input
            className="shadow-xl border-green-300 appearance-none border rounded w-[80%] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
             
              onChange={handleInputChange}
            />
          </p>
      </div>
      <div
        class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
        <button
          type="button"
          class="inline-block rounded bg-green-200 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-green-800 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
          data-te-modal-dismiss
          data-te-ripple-init
          data-te-ripple-color="light" onClick={handleCancelClick}>
          Отменить
        </button>
        
        <button
          type="submit"
          class="ml-1 inline-block rounded bg-green-400 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
          data-te-ripple-init
          data-te-ripple-color="light">
          Изменить
        </button>
        
      </div>
    </div>
  </div>
</div>
        
            
            <button type="button" onClick={handleCancelClick}>
              Отменить
            </button>
           
          </div>
        </form >
      ) : (
        <div class="max-w-full  p-6 bg-[#F3FAF7] text-center bg-[#F3FAF7]    dark:bg-gray-800 dark:border-gray-700">
     <a href="#" className="flex justify-center">
        <h5 class="mb-2  font-bold tracking-tight  text-gray-900 dark:text-white">{user.is_active ?(<div className="flex items-center "><span  className="pr-4">Пользователь активен</span><div className="w-[20px]  h-[20px]  mx-auto  rounded-[50%] bg-[#84E1BC]"></div></div>):(<div className="flex items-center "><span  className="pr-4">Пользователь не активен</span><div className="w-[20px]  h-[20px]  mx-auto  rounded-[50%] bg-red-600"></div></div>)} <div  ></div></h5>
    </a>
    <p class="mb-3 font-bold text-gray-900 dark:text-gray-400">Имя пользователя<input disabled  className="w-1/2 text-center bg-[#F3FAF7] shadow rounded border-none" placeholder={user.username} /></p>
  

    <a href="#">
        <h5 class="mb-2  font-bold tracking-tight text-gray-900 dark:text-white">Имя <input disabled className="w-1/4 text-center bg-[#F3FAF7] shadow rounded border-none"  placeholder={user.first_name} /></h5>
    </a>

   
    <a href="#">
        <h5 class="mb-2  font-bold tracking-tight text-gray-900 dark:text-white"><input disabled className="w-full text-center bg-[#F3FAF7] shadow rounded border-none"  placeholder={user.is_superuser?"Суперпользователь ":" Не  Суперпользователь "} /></h5>
    </a>
    <a href="#">
        <h5 class="mb-2  font-bold tracking-tight text-gray-900 dark:text-white"> Последний вход<input disabled className="w-1/2 text-center bg-[#F3FAF7] shadow rounded border-none"  placeholder={user.last_login ?user.last_login:user.last_login} /></h5>
    </a>
   
    <p class="mb-3 font-bold text-gray-900 dark:text-gray-400">Фамилия<input disabled className="w-[60px] text-center bg-[#F3FAF7] shadow rounded border-none"  placeholder={user.last_name} /></p>
    
    {user.id ===1?(<span className="text-bold text-red-500"> Вы вошли из этого аккаунта ,Вы не можете изменить этот аккаунт </span>):(<a href="#" onClick={handleEditClick} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
       Изменить
        <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </a>)} 
    
</div>
  )}



</div>

  )}
  export default UserDetail
