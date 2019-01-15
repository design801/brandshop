//뒷 배경
import Index from './index'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as uiActions from '@store/modules/ui';

class Vr extends React.Component {  

  componentDidMount = () => {        
    const { UiActions } = this.props;      
      UiActions.setMenu({ menu: 2 });    
  }

  render() {

    return (
      <Index noMenu />
    )
  }
}

export default connect(
  (state) => ({
    
  }),
  (dispatch) => ({
    UiActions: bindActionCreators(uiActions, dispatch),    
  })
)(Vr);
