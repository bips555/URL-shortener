import * as React from "react";
import axios, { AxiosError } from "axios";
import { serverUrl } from "../../helpers/Constants";
import { Alert } from "flowbite-react";
interface IFormContainerProps {
  updateReloadState:()=>void
}
interface ErrorResponse{
  message:string,
 
}
const FormContainer: React.FunctionComponent<IFormContainerProps> = (props) => {
  const {updateReloadState} = props
  const [fullUrl, setFullUrl] = React.useState<string>("");
  const [error, setError] = React.useState<string>('');
  
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError('')
     const res =await axios.post(`${serverUrl}/URLshortener`, {
        fullUrl: fullUrl,
      })
      updateReloadState()
   if(res.status === 201){
        setFullUrl("")
   }
   
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>
      if (axiosError.response && axiosError.response.status === 409) {
        setError(axiosError.response.data.message)
    }
    else{
      console.log(axiosError)
    }
  }
  }
  return (
    <>
      <div className="container mx-auto p-2">
        <div className="bg-banner my-8 rounded-xl bg-center bg-cover">
          <div className="w-full h-full rounded-xl p-20 backdrop-brightness-50">
            <h2 className="text-white text-4xl text-center pb-4">
              Url Shortener
            </h2>
            <p className="text-white text-center pb-2 text-xl font-extralight">
              Paste your Link.
            </p>
            <p className="text-white text-center font-thin text-sm pb-4">
              Free tool to shorten a Url and reduce link .{" "}
            </p>
            <form onSubmit={handleSubmit}>
              <div className="flex">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none text-slate-800">
                    urlShortener.link{" "}
                  </div>{" "}
                  <input
                    type="text"
                    placeholder="add your link"
                    required
                    className="block w-full p-4 ps-32 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                    value={fullUrl}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFullUrl(e.target.value)
                    }
                  />
                  <button
                    type="submit"
                    className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-lg border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Shorten URL
                  </button>
                </div>
              </div>
            </form>
        

          </div>
       
        </div>
       {error && <Alert color='failure'>{error}</Alert>}
      </div>
    </>
  );
};

export default FormContainer;
