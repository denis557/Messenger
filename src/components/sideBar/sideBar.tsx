import './sideBar.css';

function SideBar({ loadingChats }: boolean) {
  return(
    <div className='sideBar'>
      <div className='sideBar_header'>
        <svg className='menu_btn' width="44" height="30" viewBox="0 0 44 30" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M2 2H42" stroke="#CACACA" strokeWidth="3.5" strokeLinecap="round"/> <path d="M2 15H42" stroke="#CACACA" strokeWidth="3.5" strokeLinecap="round"/> <path d="M2 28H42" stroke="#CACACA" strokeWidth="3.5" strokeLinecap="round"/></svg>
        <input className='sideBar_search' />
      </div>
    </div>
  )
}

export default SideBar