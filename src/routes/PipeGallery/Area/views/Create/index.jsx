import React, { Component, } from 'react';
import { PageTitleCreate } from '@src/components';
import Transfer from './transfer'
import { Form, Input, Select, Button, message, Row, Col } from 'antd';
import AMap from 'AMap'
import axios from 'axios'
import './index.styl'

const { Option } = Select;
const { TextArea } = Input;
let marker
let number = 0
var user_id = window.sessionStorage.getItem("user_id")

class PipeAreaNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      areaDetail: {},
      pipeBelong: [],
      startPoint: [],
      endPoint: [],
    };

  }
  componentDidMount() {
    this.getpipeBelong();
    const { match: { params: { id } } } = this.props
    if (id) {
      axios.get(`/api/v1/info/galleryArea?Id=${id}&user_id=${user_id}`)
        .then((res) => {
          console.log(res.data)
          this.setState({ areaDetail: res.data })
        })
        .catch((err) => {
          console.log(err);
        });
    }
    this.initMapStart()
  }
  componentWillUnmount() {
    marker = 0
  }
  //获取管廊区域信息
  getpipeBelong = () => {
    axios.get(`/api/v1/info/pipeGalleryAll?user_id=${user_id}`)
      .then((res) => {
        if (res && res.status === 200) {
          const pipeArr = res.data.AllPipes
          const pipe = []
          const children = []
          pipeArr.forEach(function (item) {
            pipe.push(item.name)
          })
          for (var i = 0; i < pipe.length; i++)
            children.push(<Option key={i} value={pipe[i]}>{pipe[i]}</Option>)
          this.setState({ pipeBelong: children })
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  initMapStart = () => {
    this.map = new AMap.Map('mapArea', {
      zoom: 11,//级别
      center: [116.397428, 39.90923],//中心点坐标
      viewMode: '3D'//使用3D视图
    });
    //监听双击事件
    this.map.on('dblclick', (e) => {
      console.log(`您点击了地图的[${e.lnglat.getLng()},${e.lnglat.getLat()}]`)
      const lnglatXY = [e.lnglat.getLng(), e.lnglat.getLat()]
      this.setState({ startPoint: lnglatXY })
      if (number < 2) {
        this.addMarker(lnglatXY)
      } else {
        marker.setPosition(lnglatXY)
      }
    })
  }
  //高德地图打点
  addMarker = (lnglat) => {
    let startIcon = new AMap.Icon({
      size: new AMap.Size(25, 34),// 图标尺寸
      image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',// 图标的取图地址
      imageSize: new AMap.Size(135, 40),// 图标所用图片大小
      imageOffset: new AMap.Pixel(-9, -3)// 图标取图偏移量
    });
    let endIcon = new AMap.Icon({
      size: new AMap.Size(25, 34),
      image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
      imageSize: new AMap.Size(135, 40),
      imageOffset: new AMap.Pixel(-95, -3)
    });
    marker = new AMap.Marker({
      map: this.map,
      position: lnglat,
      icon: number === 0 ? startIcon : endIcon,
    });
    marker.setMap(this.map);
    number++
  }


  //创建区域信息
  handleSubmit = (e) => {
    e.preventDefault()
    const {
      form,
      history,
      match: { params: { id } },
    } = this.props
    const { getFieldValue } = form;
    const values = form.getFieldsValue()
    if (!getFieldValue('name')) {
      message.error('请输入区域名称')
    }
    if (!getFieldValue('length')) {
      message.error('请输入区域长度')
    }
    if (!getFieldValue('pipe_belong')) {
      message.error('请选择所属管廊')
    }
    if (!getFieldValue('startpoint')) {
      message.error('请输入起点')
    }
    if (!getFieldValue('endpoint')) {
      message.error('请输入终点')
    }
    if (!getFieldValue('description')) {
      message.error('请输入说明描述')
    }
    values.drawpoint = [this.state.startPoint, this.state.endPoint]
    values.principal = [{ name: 'miaomiao', id: 3, status: 1 }, { name: 'zanzan', id: 3, status: 1 }]
    console.log(values)
    if (id) {
      values.id = id
      axios.put('/api/v1/info/galleryArea?user_id=' + user_id, values)
        .then(function (response) {
          if (response.status === 200) {
            message.info('编辑成功')
            history.push('/pipe/area')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios.post('/api/v1/info/galleryArea?user_id=' + user_id, values)
        .then(function (response) {
          if (response.status === 200) {
            message.info('创建成功')
            history.push('/pipe/area')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  render() {
    const createFormItemLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 15 },
    }
    const {
      form: { getFieldDecorator },
      match: { params: { id } }
    } = this.props

    const { areaDetail, pipeBelong } = this.state
    return (
      <div className="pipe-area-management">
        {id ?
          <PageTitleCreate titles={['管廊区域', '编辑']} jump={'/pipe/area'} />
          :
          <PageTitleCreate titles={['管廊区域', '新建']} jump={'/pipe/area'} />
        }
        <Row>
          <Col span={12}>
            <Form
              onSubmit={this.handleSubmit}
            >
              <Form.Item
                {...createFormItemLayout}
                label="区域名称"
              >
                {getFieldDecorator('name', {
                  initialValue: id && areaDetail.name,
                  rules: [{
                    required: true,
                    message: "请输入区域名称",
                  }]
                })(
                  <Input placeholder="请输入区域名称" />
                )}
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="区域长度"
              >
                {getFieldDecorator('length', {
                  initialValue: id && areaDetail.length,
                  rules: [{
                    required: true,
                    message: "请输入区域长度",
                  }]
                })(<Input placeholder="请输入区域长度" />)}
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="所属管廊"
              >
                {getFieldDecorator('pipe_belong', {
                  initialValue: id && areaDetail.pipe_belong,
                  rules: [{
                    required: true,
                    message: "请选择所属管廊",
                  }]
                })(<Select
                  //  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="请选择所属管廊"
                >
                  {pipeBelong}
                </Select>)}
                {/* //(<Input placeholder="请输入管廊区域"/>)}  */}
              </Form.Item>
              {/* <Form.Item
                {...createFormItemLayout}
                label="选择负责人："
              >
                {getFieldDecorator('principal')(<Transfer />)}
              </Form.Item> */}
              <Form.Item
                {...createFormItemLayout}
                label="绘制区域："
              >
                {getFieldDecorator('pipe_map')(
                  <Input placeholder="请选择区域" />)}
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="起始点（经纬度）"
              >
                {getFieldDecorator('startpoint', {
                  initialValue: id && areaDetail.startpoint,
                  rules: [{
                    required: true,
                    message: "请输入起点",
                  }]
                })(<div className="path-way-border-input">
                  <Input placeholder="请输入终点" />

                </div>)}
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="终止点（经纬度）"
              >
                {getFieldDecorator('endpoint', {
                  initialValue: id && areaDetail.endpoint,
                  rules: [{
                    required: true,
                    message: "请输入终点",
                  }]
                })(<div className="path-way-border-input">
                  <Input placeholder="请输入终点" />
                </div>)}
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="说明描述"
              >
                {getFieldDecorator('description', {
                  initialValue: id && areaDetail.description,
                  rules: [{
                    required: true,
                    message: "请输入说明描述",
                  }]
                })(<TextArea rows={4} placeholder="请输入说明描述" />)}
              </Form.Item>
              <section className="operator-container">
                <div style={{ textAlign: "center" }}>
                  <Button
                    htmlType="submit"
                    type="primary"
                    size="default"
                  >{id ? '编辑' : '新建'}
                  </Button>
                  <Button
                    style={{ marginLeft: "28px" }}
                    size="default"
                    onClick={() => {
                      const {
                        history,
                      } = this.props
                      history.push('/pipe/area')
                    }}
                  >取消
                  </Button>
                </div>
              </section>
            </Form>
          </Col>
          <Col span={1}>
            <div className="path-way-line-up"></div>
            <div className="path-way-line-down"></div>
          </Col>
          <Col span={9}>
            {getFieldDecorator('principal')(<Transfer />)}
            <div className="path-way-border">
              <div style={{ width: '100%', height: '300px' }} id="mapArea"></div>
            </div>
          </Col>
        </Row>
      </div>

    );
  }
}

export default Form.create()(PipeAreaNew);