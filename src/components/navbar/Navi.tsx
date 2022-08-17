import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './navi.scss';
import {Link} from 'react-router-dom';

export const Navi:React.FC = (props:any)=> {

const appState = useSelector((state:RootState)=>state);

  const showFeedbackPop = ()=>{
    appState.refs.refs.feedbackPop.style.display='flex';   
  }

  return (
    <nav className="navi">
        <div className="container">
            
            <ul className="navi-list" >
                <li className="navi-list__item"><Link to="/">Главная</Link></li>
                <li className="navi-list__item"><a href="#">О нас</a></li>
                <li className="navi-list__item" onClick={showFeedbackPop}>Связаться с нами</li>
              </ul>
            
        </div>
    </nav>
  );
}