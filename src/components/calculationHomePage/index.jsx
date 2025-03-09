import React from "react";
import './Calculations.css';
import div2 from '../../assets/homeImageDiv.png';
const Calculations = () =>{
return(
<div className="CalculationDiv2">
<div className='div2left'>
<div className='subdiv2'>
    <p className="subDivpara1">Expected net annual ROI</p>
    <p className="subDivpara2">7.5%-12% </p>
</div>
<div className='subdiv2'>
    <p className="subDivpara1">Invest from as little as</p>
    <p className="subDivpara2">500 $</p>
</div>
<div className='subdiv2'>
    <p className="subDivpara1">Nationalities eligible</p>
    <p className="subDivpara2">200+</p>
</div>
        </div>
        <div className='div2Right'>
            <img style={{height:'192px',width:'217px'}} src={div2} alt='div2' />
        </div>

</div>
);
};

export default Calculations;