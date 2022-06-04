import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Admin.css'
import { useEffect, useState } from 'react';
import { getUsers } from '../../redux/apiRequest';
import { Button, Table, Space } from 'antd';


const AdminUser = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [currentPageSize, setCurrentPageSize] = useState(10)
    const [totalRecord, setTotalRecord] = useState(10)
    const [dataSource , setDataSource] = useState([])
    

    const user = useSelector(state => state?.auth.login?.currentUser.tokens?.access)
    const userList = useSelector(state => state?.getUsers.users?.allUsers?.results)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleBack = () => {
      navigate('/admin')
    }

    useEffect(()=> {
      setDataSource(userList)
      console.log(userList);
    },[userList])
    
    useEffect(() => {
      if(!user) {
        navigate('/')
      }
      if(user.token){
        getUsers(user.token, dispatch, currentPageSize , currentPage) 
          .then(res=> setTotalRecord(res.totalResults))
      }
    },[])
    const handPageChange = (e) => {
      setCurrentPage(e.current)
      setCurrentPageSize(e.pageSize)
      getUsers(user.token, dispatch, currentPageSize , e.current)
        .then((res)=> console.log(res))
    
    }
    const columns = [
      {
        title: 'username',
        dataIndex: 'username',
        
      },
      {
        title: 'email',
        dataIndex: 'email',
        
      },
      {
        title: 'role',
        dataIndex: 'role',
      },
      {
        title: 'score',
        dataIndex: 'score',
      }]
    return (
      <>
        <Button onClick={handleBack}>Back</Button>
        <Table columns={columns} dataSource={dataSource} onChange={handPageChange} pagination={{total: totalRecord, current: currentPage, pageSize: currentPageSize, showLessItems: true, showSizeChanger: true}} />
      </>
    )
}

export default AdminUser