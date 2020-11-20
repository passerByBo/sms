import React, { Component } from "react";
import { Tabs, Input, Table, Tag, Modal, Form, Row, Col, DatePicker, Button } from "antd";
import SunCollapse from "../../components/sun-collapse/sun-collapse";
import "antd/dist/antd.css";
import "./home.css";
import { lists, conditions } from './data';
import CheckButton from '../../components/check-button/check-button';
import getColor from '../../util/getColor';
const { Search } = Input;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '标准号',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '标准体系编号',
    dataIndex: 'sysCode',
    key: 'sysCode',
  },
  {
    title: '标准中文名称',
    dataIndex: 'zhName',
    key: 'zhName',
    width: 160,
    render: text => <a target="_block" href="https://www.baidu.com">{text}</a>,
  }, {
    title: '标准英文名称',
    dataIndex: 'enName',
    key: 'enName',
  }, {
    title: '作者',
    dataIndex: 'author',
    key: 'author',
  }, {
    title: '编制单位',
    dataIndex: 'preparationUnit',
    key: 'preparationUnit',
  }, {
    title: '发布日期',
    dataIndex: 'releaseDate',
    key: 'releaseDate',
  },
  {
    title: "实时日期",
    dataIndex: 'realTime',
    key: 'realTime'
  }, {
    title: "代替标准",
    dataIndex: 'instead',
    key: 'instead'
  }, {
    title: "标准状态",
    dataIndex: 'status',
    key: 'status',
    render: tag => {
      return <>
        <Tag color={getColor(tag)}>
          {tag}
        </Tag>
      </>
    }
  }
]


class Home extends Component {
  constructor(props) {
    super(props);
    this.conditionMap = this.getConditionMap(conditions);
  }
  state = {
    visible: false,
    lists: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14
    ],
    lists2: [1, 2, 3],
    conditionTabs: [
      '全部'
    ],

    standLists: lists
  };
  /**
   * 将条件数据初始化为map
   */
  getConditionMap = (conditions) => {
    let result = Object.create(null);
    for (let i = 0, length = conditions.length; i < length; i++) {
      const item = conditions[i];
      result[item.key] = [];
    }

    return result;
  }

  /**
   * 将每次选择后存储在map中的数据转换为数组，用于tab的渲染
   */
  getConditionArr = (conditionMap) => {
    let result = ['全部'];
    for (let key in conditionMap) {
      let children = conditionMap[key];
      if (children && children.length > 0) {
        result = [...result, ...children];
      }
    }
    return result;
  }
  /**
   * 选择条件发生变化
   */
  checkButtonChange = (result) => {
    if (result.isAll) {
      if (result.selected) {
        this.conditionMap[result.tab] = [result.tab]
      } else {
        //如果要做恢复可以在如下加逻辑
        this.conditionMap[result.tab] = [];
      }

    } else {
      let con = this.conditionMap[result.parent];
      if (result.selected) {
        con.push(result.tab);
      } else {
        let index = con.indexOf(result.tab);
        con.splice(index, 1);
      }
    }

    let conditionTabs = this.getConditionArr(this.conditionMap);
    this.setState({ conditionTabs: conditionTabs });
  }
  onSearch() { }
  handleReset = () => {
    this.setState({ visible: false });
  }

  handleOk = () => {
    this.setState({ visible: false });
  }

  /**
   * 高级检索
   */
  advancedSearch = () => {
    this.setState({ visible: true });
  }

  resetForm = () => {
    this.form.resetFields();
  }
  render() {
    return (
      <div className="container">
        <Modal
          title={
            <div
              style={{
                width: '100%',
                cursor: 'move',
                color: '#319cF3'
              }}
            >
              高级检索
            </div>
          }
          cancelText="重置"
          okText="查询"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleReset}
          mask={false}
          size="small"
          width={700}
          style={{ top: 20 }}
          maskClosable
          cancelButtonProps={{ onClick: this.resetForm }}
        >
          <Form labelCol={{ span: 7 }} labelAlign="left" ref={form => this.form = form}>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name={`standardNo`}
                  label={`标准号`}
                >
                  <Input placeholder="" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={`standardSysNo`}
                  label={`标准体系编号`}
                >
                  <Input placeholder="" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name={`standardChiName`}
                  label={`标准中文名称`}
                >
                  <Input placeholder="" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={`standardEngName`}
                  label={`标准英文名称`}
                >
                  <Input placeholder="" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name={`author`}
                  label={`作者`}
                >
                  <Input placeholder="" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={`preparationUnit`}
                  label={`编制单位`}
                >
                  <Input placeholder="" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name={`issueDate`}
                  label={`发布时间`}
                >
                  <RangePicker />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={`impleDate`}
                  label={`实施时间`}
                >
                  <RangePicker />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name={`substituteStandard`}
                  label={`代替标准号`}
                >
                  <Input placeholder="" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={`replacedStandard`}
                  label={`被替代标准号`}
                >
                  <Input placeholder="" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name={`standardType`}
                  label={`标准类型`}
                >
                  <Input placeholder="" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={`standardStatus`}
                  label={`标准状态`}
                >
                  <Input placeholder="" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
        <div className="buttons">
          <Search
            placeholder="请输入！"
            allowClear
            enterButton="查询"
            onSearch={this.onSearch}
            style={{ marginBottom: 10 }}
          />
          <Button onClick={this.advancedSearch}>高级检索</Button>
        </div>
        <span style={{ fontSize: 18, color: '#263256', fontWeight: 600 }}>标准查询</span>
        {
          conditions.map(lists => (
            <SunCollapse key={lists.key}>
              <CheckButton onChange={this.checkButtonChange} data={lists}></CheckButton>
            </SunCollapse>
          ))
        }
        <div className="list-container">
          <Tabs defaultActiveKey="1" tabPosition={'top'}>
            {this.state.conditionTabs.map((tab, index) => <TabPane tab={`${tab}`} key={tab}>
              <Table bordered columns={columns} dataSource={this.state.standLists} />
            </TabPane>)}
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Home;
