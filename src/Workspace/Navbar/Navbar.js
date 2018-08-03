import React, {Component} from 'react';
import PresetSelector from '../Controls/Presets/PresetSelector';
import FileSaver from '../Controls/Storage/Local/FileSaver/FileSaver';
import FileLoader from '../Controls/Storage/Local/FileLoader/FileLoader';
import logo from '../../icon.png'
import './Navbar.css'
import history from '../../history';
import CloudModal from '../Controls/Storage/Remote/CloudModal/CloudModal';
import savesURL from '../Controls/Storage/Remote/savesURL';
import axios from 'axios/index';
import connect from 'react-redux/es/connect/connect';
import {loadSaves, openCloudLoadingModal, openCloudSavingModal} from '../../actions/saveActions';
import {loginUser, logoutUser} from '../../actions/authActions';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSaveName: ''
    };
    this.presetSelector = React.createRef();
  }

  render() {
    const isAuthenticated = this.props.auth.isAuthenticated;
    return (
        <nav className={'navbar navbar-dark bg-dark navbar-expand-lg'}>
          <a className='navbar-brand'
             onClick={e => {
               e.preventDefault();
               history.replace('/');
             }}
             href={'/'}
          >
            <img src={logo}
                 className="d-inline-block align-content-around App-logo-small mr-1" alt=""/>
            M&B Trade Helper
          </a>
          <div className={'help-container my-2 mx-lg-2'}>
            <button className={'btn btn-info btn-block'}
                    onClick={() => history.replace('/help')}
            >
              <i className="fas fa-question"/>
            </button>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse"
                  data-target="#navbarToggleableContent" aria-controls="navbarToggleableContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>

          <div className="collapse navbar-collapse" id="navbarToggleableContent">
            <ul className="navbar-nav mr-auto">
              <li className={'nav-item my-2 my-lg-0 mx-lg-1'}>
                <PresetSelector/>
              </li>
              <li className={'nav-item my-2 my-lg-0 mx-lg-1'}>
                <FileSaver/>
              </li>
              <li className={'nav-item my-2 my-lg-0 mx-lg-1'}>
                <FileLoader/>
              </li>
              {
                isAuthenticated &&
                <CloudModal/>

              }
              {
                isAuthenticated &&
                <li className={'nav-item my-2 my-lg-0 mx-lg-1'}>
                  <button
                      className={'btn btn-success upload-btn btn-block'}
                      onClick={this.openSaveModal.bind(this)}
                  >Upload
                    <i className="fas fa-cloud-upload-alt ml-2"/>
                  </button>
                </li>
              }
              {
                isAuthenticated &&
                <li className={'nav-item my-2 my-lg-0 mx-lg-1'}>
                  <button
                      onClick={this.openLoadModal.bind(this)}
                      className={'btn btn-primary upload-btn btn-block'}
                  >Download
                    <i className="fas fa-cloud-download-alt ml-2"/>
                  </button>
                </li>
              }
            </ul>
            {
              !isAuthenticated &&
              <div className={'login-container my-2 my-lg-0'}>
                <button className={'btn btn-success login btn-block'}
                        onClick={this.props.loginUser}>
                  Log in
                </button>
              </div>
            }
            {
              isAuthenticated &&
              <div className={'login-container my-2 my-lg-0'}>
                <span className={'greeting'}>
                  Hi, {this.props.auth.user.nickname}!
                </span>
                <button className={'btn btn-success logout btn-block'}
                        onClick={this.props.logoutUser}>
                  Log out
                </button>
              </div>
            }
          </div>
        </nav>
    )
  }

  uploadSave(name) {
    let save = {...this.props.tableState};
    save.sub = this.props.auth.user.sub;
    save.name = name;
    return axios.post(savesURL, save);
  }

  openLoadModal() {
    this.props.openCloudLoadingModal();
  }

  openSaveModal() {
    this.props.openCloudSavingModal();
  }

}

const mapStateToProps = state => ({
  auth: state.auth,
  saves: state.saves,
  errors: state.errors
});

export default connect(mapStateToProps, {
  loadSaves,
  openCloudLoadingModal,
  openCloudSavingModal,
  loginUser,
  logoutUser
})(Navbar);