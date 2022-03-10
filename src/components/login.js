import React,{useState,Component} from 'react'

const LoginForm = ()=>{
    return (
        <>
        <input type="text" className='rounded-md p-2' placeholder='username' name="username" id="username"></input>
        <input type="password" className='rounded-md p-2 mt-4' placeholder='password' name="password" id="password"></input>
        </>
    )
}
const MfaForm = ()=>{
    return (
        <>
        <input className='rounded-md p-2' id="code" type="number" name="mfa" placeholder='2FA code'></input>
        </>
    )
}
class LoginClass extends Component{
    constructor(props){
        super(props);
        this.state = {
            mfa:0,
            cookie:[],
            error:"",
            loading:0
        }
        this.submitHandler = this.submitHandler.bind(this)
    }
    setLocal(request){
        const date= new Date
        let expires = date.getTime() + 57*60000
        localStorage.setItem("authToken",JSON.stringify({"value":request.authToken,"expires":expires}))
        localStorage.setItem("entToken",request.entToken)
        localStorage.setItem("sub",request.sub)
    }
    async submitHandler(e){
        e.preventDefault()
        if(this.state.mfa == 0){
            let username = document.getElementById("username").value
            let password = document.getElementById("password").value
            this.setState({loading:1})
            const response = await fetch(this.props.url+"/auth",{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({"username":username,"password":password})
            })
            const jsonResponse = await response.json()
            this.setState({loading:0})
            if(jsonResponse.authToken){
                this.setLocal(jsonResponse)
                this.props.stateFn(2)
            }else if(jsonResponse.error){
                console.log(jsonResponse.error)
                this.setState({error:jsonResponse.error})
            }else{
                this.setState({mfa:1,cookie:jsonResponse.cookie})
            }
        }else{
            let code = document.getElementById("code").value
            const mfaResponse = await fetch(this.props.url+"/auth",{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"code":code,"cookie":this.state.cookie})
            })
            const jsonMfa = await mfaResponse.json()
            if(jsonMfa.authToken){
                this.setLocal(jsonMfa)
                this.props.stateFn(2)
            }
        }
    }
    loginForm(){
        return(
            <>
                
                <form onSubmit={this.submitHandler} className="flex flex-col">
                    {this.state.mfa ? <MfaForm/>:<LoginForm/>}
                    <button className='bg-bgblue p-2 rounded-md mt-8 mb-4 text-slate-modelblue' id="loginButton" type="submit" value="Submit">Submit</button>
                    {this.state.error == "" ? void(0): <h1 className='text-center text-red-400'>{this.state.error}</h1>}
                </form>
            </>
        )
    }
    Loading(){
        return(
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        )
    }
    render(){
        const notLoading = 'p-12 flex-col bg-modelblue rounded-md items-center justify-center flex min-w-[20rem] min-h-[20rem]'
        const loading = 'p-12 flex-col bg-modelblue rounded-md items-center justify-center flex min-w-[10rem] min-h-[10rem]'
        return(
            <div className={this.state.loading == 0 ? notLoading : loading} id="loginForm">
                <h1 className='text-center font-bold pb-8 text-slate-100 text-2xl'>HELLO THERE !</h1>
                {this.state.loading == 0 ? this.loginForm():this.Loading()}

            </div>
        )
    }
}

export default LoginClass