import { Link } from '@common/routes'
import Button from '@material-ui/core/Button'
import styles from './UIButton_New.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles);

const UIButton_New = props => {

  const button = () => 
    <div className={cx('css-button','root')} >
      <Button      
        classes={{root: props.bootstraproot}}
        {...props}
        >      
        {props.children}
      </Button>
    </div>
    

  const linkButton = () => 
    
    <Button      
      classes={{root: props.bootstraproot}}
      {...props}
      >      
      {props.children}
    </Button>


  const render = (link, params) => link === undefined ? button() : <Link route={link} params={params} passHref>{ linkButton() }</Link>

  return (
    <div>      
      { render(props.link, props.params) }
    </div>
  )    
}
  
export default UIButton_New;
