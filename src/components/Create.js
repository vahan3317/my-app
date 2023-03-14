import React,{useState} from 'react'
import axios from "axios";
import Success from './Success';

function Create() {
    const [isChecked, setIsChecked] = useState(false);
    const [error,setError] = useState("")
   const [showLoading, setShowLoading] = useState(true);
const [created,setCreated] =useState(false)

    
  
    const handleCheckboxChange =  (event) => {
    setIsChecked(event.target.checked);
  }

    const handleSubmit =  async (event) => {
        event.preventDefault();
       
        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;
        const firstName = event.target.elements.firstName.value;
        const lastName = event.target.elements.lastName.value;
        const isActive = isChecked;

       await createAccount(username, password, firstName, lastName,isActive);

      }
    
    
      const createAccount = async (username, password, firstName, lastName,isActive) => {
        try {
          const response = await axios.post(
            'https://test-assignment.emphasoft.com/api/v1/users/',
            {
                
              username,
              password,
              first_name: firstName,
              last_name: lastName,
              is_active: isActive,
            },
            {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }
          );
          setShowLoading(true)
          
          console.log(response.data);
          const res =response.data
          console.log("you create")
          window.location.href='/'
         
          setShowLoading(false) 
          
         
         

         
          
        } catch (error) {
         console.log(error.response.data.username)
         if(error.response.data.username ){
          setError(error.response.data.username)
         
         }
        }
      }
  return (
    
    <>
 

    <div className='flex justify-end pr-2 mb-2'>
        <button
    class="mr-1.5 inline-block rounded hover:bg-green-400 bg-green-200 text-green-700 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out  hover:text-white hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] ]"
    type="button"
    data-te-offcanvas-toggle
    data-te-target="#offcanvasRight"
    aria-controls="offcanvasRight"
    data-te-ripple-init
    data-te-ripple-color="light">
    Создать 
  </button>
  
  <div>
  
    </div>
  <div
    class="invisible fixed bottom-0 top-0 right-0 z-[1045] flex w-96 max-w-full translate-x-full flex-col border-none bg-white bg-clip-padding text-neutral-700 shadow-sm outline-none transition duration-300 ease-in-out dark:bg-neutral-800 dark:text-neutral-200 [&[data-te-offcanvas-show]]:transform-none"
    tabindex="-1"
    id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel"
    data-te-offcanvas-init>
    <div class="flex items-center justify-between p-4">
      <h5
        class="mb-0 font-semibold leading-normal"
        id="offcanvasRightLabel">
        Создание пользователя
      </h5>
      <button
        type="button"
        class="box-content rounded-none border-none opacity-50 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
        data-te-offcanvas-dismiss>
        <span
          class="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
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
        </span>
      </button>
    </div>
    <div class="offcanvas-body flex-grow overflow-y-auto p-4">
    <p className='text-red-300'> </p>
    <form onSubmit={handleSubmit}>
 
 <label>
   Username:{error?`${error}`:""}
   <input type="text" name="username" maxLength="150" pattern="^[\w.@+-]+$" required className="shadow appearance-none border rounded border-green-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
 </label><br />
 <label>
   First Name:
   <input type="text" name="firstName" maxLength="150" required className="shadow appearance-none border rounded border-green-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
 </label><br />
 <label>
   Last Name:
   <input type="text" name="lastName" maxLength="150" required className="shadow appearance-none border rounded border-green-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
 </label><br />
 <label>
   Password:
   <input type="password" name="password" maxLength="128" pattern="^(?=.*[A-Z])(?=.*\d).{8,}$" required className="shadow appearance-none border rounded border-green-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
 </label><br />
 <label>
   Active
   <input type="checkbox" name="isActive" value="true" className="w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
 </label><br />
 <button type="submit" className=" mt-4 bg-[#31C48D] hover:bg-[#0E9F6E] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Сохранить</button>
</form>


    </div>
  </div>
  
  </div>

  </>
  )
}

export default Create