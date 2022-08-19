import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './navi.scss';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export const Navi:React.FC = (props:any)=> {

const appState = useSelector((state:RootState)=>state);

  const showFeedbackPop = ()=>{
    appState.refs.refs.feedbackPop.style.display='flex';   
  }

  return (
    <nav className="navi">
        <div className="container">
            
            <ul className="navi-list" >
                <li className="navi-list__item"><Link to="/"><FontAwesomeIcon icon={faHouse}/></Link></li>
                <li className="navi-list__item" onClick={showFeedbackPop}><FontAwesomeIcon icon={faEnvelope}/></li>
              </ul>
            
        </div>
    </nav>
  );
}