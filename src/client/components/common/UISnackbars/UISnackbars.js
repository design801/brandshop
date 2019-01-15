import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';

import classNames from 'classnames/bind';
import styles from './UISnackbars.scss';

const cx = classNames.bind(styles);

let snackbarDiv = null;
if(process.browser) {
  snackbarDiv = document.createElement('div');
  snackbarDiv.id = "snackbar-container";
}

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

/*
const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});
*/

function MySnackbarContent(props) {
  const { className, message, onClose, variant1, ...other } = props;
  const Icon = variantIcon[variant1];

  return (
    <SnackbarContent
      className={cx(variant1)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={cx('message')}>
          <Icon className={cx('icon', 'iconVariant')} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={cx('close')}
          onClick={onClose}
        >
          <CloseIcon className={cx('icon')} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant1: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = MySnackbarContent;

class UISnackbars extends React.Component {
  
  state = {
    open: false,
  };

  componentDidMount() {
    this.setState({ open: true});
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
    ReactDOM.unmountComponentAtNode(snackbarDiv);
    document.body.removeChild(snackbarDiv);
  };

  render() {
    const { notify } = this.props;

    return (
      <Snackbar
        className={cx('snackbar')}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={this.state.open}
        autoHideDuration={3000}
        onClose={this.handleClose}
      >
        <MySnackbarContentWrapper
          onClose={this.handleClose}
          variant="h5"
          variant1={notify.type}
          message={notify.message}
        />
      </Snackbar>
    );
  }
}

export default (notify) => {
  ReactDOM.render(<UISnackbars notify={notify} />, document.body.appendChild( snackbarDiv ));
};

