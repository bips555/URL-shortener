import * as React from "react";
import { UrlData } from "../../Interface/Urldata";
import { Link } from "react-router-dom";
import { serverUrl } from "../../helpers/Constants";
import { AiFillDelete, AiFillCopy } from "react-icons/ai";
import axios from "axios"
import { Alert } from "flowbite-react";
interface IUrltableProps {
  data: UrlData[];
  updateReloadState: () => void;
}

const Urltable: React.FunctionComponent<IUrltableProps> = (props) => {
  const { data,updateReloadState } = props;
  const [deleteMessage,setDeleteMessage] = React.useState<string>('')
  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(`${serverUrl}/URLshortener/${url}`);
      alert(`URL copied: ${serverUrl}/URLshortener/${url}`);
    } catch (error) {
      console.log(error);

    }
  };
  React.useEffect(() => {
    if (deleteMessage) {
      const timer = setTimeout(() => {
        setDeleteMessage('');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [deleteMessage]);
  const handleDelete = async (id: string) => {
    const res = await axios.delete(`${serverUrl}/URLshortener/${id}`);
    updateReloadState()
    setDeleteMessage(res.data.message)
  }
  const renderTableData = () => {
    return data.map((item) => {
      return (
        <tr key={item._id}>
          <td>
            <Link to={item.fullUrl} target="_blank" rel="noreferrer nooperner">
              {item.fullUrl}
            </Link>
          </td>
          <td>
            <Link
              to={`${serverUrl}/URLshortener/${item.shortUrl}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              {item.shortUrl}
            </Link>
          </td>
          <td>{item.clicks}</td>
          <td className="flex gap-3">
            {
              <AiFillDelete
                size="15px"
                onClick={() => handleDelete(item._id)}
              />
            }
            {
              <AiFillCopy
                size="15px"
                onClick={() => {
                  copyToClipboard(item.shortUrl);
                }}
              />
            }
          </td>
        </tr>
      );
    });
  };
  return (
    <div className="container mx-auto pt02 pb-10">
      <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
        <table className="w-full table-fixed text-sm text-left">
          <thead>
            <tr>
              <th scope="col ">FullUrl</th>
              <th scope="col ">ShortUrl</th>
              <th scope="col ">Clicks</th>
              <th scope="col ">Action</th>
            </tr>
          </thead>
          <tbody>{renderTableData()}</tbody>
        </table>
        {
        deleteMessage && <Alert className="mt-10 w-1/2 flex items-center justify-center" color='success'>{deleteMessage}</Alert>
      }
      </div>
     
    
    </div>

  )
}

export default Urltable;
