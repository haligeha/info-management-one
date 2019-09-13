import React, { Component, } from 'react';
import { PageTitle,Module, } from '../../../../../components';
import { Button,Row,Col,Table,Input, Popconfirm } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom'
import moment from 'moment';

const FIRST_PAGE = 0;
const PAGE_SIZE = 6;
// const Search = Input.Search;

class PathWay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: FIRST_PAGE,
      size: PAGE_SIZE,
      total: 0,  
      data:[],  
      area:'',
      nowCurrent:FIRST_PAGE,
    };

    this.getGroupList = this.getGroupList.bind(this);
  }

  componentDidMount(){
    this.getGroupList(FIRST_PAGE);    
  }

  //获取列表信息
  getGroupList = (page) => {
    const { size,area_belong } = this.state;
    axios.get(`/api/v1/info/inspectionPathByPage?limit=${size}&page=${page}&area_belong=${area_belong}`)
      .then((res) => {
        if(res && res.status === 200){
          this.setState({
            data: res.data,
            nowCurrent:res.data.page
          }) ;
          console.log(this.state.data)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //分页
  handlePageChagne = (page) => {
    this.getGroupList(page-1)
  }

  //删除
  deleteGroup = (record) => {
    axios.delete(`/api/v1/info/inspection?id=${record.id}`)
      .then(() => {
        this.getGroupList(this.state.nowCurrent)
      })
      .catch( (err) => {
        console.log(err);
      });
  }
 //搜索
 selectActivity = (value) => {
   const nameValue=value
   this.setState({
     area_belong:nameValue
   }) ;
   console.log(this.state)
   this.getGroupList(0)
 }

 render() {
   const {
     data:{
       data,
       allCount,
       limit,
       page,
     },
   } = this.state;
   const total = allCount
   const current = page+1
   const size = limit
   return (
     <div>
       <PageTitle titles={['巡检维护','巡检路线管理']}>
         {
           <Link to={"/inspection/pathway/new"}>
             <Button type="primary">+ 新建巡检路线</Button>
           </Link>
         }
       </PageTitle>
       <Module>
         <Row>
           <Col span={2}>所属区域：</Col>
           <Col span={4}>        
             <Input.Search
               placeholder="请输入所属区域"
               enterButton
               onSearch={value => this.selectActivity(value)}
             />
           </Col>
         </Row> 
       </Module>
       <Table
         className="group-list-module"
         bordered
         pagination={{
           current,
           total,
           pageSize: size,
           onChange: this.handlePageChagne,
           //    showTotal: () => `共${allCount} 条数据`
         }}
         dataSource={data}
       />
     </div>

   );
 }
}

export default PathWay;