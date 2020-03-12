import React, { Component, } from 'react';
import { PageTitle, Module, } from '@src/components';
import { Button, Row, Col, Table, Input, Popconfirm, message, Icon, Form, DatePicker } from 'antd';
import axios from 'axios';
import AMap from 'AMap'
import { Link } from 'react-router-dom'
import './index.styl'
const FIRST_PAGE = 0;
const PAGE_SIZE = 6;
const Search = Input.Search;
var user_id = window.sessionStorage.getItem("user_id")
class PipeArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: FIRST_PAGE,
      size: PAGE_SIZE,
      total: 0,
      data: [],
      pipe_belong: '',
      nowCurrent: FIRST_PAGE,
      mapVisible: false, // 模态框初始不显示
    };

    this.getGroupList = this.getGroupList.bind(this);
  }

  componentDidMount() {
    this.getGroupList(FIRST_PAGE);
  }

  //获取列表信息
  getGroupList = (page) => {
    const { size, pipe_belong } = this.state;
    axios.get(`/api/v1/info/galleryAreaByPage?limit=${size}&page=${page}&pipe_belong=${pipe_belong}&user_id=${user_id}`)
      .then((res) => {
        if (res && res.status === 200) {
          this.setState({
            data: res.data,
            nowCurrent: res.data.page
          });
          console.log(this.state.data)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //分页
  handlePageChagne = (page) => {
    this.getGroupList(page - 1)
  }

  //删除
  deleteGroup = (record) => {
    axios.delete(`/api/v1/info/galleryArea?Id=${record.id}&user_id=${user_id}`)
      .then(() => {
        this.getGroupList(this.state.nowCurrent)
      })
      .catch((err) => {
        message.info('无相应权限')
        console.log(err);
      });
  }
  //搜索
  selectActivity = (value) => {
    const nameValue = value
    this.setState({
      pipe_belong: nameValue
    });
    console.log(this.state)
    this.getGroupList(0)
  }
  // 控制模态框显示
  showMapModal = () => {
    this.setState({
      mapVisible: true,
    });
    // 
    var map = new AMap.Map('routeMap', {
      zoom: 11,//级别
      center: [116.397428, 39.90923],//中心点坐标
      viewMode: '3D'//使用3D视图
    });
  };
  closeMapModal = e => {
    console.log(e);
    this.setState({
      mapVisible: false,
    });
  };

  render() {
    const {
      data: {
        data,
        allCount,
        limit,
        page,
      },
    } = this.state;
    const total = allCount
    const current = page + 1
    const size = limit
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
      }),
    };
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }
    const colSpan = {
      span: 6,
    }
    const {
      form,
    } = this.props
    const {
      getFieldDecorator,
    } = form
    const columns = [{
      title: '序号',
      key: 'index',
      render: (text, record, index) => { return (index + 1) }
    }, {
      title: '区域编号',
      key: 'number',
      render: (text, record) => {
        return (record.number && record.number) || '--'
      }
    }, {
      title: '区域名称',
      width: 200,
      key: 'name',
      render: (text, record) => {
        return (record.name && record.name) || '--'
      }
    }, {
      title: '区域长度（公里）',
      key: 'length',
      render: (text, record) => {
        return (record.length && record.length) || '--'
      }
    }, {
      title: '所属管廊',
      key: 'pipe_belong',
      render: (text, record) => {
        return (record.pipe_belong && record.pipe_belong) || '--'
      }
    }, {
      title: '起始点（经度，纬度）',
      key: 'startpoint',
      render: (text, record) => {
        return (record.startpoint && record.startpoint) || '--'
      }
    }, {
      title: '终止点（经度，纬度）',
      key: 'endpoint',
      render: (text, record) => {
        return (record.endpoint && record.endpoint) || '--'
      }
    }, {
      title: '说明描述',
      key: 'description',
      render: (text, record) => {
        return (record.description && record.description) || '--'
      }
    }, {
      title: '操作',
      render: (text, record) => (
        <div className="operate-btns"
          style={{ display: 'block' }}
        >
          <Link
            to={`/pipe/area/edit/${record.id}`}
            style={{ marginRight: '5px' }}
          >编辑</Link>
          <Button type="link" onClick={this.showMapModal}>查看</Button>
          <Popconfirm
            title="确定要删除吗？"
            onConfirm={() => { this.deleteGroup(record) }}
          >
            <Button
              type="simple"
              style={{ border: 'none', padding: 0, color: "#357aff", background: 'transparent' }}
            >删除</Button>
          </Popconfirm>
        </div>
      ),
    }]
    return (
      <div className="pipa-area">
        <div style={{ opacity: (this.state.mapVisible === true) ? "0.3" : "1" }}>
          <PageTitle titles={['运营管理', '管廊区域']}>
            {
              <Link to={"/pipe/area/new"}>
                <Button type="primary">+ 新建管廊区域</Button>
              </Link>
            }
          </PageTitle>
          <Module>
            <Form onSubmit={this.selectActivity}>
              <Row>
                <Col {...colSpan}>
                  <Form.Item {...formItemLayout} label="区域名称：">
                    {getFieldDecorator('activityId')(
                      <Input
                        placeholder="请输入区域名称"
                        onBlur={this.judgeID}
                      />,
                    )}
                  </Form.Item>
                </Col>
                <Col {...colSpan}>
                  <Form.Item {...formItemLayout} label="区域长度：">
                    {getFieldDecorator('activityName')(
                      <Input
                        placeholder="请输入区域名称"
                      />,
                    )}
                  </Form.Item>
                </Col>
                <Col {...colSpan}>
                  <Form.Item {...formItemLayout} label="所属管廊：">
                    {getFieldDecorator('operatorName')(

                      <Input placeholder="请选择所属管廊" />,
                    )}
                  </Form.Item>
                </Col>
                <Col {...colSpan}>
                  <div style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit">查询</Button>
                    <Button style={{ marginLeft: 28 }} onClick={this.onReset}>清空</Button>
                  </div>
                </Col>
              </Row>
            </Form>
            {/* <Row>
            <Col span={2}>管廊名称：</Col>
            <Col span={4}>
              <Search
                placeholder="请输入所属管廊"
                enterButton
                onSearch={value => this.selectActivity(value)}
              />
            </Col>
          </Row> */}
          </Module>
          <Table
            className="group-list-module"
            bordered
            footer={() => <div>
              <Button type="danger" style={{ marginRight: '20px' }}><Icon type="delete" /> 删除</Button>
              <Button type="danger"><Icon type="download" /> 导出</Button>
            </div>}
            rowSelection={rowSelection}
            pagination={{
              current,
              total,
              pageSize: size,
              onChange: this.handlePageChagne,
              showTotal: () => `共${allCount} 条数据`
            }}
            dataSource={data}
            columns={columns}
          />
        </div>
        <div className="path-map" style={{ display: (this.state.mapVisible === true) ? "" : "none" }} >
          <p>路线查看</p><Icon className="path-map-icon" type="close-circle" onClick={this.closeMapModal} />
          <div style={{ width: '550px', height: '350px' }} id="routeMap"></div>
        </div>
      </div>
    );
  }
}

export default Form.create()(PipeArea);