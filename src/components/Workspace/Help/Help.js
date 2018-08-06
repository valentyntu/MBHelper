import React, {Component} from 'react';
import './Help.css';
import history from '../../../history';

class Help extends Component {
  render() {
    return (
        <div className={'Help-container container my-2'}>
          <div className="Help-header">

            <h2 className="Help-title">
              How to use
              <button
                  type="button" className="close"
                  onClick={() => history.replace('/workspace')}>
                <span aria-hidden="true">&times;</span>
              </button>
            </h2>
            <hr className="my-4"/>
          </div>
          <div className={'Help-body'}>
            <h4 className={'Help-sub-header'}>Intro</h4>
            <p className={'lead Help-p'}>
              This application is designed to help you with remembering prices in different places
              while playing Mount & Blade.
            </p>
            <h4 className={'Help-sub-header'}>Prices</h4>

            <p className={'lead Help-p'}>
              Table's row represents city and column represents a product.
              To set/change buying or selling price just click on desired placeholder and start typing.
              You can use "Tab" to navigate through the row
              (useful when you want to set all goods' prices in one city quickly).
              After you set prices, lowest buying price and highest selling price will be marked for each
              product. Empty cells are just ignored. If you want to use float numbers - use "." as decimal
              separator. Also you can add or remove cities/products using "+" and "-" buttons accordingly.
            </p>
            <h4 className={'Help-sub-header'}>Presets</h4>
            <p className={'lead Help-p'}>
              Button "Load Preset" loads selected preset from the dropdown on the right. There are presets
              with all
              cities from "Warband" and "With Fire & Sword". You can also select "Empty" if you would like to
              use
              this app for another mod or even other game with similar trading mechanics.
            </p>
            <h4 className={'Help-sub-header'}>Saving and Loading</h4>
            <p className={'lead Help-p'}>You can save your current table's state to file by clicking "Save"
              button.
              Button "Load" allows you to load a save from file. If you would like to store your saves on
              server
              you have to log in using button at the right top corner. After that, you will see "Upload" and
              "Download"
              buttons, those work as "Save" and "Load".
            </p>
          </div>
          <div className="Help-footer">
            <button type="button" className="btn btn-secondary Help-btn-dismiss"
                    onClick={() => history.replace('/workspace')}
            >
              Got it!
              <i className="fas fa-arrow-alt-circle-up ml-2"/>
            </button>
          </div>
        </div>
    )
  }
}

export default Help;