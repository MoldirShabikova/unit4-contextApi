import { useState, useContext } from 'react'
import AuthContext from '../store/authContext';
import axios from 'axios'

const url = "https://socialmtn.devmountain.com";
const Auth = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(true)
 
    const authCtx = useContext(AuthContext)
    
   const submitHandler = e => {
       e.preventDefault()

     const body = {
       username,
       password,
     };

       axios.post(register ? `${url}/register` : `${url}/login`, body)
           .then(( res  ) => {
            console.log('after auth', res.data)
            authCtx.login(res.data.token, res.data.exp, res.data.userId);

               
           })
           .catch(err => {
               
               setPassword('')
               setUsername('')
               console.log(err)
           })
       
    
       
       console.log('submitHandler called')
       console.log(username, password)
       
   }

   return (
     <main>
       <h1>Welcome!</h1>
       <form className="form auth-form" onSubmit={submitHandler}>
         <input
           type="text"
           className="form-input"
           placeholder="name"
           value={username}
           onChange={(e) => setUsername(e.target.value)}
         />
         <input
           type="password"
           className="form-input"
           placeholder="password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
         />
         <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
       </form>
       <button className="form-btn">
         Need to {register ? "Login" : "Sign Up"}?
       </button>
     </main>
   );
}
 
export default Auth