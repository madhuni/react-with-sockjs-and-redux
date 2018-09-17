import React, { Component } from 'react';

import Modal from '../../components/modal/modal';

/**
 * This Higher-Order-Component, will accept the
 * Component and the Axios instance, for handling the error
 * Globally.
 * 
 * To show the error messages, we will use the
 * Modal component which will appear if any error occures
 * in a HTTP request.
 */
const errorHandler = (WrappedComponent, axios) => {
  /**
   * The Higher Order Component is a function, which
   * will return another function/class (which actually will
   * be the original component) and having the props
   * as arguments (in case of functional component).
   */
  return class extends Component {
    state = {
      err: null
    }

    closeError = () => {
      this.setState({
        err: null
      });
    }

    /**
     * As 'componentDidMount' method of Parent Component is called,
     * when all the Child Components use to Render.
     * 
     * If due to Error in the 'Axios' request, child component dida not render
     * and our Global Error Handler will never work because it will
     * only work when the childs are rendered.
     * 
     * That's why we are using the 'componentWillMount' lifecycle
     * hook instead of 'componentDidMount'.
     */
    componentWillMount() {
      /**
       * Interceptors are used so that we can intercept the
       * 'request' or 'response' before they are handled by
       * 'then' or 'catch' methods in original request.
       */
      this.reqInterceptor = axios.interceptors.request.use(req => {
        /**
         * When we are sending a new request, we are
         * clearing the 'err' property in our state.
        */
        this.setState({
          err: null
        });
        return req; // after performing action, returning 'req'
      });
      this.resInterceptor = axios.interceptors.response.use(null, err => {
        this.setState({
          err: err
        });
        return err; // after performing action, returning 'response'
      });
    }

    componentWillUnmount() {
      /**
       * When this HOC function will be used with multiple Component,
       * it's going to create the multiple instaces of the 'axios
       * interceptors'. These instances will never be removed, and will
       * be there in the memory, still when they are not needed.
       * 
       * In future they might cause any error as well. But 'memory leak'
       * is the biggest issue. So we are going to remove those interceptors
       * when the component is no longer used and have been umounted.
       */
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    render() {
      return (
        <React.Fragment>
          <Modal show={this.state.err} clicked={this.closeError}>
            {/* Showing the Error Msg when something went wrong */}
            {this.state.err ? this.state.err.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  }
};

export default errorHandler;