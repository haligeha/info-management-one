import React, { Component, } from 'react';
import { Switch, Route, withRouter,Redirect } from 'react-router-dom';
import { Spin } from 'antd';
import Loadable from 'react-loadable';
import HighterLayOut from '../layouts/HigherHeaderLayout'
import Login from '../layouts/Login'
const Loading = () => {
  return (
    <div className="loading">
      <Spin size="large" />
    </div>
  );
};

class RouteView extends Component{
  checkcustomer=()=>{
    return window.sessionStorage.getItem("user_id")
  }

  render(){
    return (
      <Switch>
       <Route    
        //  path="/monitor/view"
          path="/" 
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Scene" */
              './Monitor/Scene'),
            loading: Loading
          })}  exact
         /> 
         
        {/* <Route    
        path="/monitor/view"
        component={()=>(this.checkcustomer()!==''?<HighterLayOut/>:<Redirect to='./login'/>)}
        ></Route> */}
       {/* <Route
          path="/login" 
          component={Loadable({
            loader: () => import(
              '../layouts/Login'),
            loading: Loading
          })}
        /> */}
        <Route
          path="/monitor/device"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Device" */
              './Monitor/Device'),
            loading: Loading
          })}
        />
        <Route
          path="/monitor/gis"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Gis" */
              './Monitor/Gis'),
            loading: Loading
          })}
        />
        <Route
          path="/monitor/video"
          component={Loadable({
            loader: () => import(
              './Monitor/Video'),
            loading: Loading
          })}
        />
        <Route    
          path="/inspection/plan"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Indicator" */
              './Inspection/Plan'),
            loading: Loading
          })}
        />
        <Route    
          path="/inspection/employee"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Indicator" */
              './Inspection/Employee'),
            loading: Loading
          })}
        />
        <Route    
          path="/inspection/calendar"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Indicator" */
              './Inspection/DailyInspection'),
            loading: Loading
          })}
        />
        <Route    
          path="/inspection/pathway"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Indicator" */
              './Inspection/PathWay'),
            loading: Loading
          })}
        />
        <Route
          path="/inspection/entrance/work"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './EntranceWork/EntranceWork'),
            loading: Loading
          })}
        />
        <Route
          path="/inspection/report"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Inspection/Report'),
            loading: Loading
          })}
        />
        <Route
          path="/emergency/plan"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Plan" */
              './Emergency/Plan'),
            loading: Loading
          })}
        />
        
        <Route
          path="/emergency/approval"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "PlanApproval" */
              './Emergency/PlanApproval'),
            loading: Loading
          })}
        />
        <Route
          path="/emergency/resource/material"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "PlanApproval" */
              './Emergency/Resource'),
            loading: Loading
          })}
        />
        <Route
          path="/emergency/resource/equipment"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "PlanApproval" */
              './Emergency/Resource'),
            loading: Loading
          })}
        />
        <Route
          path="/emergency/resource/team"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "PlanApproval" */
              './Emergency/Resource'),
            loading: Loading
          })}
        />
        <Route
          path="/emergency/resource/shelter"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "PlanApproval" */
              './Emergency/Resource'),
            loading: Loading
          })}
        />
        {/* <Route
          path="/emergency/alarm"
          component={Loadable({
            loader: () => import(
             
              './Emergency/Alarm'),
            loading: Loading
          })}
        /> */}
        <Route    
          path="/entrance/work"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Indicator" */
              './EntranceWork/EntranceWork'),
            loading: Loading
          })}
        />
        <Route
          path="/entrance/approval"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './EntranceWork/WorkApproval'),
            loading: Loading
          })}
        />
        <Route
          path="/pipe/area"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "PipeGallery" */
              './PipeGallery/Area'),
            loading: Loading
          })}
        />
        <Route
          path="/pipe/management"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "PipeGallery" */
              './PipeGallery/Management'),
            loading: Loading
          })}
        />
      </Switch>
    );
  }

}


export default RouteView;



