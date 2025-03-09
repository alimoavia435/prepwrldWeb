import React from "react";
import './CalculationAboutPage.css';
import div2 from '../../assets/homeImageDiv.png';
const CalculationAboutPage = () =>{
return(
<div className="AboutPageCalculationDiv2">
<div className='AboutPagediv2left'>
<div className='AboutPagesubdiv2'>
    <p className="AboutPagesubDivpara1">Expected net annual ROI</p>
    <p className="AboutPagesubDivpara2">7.5%-12% </p>
</div>
<div className='AboutPagesubdiv2'>
    <p className="AboutPagesubDivpara1">Invest from as little as</p>
    <p className="AboutPagesubDivpara2">500 $</p>
</div>
<div className='AboutPagesubdiv2'>
    <p className="AboutPagesubDivpara1">Nationalities eligible</p>
    <p className="AboutPagesubDivpara2">200+</p>
</div>
        </div>
        <div className='AboutPagediv2Right'>
            <img style={{height:'192px',width:'217px'}} src={div2} alt='div2' />
        </div>

</div>
);
};

export default CalculationAboutPage;