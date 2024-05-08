import * as React from 'react';
import FormContainer from '../FormContainer/FormContainer';
import { UrlData } from '../../Interface/Urldata';
import axios from 'axios';
import { serverUrl } from '../../helpers/Constants';
import Urltable from '../URLTable/Urltable'

interface IContainerProps {
}

const Container: React.FunctionComponent<IContainerProps> = () => {
  const [data,setData] = React.useState<UrlData[]>([])
  
  const [reload,setReload] = React.useState<boolean>(false)

  const updateReloadState=():void=>
    {
      setReload(true)
    }
  
  const fetchTableData = async()=>
    {
      const res = await axios.get(`${serverUrl}/URLshortener`)
      console.log(res)
      setData(res.data)
      setReload(false)
    }

    React.useEffect(()=>
    {
      fetchTableData()
    },[reload])

  return (
    <div>
        <FormContainer updateReloadState={updateReloadState}/>
        <Urltable updateReloadState={updateReloadState} data={data}/>
    </div>
  )
};

export default Container;
