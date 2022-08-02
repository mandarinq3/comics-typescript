import './navi.scss';

export const Navi:React.FC = (props:any)=> {
  return (
    <nav className="navi">
        <div className="container">
            
            <ul className="navi-list" >
                <li className="navi-list__item"><a href="#">Главная</a></li>
                <li className="navi-list__item"><a href="#">О нас</a></li>
                <li className="navi-list__item"><a href="#">Контакты</a></li>
              </ul>
            
        </div>
    </nav>
  );
}